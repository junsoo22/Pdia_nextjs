# 연습문제

## 1. 홈 화면 변경

Image 컴포넌트 사용-> 이미지 파일 최적화를 Next.js가 도와준다.

- 빌드 시점 또는 요청 시점에 이미지 크기 변환
  ⇒width:200, height: 200으로 설정하면, 빌드 시간에 해당 크기
  로 이미지를 미리 축소하여 만들어놓는다.
  ⇒더 작은 이미지 크기
  ⇒더 빠른 로딩과 렌더링
- Lazy-loading 기본 적용

## 2. Blog 글 목록 & 상세 페이지

/blog: 게시글 리스트 조회

/blog/[blogId]: blogId에 해당하는 게시글 조회

### Dynamic Routing

Next.js는 기본적으로 RSC(서버 컴포넌트)!!

- Server Component: 실행 시점이 서버!
  - Client에서 동작하지 않으므로 React Hook(useState, useEffect) 사용 불가
  - 브라우저에서 실행 불가능.

- Client Component: 기본 리엑트 컴포넌트-Client에서 사용 가능!!(렌더링은 기본적으로 진행 됨)
  - React Hook 사용 가능.
  - 컴포넌트 가장 상단에 지시어 "use client" 입력 필수
  - 브라우저에서 실행 가능

### Parameter를 받는 2가지 방법

- Server Component
  - [postId]처럼 []로 경로상 싸여있는 폴더는 해당 page에서 params라는 props로 받을 수 있다.
  - 이때 params는 Promise 객체이기 때문에 await로 사용해주어야 한다.

- Client Component

  ```
  import {useParams} from "next/navigation";
  ```

  - useParams라는 hook을 사용한다.

### 3. 서버

웹: 약속
요청을 보내면 응답이 온다.

- 클라이언트: 요청을 보내는 쪽
- 서버: 요청을 받아서 응답을 보내는 쪽

- input을 받아서 outputㅡㅇㄹ 만들어 주는 것: 함수
- 웹 서버: 함수(request를 받아서 repsonse를 만들어 주는 함수)
  - Request Method(GET, POST, UPDATE, DELETE, PUT, PATCH, OPTIONS)
  - Response StatusCode(2XX, 3XX, 4XX, 5XX).

### 4. zod 적용하여 validation check하기

- Zod: 런타임 스키마 검증 + TypeScript 타입 추론을 동시에 해주는 라이브러리
- `safeParse()`: 예외를 던지지 않고 `{ success, data/error }` 형태로 반환
- `z.treeifyError()`: 에러를 필드별 트리 구조로 변환하여 가독성 있는 에러 메시지 생성
- 스키마 정의 위치: `src/lib/validators/blogs.ts`

```typescript
export const createBlogSchema = z.object({
  title: z.string().min(1, "제목을 입력해 주세요."),
  content: z.string().min(1, "내용을 입력해주세요."),
});
export type createBlogSchema = z.infer<typeof createBlogSchema>;
```

---

## 프로젝트 구조

```
src/
├── app/                            # 페이지, 레이아웃, API 라우트
│   ├── (main)/                     # 공개 페이지 라우트 그룹
│   │   ├── page.tsx                # 홈 페이지
│   │   ├── layout.tsx              # 메인 레이아웃
│   │   ├── blog/                   # 블로그 (CSR + SSR 혼합)
│   │   │   ├── page.tsx
│   │   │   └── [blogId]/page.tsx
│   │   ├── blog-ssr/               # 블로그 (순수 SSR)
│   │   │   ├── page.tsx
│   │   │   └── [blogId]/page.tsx
│   │   ├── portfolio/              # 포트폴리오
│   │   │   └── page.tsx
│   │   └── posts/                  # 게시글
│   │       ├── page.tsx
│   │       └── [postId]/page.tsx
│   ├── api/                        # API 라우트
│   │   ├── blogs/route.ts          # POST: 블로그 생성
│   │   ├── db-prac/route.ts        # Drizzle ORM 연습
│   │   ├── ping/route.tsx          # GET/POST 테스트
│   │   └── ping/[pingId]/route.tsx # 동적 라우트 테스트
│   └── admin/                      # 관리자 (예정)
│
├── features/                       # 기능별 모듈 (Server/Client 분리 패턴)
│   ├── blog/components/blog-list/
│   │   ├── blog-list.tsx           # Server Component
│   │   └── blog-list.client.tsx    # Client Component
│   ├── portfolio/components/
│   │   ├── portfolio.tsx / portfolio.client.tsx
│   │   └── portfolio-detail.tsx / portfolio-detail.client.tsx
│   └── posts/components/
│       ├── post-detail.tsx
│       └── post-detail.client.tsx
│
├── components/
│   ├── ui/                         # shadcn/ui (56개 컴포넌트)
│   ├── common/logo.tsx             # 앱 로고
│   └── layouts/                    # 헤더, 네비게이션
│       ├── app-header.tsx
│       └── partials/nav/
│           ├── desktop-nav.tsx
│           └── mobile-nav.tsx
│
├── lib/
│   ├── db/
│   │   ├── client.ts               # Drizzle ORM 클라이언트 (커넥션 풀링)
│   │   └── schema.ts               # DB 스키마 (6개 테이블)
│   ├── http/response.ts            # 표준 API 응답 헬퍼
│   ├── validators/blogs.ts         # Zod 유효성 검증 스키마
│   └── utils.ts                    # cn() 유틸리티
│
└── hooks/use-mobile.ts             # 모바일 감지 훅
```

## 데이터베이스 스키마

Drizzle ORM + Supabase PostgreSQL. 스키마 네임스페이스: `my-next-app-schema`

| 테이블 | 용도 | 주요 필드 |
|--------|------|-----------|
| `sample_table` | 참고용 예시 | id(uuid), title, username(unique), content, age |
| `users` | 사용자 | id(uuid), email(unique), passwordHash, nickname, role |
| `posts` | 게시글 | id(serial), authorId(FK→users), title, content |
| `post_likes` | 좋아요 | userId + postId (복합 PK) |
| `post_comments` | 댓글 (대댓글) | id(serial), postId(FK), parentId(자기참조), depth |
| `blogs` | 블로그 | id(serial), title, content |

주요 특징:
- UUID 기본값 (v4 랜덤 생성)
- Cascade 삭제 제약조건
- Check 제약조건 (예: age > 20)
- 자주 조회하는 컬럼에 인덱스 설정
- `.$onUpdate()`로 updatedAt 자동 갱신

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/api/blogs` | 블로그 생성 (Zod 검증 → DB INSERT → 201 반환) |
| GET | `/api/db-prac` | Drizzle ORM 연습 (SELECT, WHERE, JOIN, OFFSET/LIMIT) |
| GET/POST | `/api/ping` | 테스트용 ping/pong |
| GET | `/api/ping/[pingId]` | 동적 라우트 테스트 |

API 응답 규칙 (`src/lib/http/response.ts`):

```typescript
response.ok(data)                     // { success: true, data }
response.fail(message, status, details) // { success: false, error: { message, details } }
```

## Server/Client 컴포넌트 분리 패턴

파일 명명 규칙으로 서버/클라이언트 컴포넌트를 구분:

- `component.tsx` — Server Component (기본, 지시어 없음)
- `component.client.tsx` — Client Component (`"use client"` 지시어 포함)

```
Server Component (데이터 fetch)
  └→ Client Component (상태 관리, 이벤트 핸들링)
```

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 런타임 | React 19 (React Compiler 활성화) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS v4 |
| UI 컴포넌트 | shadcn/ui (56개) |
| ORM | Drizzle ORM |
| DB | PostgreSQL (Supabase) |
| 폼 검증 | React Hook Form + Zod |
| 데이터 페칭 | TanStack React Query |
| 아이콘 | Lucide React |
| 패키지 매니저 | pnpm |
