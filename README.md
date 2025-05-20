# ⏰ P모드 스톱워치 (Pomodoro Timer App)

25분 집중 + 5분 휴식 구조의 **Pomodoro 타이머 앱**입니다.  
React 기반으로 개발되었으며, 하루 집중 세션 기록 및 사용자 정의 설정 기능을 지원합니다.

---

## 🚀 배포 링크

👉 [앱 바로가기](https://pomodoro-timer-one-inky.vercel.app/)

---

## 📌 주요 기능

- ✅ 타이머 시작 / 일시정지 / 리셋
- ✅ 진행 상황 시각화 (Progress Bar)
- ✅ 사용자 설정 (집중 시간 / 휴식 시간 변경)
- ✅ 날짜별 집중 세션 기록 저장 (localStorage 기반)
- ✅ 앱 재시작 시 이전 상태 복원

---

## 🛠️ 기술 스택

| 기술         | 설명                           |
| ------------ | ------------------------------ |
| React        | UI 개발 프레임워크             |
| TypeScript   | 정적 타입 언어                 |
| Tailwind CSS | 유틸리티 기반 CSS 프레임워크   |
| useReducer   | 상태 전이 로직 관리            |
| localStorage | 브라우저 내 데이터 영속화      |
| React Router | 페이지 이동 (`/`, `/settings`) |

---

## 🧱 프로젝트 구조

```bash

src/
├── components/
│ ├── TimerDisplay.tsx
│ ├── ProgressBar.tsx
│ ├── ControlButtons.tsx
│ └── HistoryLog.tsx
├── context/
│ └── TimerContext.tsx
├── hooks/
│ └── useTimer.ts
├── pages/
│ ├── Home.tsx
│ └── Settings.tsx
├── types/
│ └── timer.d.ts
├── utils/
│ └── timeFormatter.ts
├── App.tsx
└── main.tsx

```

---

## ⚙ 설정 기능

- `/settings` 페이지에서 사용자가 직접 집중 시간 및 휴식 시간을 분 단위로 입력할 수 있습니다.
- 변경된 설정은 `localStorage`에 저장되어 앱을 종료해도 유지됩니다.
- 설정 저장 시 홈(`/`)으로 자동 이동됩니다.

---

## 📊 집중 세션 기록

- 집중 세션은 **날짜별로 자동 저장**되며, `localStorage`에 기록됩니다.
- 오늘 완료한 세션 수는 `HistoryLog` 컴포넌트에 표시됩니다.
- 추후 주간/월간 통계 기능으로 확장 가능

---

## 📦 설치 및 실행

```bash
# 1. 프로젝트 클론
git clone https://github.com/your-username/pomodoro-timer.git
cd pomodoro-timer

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev

```

---

📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
