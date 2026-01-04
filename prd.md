# 🚀 프로젝트: The Anti-Jeon Oracle (전인구의 반대)
> **개발 환경: Google Antigravity (AI-Powered Code Editor)**
> **호스팅 및 자동화: GitHub Pages + GitHub Actions (Serverless Architecture)**

## 1. 프로젝트 개요
* **목표:** 유튜브 채널 '전인구 경제연구소'의 영상을 AI로 분석하여, 전인구 씨가 예측하는 경제 지표나 자산 전망의 정반대 포지션을 '참된 신탁'으로 제시하는 웹 서비스 구축.
* **핵심 가치:** "그가 사라고 하면 팔고, 팔라고 하면 사라."는 시장의 밈(Meme)을 데이터 기반으로 시스템화.
* **타겟 유저:** 주식/부동산 투자자, 경제 커뮤니티 유저, '인간 지표' 매매법에 관심 있는 사용자.

---

## 2. 핵심 기능 요구사항 (Core Requirements)

### 2.1. 데이터 수집 (Data Ingestion)
* **자동 채널 모니터링:** GitHub Actions를 사용하여 정기적(예: 6시간 간격)으로 `@moneydo` 채널의 신규 영상을 확인.
* **데이터 추출 파이프라인:**
    * **텍스트:** `youtube-transcript-api`를 활용하여 영상의 자막 추출. 자막이 없을 경우 영상 설명을 대체 활용.
    * **시각 자료:** YouTube Data API v3를 통해 영상 제목 및 고해상도 썸네일 수집.
    * **타임라인 정보:** 언급된 핵심 키워드와 해당 시간대(Timestamp)를 매핑하여 기록.

### 2.2. AI 분석 엔진 (The Brain: Gemini Pro)
* **모델 선정:** **Gemini 1.5 Pro** (메인 분석) 및 **Gemma** (경량 작업).
* **예측값 추출 및 자산 매핑:**
    * 특정 자산(삼성전자, 비트코인, 금 등)을 식별하고, 이에 대한 상승/하락 의견을 -1.0 ~ +1.0 사이의 수치로 계량화.
* **청개구리 논리 생성 (Reversal Logic):**
    * 단순히 결과만 뒤집는 것이 아니라, 전인구 씨가 제시한 근거의 허점을 찌르거나 정반대의 시장 해석을 제공하는 페르소나 적용.
* **확신도 스코어링:** "무조건", "확신", "역대급" 등 강한 어조 사용 시 반대 신호의 가산점 부여.

### 2.3. 웹 대시보드 (Interface)
* **정적 사이트 호스팅:** GitHub Pages를 통해 배포되는 React/Vite 기반 SPA.
* **비교 카드 UI:** 좌측 '전인구의 예언' vs 우측 '진실의 신탁(AI)' 배치.
* **자산별 신호등:** 🟢(매수 시그널), 🔴(매도 시그널).
* **타임라인 연동:** 분석 결과 클릭 시 해당 발언이 나온 유튜브 영상의 특정 시간대로 즉시 이동.

---

## 3. 아이디어 풍부화 요구사항 (Advanced Features)

### 3.1. 전인구 지표 (The Jeon Index) & 백테스팅
* **수익률 시뮬레이션:** 과거 데이터와 실제 시장 지표(Yahoo Finance 등 연동)를 비교하여 반대 매매 시의 가상 수익률 차트 제공.
* **신뢰도 등급:** 전인구 씨의 과거 적중률(의 반대)을 기반으로 현재 신호의 신뢰 등급 부여.

### 3.2. 멀티모달 관상 분석 (Gemini Vision 활용)
* **썸네일 감정 분석:** Gemini Vision으로 전인구 씨의 표정(비장함, 절망, 환희 등)을 분석하여 시장의 과열/공포 지수로 치환.
* **어그로 지수:** 제목의 자극도를 AI가 평가하여 '인간 지표'로서의 가중치로 활용.

---

## 4. 기술적 요구사항 및 시스템 아키텍처

1.  **Architecture:** **Serverless Scheduled Pipeline**
    * **GitHub Actions (Cron):** 6시간마다 파이썬 스크립트 실행 -> 유튜브 데이터 수집 -> Gemini API 분석 -> 결과를 `data/analysis.json`으로 저장 및 커밋.
    * **GitHub Pages:** 업데이트된 `analysis.json`을 기반으로 정적 웹 페이지 리랜더링 및 배포.
2.  **Tech Stack:**
    * **Frontend:** React, Vite, Tailwind CSS (Modern & Premium UI).
    * **Backend (Automation):** Python (Github Actions Environment).
    * **Analysis:** Gemini API (1.5 Pro), `youtube-transcript-api`.
    * **Data Store:** Git Repository (JSON file as a database).

---

## 5. 예상 결과물 구성 (Mockup)

| 섹션 | 내용 |
| :--- | :--- |
| **최신 예언** | "부동산은 이제 끝났다" (전인구) ➡️ **"지금이 영끌 적기" (AI)** (영상 05:22 지점) |
| **신탁 수익률** | 전인구 반대 매매법 최근 3개월 수익률: **+18.5%** |
| **오늘의 관상** | 썸네일 공포 지수 95% (전인구의 머리 감싸쥐기 포착 ➡️ 강력한 풀매수 신호) |
| **면책 조항** | "본 서비스는 유머와 풍자를 목적으로 하며, 모든 투자의 책임은 본인에게 있습니다." |
