// src/app/(main)/portfolio/page.tsx
import Portfolio from "@/features/portfolio/components/portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "포트폴리오 페이지",
  description: "포트폴리오 페이지입니다.",
};

export interface PortfolioPageProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}
//url searchPararms를 받는 방법
//1. page의 인자로 받기(서버 컴포넌트)
//  -> page의 인자로 받을 경우 Next.js 15버전부터 Promise 객체로 전달받음.
//2. useSearchParams 라는 Hook 사용하기(클라이언트 컴포넌트만 가능)

//오직 서버 컴포넌트만 async function으로 정의할 수 있음.

export default async function PortfolioPage({
  searchParams,
}: PortfolioPageProps) {
  const { page, limit } = await searchParams;

  return (
    <div className="container mx-auto text-center p-8">
      <h1 className="text-3xl font-bold underline">포트폴리오 페이지</h1>
      <p className="mt-4 text-lg">여기는 포트폴리오 페이지입니다.</p>
      <Portfolio page={Number(page ?? 1)} limit={Number(limit ?? 10)} />
    </div>
  );
}
