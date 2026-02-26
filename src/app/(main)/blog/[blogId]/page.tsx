"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type BlogDetail = {
  id: number;
  title: string;
  content: string;
};

export default function BlogDetailPageClient() {
  const { blogId } = useParams<{ blogId: string }>();

  const [blog, setBlog] = useState<BlogDetail>();

  const url = `https://shinhan-pda-react-router-full-examp.vercel.app/api/posts/${blogId}`;

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setBlog(data.data.post));
  }, [blogId]);

  console.log(blog);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-3xl">
        {/* 상단 네비게이션 */}
        <div className="mb-4">
          <a
            href="/blog"
            className="text-sm text-gray-500 hover:text-indigo-600"
          >
            ← 목록으로 돌아가기
          </a>
        </div>

        {/* 카드 컨테이너 */}
        <article className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* 메타 정보 */}
          <div className="mb-3 flex items-center gap-3 text-sm text-gray-500">
            <span>Post #{blog?.id}</span>
            <span>·</span>
            <span>상세 페이지</span>
          </div>

          {/* 제목 */}
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900">
            {blog?.title}
          </h1>

          {/* 본문 */}
          <div className="prose prose-slate max-w-none">
            <p className="whitespace-pre-line leading-relaxed text-gray-700">
              {blog?.content}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
