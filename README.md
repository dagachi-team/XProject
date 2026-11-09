# XProject\_실시간 게시판 웹 애플리케이션\_팀과제

회원가입/로그인(JWT 인증)부터 게시글 작성·수정·삭제·좋아요까지 지원하며, Socket.IO를 통해 새 글 등록, 게시글 수정/삭제, 좋아요 알림을 실시간으로 반영합니다.

🕒 개발기간: 2026.07.21. ~ 2026.07.25.

---

## 1. 프로젝트 실행

1. Client와 Server 폴더에 각각 모듈 설치
```
npm install
```

2. Client와 Server 폴더에 각각 환경 변수 설정
```
# Client
VITE_REMOTE_API_URL=###
VITE_LOCAL_API_URL=###

VITE_USE_LOCAL=false
```

> `VITE_USE_LOCAL=true`일 경우 `VITE_LOCAL_API_URL`을 그렇지 않으면 `VITE_REMOTE_API_URL`을 Socket.io 및 API 연결 주소로 사용합니다.

```
# Server
JWT_SECRET=###
JWT_EXPIRES_SEC=###
BCRYPT_SALT_ROUNDS=###
HOST_PORT=###
DB_HOST=###
URL=###
```

3. 서버와 클라이언트 모두 실행
```
npm run dev
```

---

## 2. 주요 기능


- **회원가입 / 로그인**: bcrypt 비밀번호 해싱 + JWT 기반 인증
- **로그인 유지**: 토큰 검증을 통한 자동 로그인 상태 확인 (`/auth/me`)
- **게시글 CRUD**: 제목/내용/이미지 업로드를 포함한 게시글 작성·조회·수정·삭제
- **이미지 업로드**: Multer를 이용한 게시글 첨부 이미지 처리 (최대 5MB, 이미지 파일만 허용)
- **좋아요 기능**: 본인 글 좋아요 방지, 좋아요/취소 토글
- **정렬 및 검색**: 최신순/오래된순 정렬, 특정 사용자 게시글 조회
- **실시간 알림**: Socket.IO로 새 글 등록, 게시글 수정/삭제, 좋아요 알림을 실시간으로 수신 (react-toastify 토스트 알림)

---

## 3. 기술 스택

| Client | Server |
| --- | --- |
| React 19 + Vite | Node.js + Express |
|  | MongoDB |

---

## 4. 프로젝트 구조
```
XProject/
├── Client/                  # React (Vite) 프론트엔드
│   ├── src/
│   │   ├── components/      # Navbar 등 공통 컴포넌트
│   │   ├── hooks/           # useSocket 커스텀 훅
│   │   ├── pages/           # Root, Home, Login, Auth, Post 페이지
│   │   ├── socket.js        # Socket.IO 클라이언트 설정
│   │   ├── App.jsx          # 라우팅 및 전역 소켓 알림 처리
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── Server/                  # Express 백엔드
    ├── controller/          # auth, posts 컨트롤러
    ├── data/                 # auth, posts 리포지토리(DB 접근 계층)
    ├── db/                   # MongoDB 연결 설정
    ├── middleware/           # 인증(isAuth), 이미지 업로드(multer) 미들웨어
    ├── router/                # auth, posts 라우터
    ├── public/                # 정적 파일 및 업로드된 이미지
    ├── server.js              # 앱 진입점
    ├── config.mjs             # 환경 변수 설정 로더
    └── package.json
```

---

## 5. 팀명 및 팀원

### TEAM_DAGACHI

| 길준영 | 김동권 | 배성욱 | 오승아 | 이서진(팀장) | 한혜원 |
| --- | --- | --- | --- | --- | --- |
| [@Junyoung](https://github.com/wnsdud2953) | [@Donggwon](https://github.com/dkkim9212) | [@SungUk](https://github.com/BaeSungUk) | [@Seungah](https://github.com/OhSeungAh2)<br>[@sdesign416](https://github.com/sdesign416)  | [@Seojin](https://github.com/leeseojin-dev) | [@Harwoon](https://github.com/harwoon) |
