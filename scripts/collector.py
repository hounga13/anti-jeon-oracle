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

# Setup
if not GEMINI_API_KEY:
    print("Error: GEMINI_API_KEY is not set.")
    exit(1)

genai.configure(api_key=GEMINI_API_KEY)
youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

def get_latest_video():
    # 1. 채널의 contentDetails에서 'uploads' 플레이리스트 ID를 정확히 가져오기
    try:
        channel_response = youtube.channels().list(
            id=YOUTUBE_CHANNEL_ID,
            part='contentDetails'
        ).execute()

        if not channel_response['items']:
            print("Error: Channel not found.")
            return None

        uploads_playlist_id = channel_response['items'][0]['contentDetails']['relatedPlaylists']['uploads']
        
        # 2. 업로드 플레이리스트에서 최신 영상 가져오기
        playlist_response = youtube.playlistItems().list(
            playlistId=uploads_playlist_id,
            part='snippet,contentDetails',
            maxResults=1
        ).execute()

        if playlist_response['items']:
            item = playlist_response['items'][0]
            video_id = item['contentDetails']['videoId']
            title = item['snippet']['title']
            description = item['snippet']['description']
            thumbnail = item['snippet']['thumbnails']['high']['url']
            publishedAt = item['snippet']['publishedAt'] # Keep publishedAt
            
            return {
                'id': video_id,
                'title': title,
                'description': description,
                'thumbnail': thumbnail,
                'publishedAt': publishedAt # Include publishedAt
            }
        
        # 3. Fallback: 검색 API 사용 (플레이리스트가 비어있는 경우 등)
        print("Playlist lookup failed or empty. Trying search API fallback...")
        search_response = youtube.search().list(
            channelId=YOUTUBE_CHANNEL_ID,
            part='id,snippet',
            order='date',
            maxResults=1,
            type='video'
        ).execute()

        if search_response['items']:
            item = search_response['items'][0]
            return {
                'id': item['id']['videoId'],
                'title': item['snippet']['title'],
                'description': item['snippet']['description'],
                'thumbnail': item['snippet']['thumbnails']['high']['url'],
                'publishedAt': item['snippet']['publishedAt'] # Include publishedAt
            }
            
    except Exception as e:
        print(f"Error getting latest video: {e}")
        return None
    
    return None

def get_transcript(video_id):
    try:
        # Debugging: Check availability
        try:
             if hasattr(YouTubeTranscriptApi, 'get_transcript'):
                 pass
             else:
                 print(f"DEBUG: YouTubeTranscriptApi {type(YouTubeTranscriptApi)} missing get_transcript")
        except:
             pass

        # Attempt 1: Standard class method
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id, languages=['ko', 'en'])
        return " ".join([t['text'] for t in transcript_list])
    except AttributeError:
        # Attempt 2: Explicit module usage (Fallback)
        print("AttributeError encountered for get_transcript. Retrying with module...")
        try:
            import youtube_transcript_api as yta
            transcript_list = yta.YouTubeTranscriptApi.get_transcript(video_id, languages=['ko', 'en'])
            return " ".join([t['text'] for t in transcript_list])
        except Exception as e:
            print(f"Fallback transcript failed: {e}")
            return None
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
            
            # [Token Optimization] 이미지 분석 비활성화 (할당량 절약)
            # img_response = requests.get(video_data['thumbnail'])
            # img = PIL.Image.open(BytesIO(img_response.content))
            
            # [Token Optimization] 자막 길이 3000자로 제한
            short_transcript = transcript[:3000]
            
            prompt = f"""
            당신은 유명한 경제 유튜버 '전인구'의 발언을 정반대로 해석하여 '진실의 신탁'을 내리는 AI 오라클입니다.
            다음 영상 정보를 분석하여 결과를 JSON 형식으로 응답하세요.

            영상 제목: {video_data['title']}
            영상 자막: {short_transcript} ... (이하 생략)

            분석 지침:
            1. 이 영상에서 언급된 주요 자산(예: 삼성전자, 비트코인, 부동산 등)을 식별하세요.
            2. 전인구의 의견(상승/하락)을 -1.0(강한 하락)에서 1.0(강한 상승) 사이의 점수로 환산하세요.
            3. '확신도 스코어'를 산출하세요. ("역대급", "무조건" 등의 단어 사용 시 높임)
            4. 전인구의 논리를 뒤집는 '오라클의 반대 논리'를 한 문장으로 작성하세요.
            5. 관상 분석은 생략합니다. '관상 지수'는 50(중립)으로 고정하세요.

            출력 JSON 형식:
            {{
                "asset": "자산명",
                "jeon_opinion": float,
                "jeon_logic": "전인구의 주장 요약",
                "oracle_signal": "BUY or SELL",
                "oracle_logic": "오라클의 반대 논리",
                "confidence": float,
                "physiognomy_score": 50,
                "timestamp": "핵심 발언 시점(MM:SS)"
            }}
            """
            
            # 텍스트만 전송
            response = model.generate_content(prompt)
            
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
                print("Quota limit hit, waiting 60 seconds before trying next model...")
                time.sleep(60)
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
        # [Fix] 모델이 JSON을 리스트로 반환하는 경우에 대한 예외 처리
        if isinstance(analysis, list):
            if not analysis: # 빈 리스트인 경우
                print("Analysis result is empty list.")
                return
            analysis = analysis[0] # 첫 번째 요소 사용

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
