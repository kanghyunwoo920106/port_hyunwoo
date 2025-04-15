# 강현우 포트폴리오

이 프로젝트는 프론트엔드 개발자 강현우(혀누)의 개인 포트폴리오 웹사이트로, Next.js 15와 React 19를 사용하여 개발되었습니다. 여러 개인 프로젝트를 하나의 웹사이트에서 확인할 수 있도록 통합했습니다.

## 🌟 포함된 프로젝트

### 1. JSON 변환기
개발자 친화적인 JSON 뷰어 및 변환기입니다. JSON 데이터를 입력하면 구조화된 형태로 볼 수 있습니다.
- 경로: `/projects/json-transfer`
- 기능: JSON 파싱, 시각화

### 2. 마크다운 노트
마크다운 문법을 사용하여 노트를 작성하고 실시간으로 미리보기할 수 있는 에디터입니다.
- 경로: `/projects/markdown-note`
- 기능: 마크다운 편집, 실시간 미리보기, 로컬 저장

### 3. 음악 시각화
음악 파일을 업로드하여 다양한 형태로 시각화할 수 있는 도구입니다.
- 경로: `/projects/music-visualization`
- 기능: 오디오 파일 분석, 다양한 시각화 옵션(파형, 주파수, 원형)

## 🚀 시작하기

### 설치
```bash
# 의존성 설치
npm install
# 또는
pnpm install
```

### 개발 서버 실행
```bash
npm run dev
# 또는
pnpm dev
```

웹 브라우저에서 `http://localhost:3001`로 접속하여 프로젝트를 확인할 수 있습니다.

### 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build
# 또는
pnpm build

# 프로덕션 서버 실행
npm run start
# 또는
pnpm start
```

## 🔧 기술 스택

- **프론트엔드**: React 19, Next.js 15
- **스타일링**: Tailwind CSS
- **패키지 관리**: npm / pnpm
- **기타 라이브러리**:
  - react-json-view (JSON 시각화)
  - marked (마크다운 파싱)
  - Web Audio API (음악 시각화)

## 📝 프로젝트 구조

```
port_hyunwoo/
├── app/
│   ├── page.tsx                # 메인 페이지
│   ├── layout.tsx              # 루트 레이아웃
│   └── projects/
│       ├── json-transfer/      # JSON 변환기 프로젝트
│       ├── markdown-note/      # 마크다운 노트 프로젝트
│       └── music-visualization/ # 음악 시각화 프로젝트
├── public/                     # 정적 파일
└── ...
```

## 👨‍💻 개발자 정보

- **이름**: 강현우
- **GitHub**: [github.com/kanghyunwoo920106](https://github.com/kanghyunwoo920106)