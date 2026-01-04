import os
import json
import requests
from datetime import datetime
import google.generativeai as genai
from googleapiclient.discovery import build
import youtube_transcript_api
from youtube_transcript_api import YouTubeTranscriptApi
import PIL.Image
from io import BytesIO

# Configuration
YOUTUBE_CHANNEL_ID = "UCznImSIaxZR7fdLCICLdgaQ"  # @moneydo 전인구 경제연구소 정식 ID
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
DATA_FILE = "src/data/analysis.json"

# Initialize APIs
youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)
genai.configure(api_key=GEMINI_API_KEY)

def get_latest_video():
    try:
        # 1. 채널의 contentDetails에서 'uploads' 플레이리스트 ID 가져오기
        channel_response = youtube.channels().list(
            part="contentDetails",
            id=YOUTUBE_CHANNEL_ID
        ).execute()
        
        if not channel_response.get('items'):
            print(f"Error: Channel {YOUTUBE_CHANNEL_ID} not found.")
            return None
            
        uploads_playlist_id = channel_response['items'][0]['contentDetails']['relatedPlaylists']['uploads']
        
        # 2. 플레이리스트 아이템 목록 조회 (가장 최신 1개)
        request = youtube.playlistItems().list(
            part="snippet,contentDetails",
            playlistId=uploads_playlist_id,
            maxResults=1
        )
        response = request.execute()
        
        if not response.get('items'):
            print("No videos found in uploads playlist.")
            return None
            
        item = response['items'][0]
        video_id = item['contentDetails']['videoId']
        
        return {
            "id": video_id,
            "title": item['snippet']['title'],
            "description": item['snippet']['description'],
            "thumbnail": item['snippet']['thumbnails']['high']['url'],
            "publishedAt": item['snippet']['publishedAt']
        }
    except Exception as e:
        print(f"Error in get_latest_video: {e}")
        return None

def get_transcript(video_id):
    try:
        # 모듈을 통해 직접 메서드 호출하여 속성 에러 방지
        transcript_list = youtube_transcript_api.YouTubeTranscriptApi.get_transcript(video_id, languages=['ko'])
        return " ".join([t['text'] for t in transcript_list])
    except Exception:
        try:
            # 기본 설정으로 재시도
            transcript_list = youtube_transcript_api.YouTubeTranscriptApi.get_transcript(video_id)
            return " ".join([t['text'] for t in transcript_list])
        except Exception as e:
            print(f"Transcript capture failed for {video_id}: {e}")
            return None

def analyze_video(video_data, transcript):
    # 로그에서 확인된 '사용 가능한 모델' 우선순위로 변경
    # 1순위: 가장 성능이 좋은 gemini-2.0-flash
    # 2순위: 그 다음으로 안정적인 gemini-2.0-flash-lite (할당량 문제 시 대체)
    # 3순위: 최신 실험 버전
    model_names = [
        'gemini-2.0-flash', 
        'gemini-2.0-flash-lite-preview-02-05',
        'gemini-2.0-flash-exp'
    ]
    
    import time
    
    model = None
    for name in model_names:
        try:
            print(f"Attempting to use model: {name}")
            model = genai.GenerativeModel(name)
            
            # thumbnail analysis
            img_response = requests.get(video_data['thumbnail'])
            img = PIL.Image.open(BytesIO(img_response.content))
            
            prompt = f"""
            당신은 유명한 경제 유튜버 '전인구'의 발언을 정반대로 해석하여 '진실의 신탁'을 내리는 AI 오라클입니다.
            다음 영상 정보를 분석하여 결과를 JSON 형식으로 응답하세요.

            영상 제목: {video_data['title']}
            영상 자막: {transcript[:10000]} # 텍스트가 너무 길면 자름

            분석 지침:
            1. 이 영상에서 언급된 주요 자산(예: 삼성전자, 비트코인, 부동산 등)을 식별하세요.
            2. 전인구의 의견(상승/하락)을 -1.0(강한 하락)에서 1.0(강한 상승) 사이의 점수로 환산하세요.
            3. '확신도 스코어'를 산출하세요. ("역대급", "무조건" 등의 단어 사용 시 높임)
            4. 전인구의 논리를 뒤집는 '오라클의 반대 논리'를 한 문장으로 작성하세요.
            5. 전인구의 표정(이미지)을 분석하여 '관상 지수(공포/탐욕)'를 평가하세요.

            출력 JSON 형식:
            {{
                "asset": "자산명",
                "jeon_opinion": float,
                "jeon_logic": "전인구의 주장 요약",
                "oracle_signal": "BUY or SELL",
                "oracle_logic": "오라클의 반대 논리",
                "confidence": float,
                "physiognomy_score": int,
                "timestamp": "핵심 발언 시점(MM:SS)"
            }}
            """
            
            response = model.generate_content([prompt, img])
            
            # JSON 추출 로직
            content = response.text
            if "```json" in content:
                json_text = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                json_text = content.split("```")[1].split("```")[0].strip()
            else:
                json_text = content.strip()
                
            return json.loads(json_text)
        except Exception as e:
            print(f"Failed with {name}: {e}")
            if "429" in str(e): # Quota exceeded
                print("Quota limit hit, waiting 5 seconds before trying next model...")
                time.sleep(5)
            continue
            
    return None

def main():
    print("Checking for new videos...")
    video = get_latest_video()
    if not video:
        print("No videos found.")
        return

    # Check if already analyzed
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                content = f.read().strip()
                data = json.loads(content) if content else []
        except:
            data = []
            
        if any(item['id'] == video['id'] for item in data):
            print(f"Video {video['id']} already analyzed. Skipping.")
            return
    else:
        data = []

    print(f"Analyzing: {video['title']}")
    transcript = get_transcript(video['id'])
    
    # 자막이 없으면 영상 설명을 대신 사용
    content_to_analyze = transcript if transcript else f"자막 없음. 영상 설명 기반 분석: {video['description']}"
    
    analysis = analyze_video(video, content_to_analyze)
    if analysis:
        # Merge data
        result = {
            "id": video['id'],
            "title": video['title'],
            "thumbnail": video['thumbnail'],
            "publishedAt": video['publishedAt'],
            **analysis
        }
        data.insert(0, result) # Newest first
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print("Success: Analysis saved.")
    else:
        print("Analysis failed to generate results after trying multiple models.")

if __name__ == "__main__":
    main()
