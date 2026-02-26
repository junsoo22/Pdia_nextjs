"use client";
// src/features/portfolio/components/portfolio-detail.client.tsx

import { useParams, usePathname } from "next/navigation";

//파라미터를 전달받는 방법
//src/app/portfolio/[portfolioId]/page.tsx -->/portfolio/:portfolioId
//1. page.tsx에서 인자로 전달받기 params: Promise<{portfolioId:string}>
//2. useParams Hook 사용하기 (Client Component만 가능)

export default function PortfolioDetailClient({
  portfolioId,
}: {
  portfolioId?: string;
}) {
  console.log(portfolioId);
  // props로도 받을 수 있고 params를 통해서도 받을 수 있습니다.

  const pathname = usePathname();
  console.log(pathname);
  const params = useParams<{ portfolioId: string }>();
  console.log(params);

  return <div>포트폴리오 상세 페이지 클라이언트</div>;
}
