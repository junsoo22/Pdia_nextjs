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

### 서버

웹: 약속
요청을 보내면 응답이 온다.

- 클라이언트: 요청을 보내는 쪽
- 서버: 요청을 받아서 응답을 보내는 쪽

- input을 받아서 output을 만들어 주는 것: 함수
- 웹 서버: 함수(request를 받아서 repsonse를 만들어 주는 함수)
  - Request Method(GET, POST, UPDATE, DELETE, PUT, PATCH, OPTIONS)
  - Response StatusCode(2XX, 3XX, 4XX, 5XX).

### zod 적용하여 validation check하기

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

## 3. blog를 저장할 수 있는 blogsTable 생성

## 4. blog을 저장할 수 있는 blogsCommentsTable 생성

## 5. blogs에 대한 API Route 만들기

- /api/blogs (GET): searchParameter로 page 받아서 리턴. 1페이지당 10개 게시글 조회해서 줌
- /api/blogs/:blogId (GET): 게시글 상세조회(게시글 한 개 상세 조회)
- /api/blogs/:blogId (PATCH): 게시글 수정하기
- /api/blogs/:blogId (DELETE): 게시글 삭제하기

## 6. blogs/:blogId/comments에 대한 API Route 만들기

- /api/:blogId/comments (GET): 댓글 조회(모두 조회)
- /api/blogs/:blogId/comments (POST): 댓글 등록
- /api/blog-comments/:commentId (PATCH): 댓글 수정
- /api/blog-comments/:commentId (DELETE): 댓글 삭제

---

# JWT(Json Web Token)

H.P.S(Header, Payload, Signature)

- Signature: (H.P.jwt를 발급하는 주체인 server의 자체 secret key)를 해싱한 값
- 검증하려면 (H.P.Secret key)를 똑같이 해싱함. 그 결과인 signature 뽑을 수 있음.
- 토큰으로 들어온 signature와 방금 만든 signature가 동일하면 검증 성공. 인증 완료
- Stateless. 상태 저장X. -> 만료 맘대로 못시킴. 발급하면 끝.
