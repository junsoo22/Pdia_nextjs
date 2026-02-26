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
