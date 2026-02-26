"use client"; //클라이언트 컴포넌트
// src/features/portfolio/components/portfolio.client.tsx

import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * [Next.js의 실행흐름]
 * 1. Server측 실행
 *    - 전체 DOM을 만들고 실행 (React Hook 제외)
 * 2. Client측 실행(client 컴포넌트의 React Hook만 실행)
 */

export default function PortfolioClient({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  console.log("이건 클라이언트 컴포넌트입니다.");
  console.log(page, limit);

  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<
    { name: string; id: number; email: string }[]
  >([]);

  const router = useRouter(); // router.push('/posts/1');

  //useSearchParams: 클라이언트 컴포넌트만 가능
  const searchParams = useSearchParams();
  const pageFromSearch = searchParams.get("page");
  console.log(pageFromSearch);

  useEffect(() => {
    // 클라이언트 컴포넌트
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
    console.log("useEffect");
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">클라이언트 컴포넌트</h1>
      <div>page: {page}</div>
      <div>limit{limit}</div>

      <Button className="cursor-pointer" onClick={() => setCount(count + 1)}>
        count: {count}
      </Button>

      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}

      <Button onClick={() => router.push("/posts")}>포스트로 가기</Button>
    </div>
  );
}
