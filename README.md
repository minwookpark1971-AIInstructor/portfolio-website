# 박민욱 강사 웹사이트

박민욱 강사의 AI 교육 및 취업 컨설팅 전문성을 효과적으로 전달하는 개인 포트폴리오 웹사이트입니다.

## 🚀 기술 스택

- **React 19** - UI 라이브러리
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **React Router** - 페이지 라우팅
- **Framer Motion** - 애니메이션
- **React Icons** - 아이콘
- **EmailJS** - 문의 폼 이메일 전송

## 📦 설치 및 실행

### 개발 서버 실행

```bash
npm install
npm run dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Header.jsx      # 네비게이션 헤더
│   ├── Footer.jsx      # 푸터
│   ├── Hero.jsx        # 홈페이지 히어로 섹션
│   ├── AboutSection.jsx # 소개 섹션
│   ├── ValueCard.jsx   # 핵심 가치 카드
│   ├── QuickLinks.jsx  # 빠른 링크 섹션
│   ├── FeaturedVideo.jsx # 추천 영상 섹션
│   └── ContactForm.jsx # 문의 폼
├── pages/              # 페이지 컴포넌트
│   ├── Home.jsx        # 홈페이지
│   ├── Profile.jsx     # 프로필 페이지
│   ├── Expertise.jsx   # 강의분야 페이지
│   ├── Portfolio.jsx   # 실적 페이지
│   └── Contact.jsx     # 연락 페이지
├── data/               # JSON 데이터 파일
│   ├── profile.json    # 프로필 정보
│   ├── expertise.json  # 강의분야 데이터
│   └── portfolio.json  # 실적 데이터
├── styles/             # 스타일 파일
├── App.jsx             # 메인 앱 컴포넌트
└── main.jsx            # 진입점
```

## 🎨 디자인 컨셉

- **컬러 팔레트**: 화이트 배경, 블루 액센트 (#2563EB), 그린 세컨더리 (#10B981)
- **타이포그래피**: Pretendard / Noto Sans KR
- **스타일**: 미니멀하고 깔끔한 UI/UX (dalyabaron.com 참고)

## 📱 주요 기능

- ✅ 반응형 디자인 (모바일, 태블릿, 데스크탑)
- ✅ 부드러운 스크롤 애니메이션
- ✅ 인터랙티브 네비게이션
- ✅ 문의 폼 (EmailJS 연동 가능)
- ✅ 영상 임베드
- ✅ 타임라인 형식의 실적 표시

## 🔧 환경 변수 설정 (선택사항)

문의 폼 이메일 전송을 위해 EmailJS를 사용하는 경우, `.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 웹사이트입니다.

## 👤 작성자

박민욱 강사
- 이메일: irum.ceo@gmail.com
- 전화: 010-5688-7045
