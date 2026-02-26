type BlogDetailPageProps = {
  params: Promise<{ blogId: string }>;
};

type BlogDetail = {
  id: number;
  title: string;
  content: string;
};

export default async function BlogDetailPageSSR({
  params,
}: BlogDetailPageProps) {
  const { blogId } = await params;
  const resp = await fetch(
    `https://shinhan-pda-react-router-full-examp.vercel.app/api/posts/${blogId}`,
  );
  const data = await resp.json();
  const post: BlogDetail = data.data.post;
  console.log(post);
  console.log(post.title);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-3xl">
        {/* 상단 네비게이션 */}
        <div className="mb-4">
          <a
            href="/blog-ssr"
            className="text-sm text-gray-500 hover:text-indigo-600"
          >
            ← 목록으로 돌아가기
          </a>
        </div>

        {/* 카드 컨테이너 */}
        <article className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* 메타 정보 */}
          <div className="mb-3 flex items-center gap-3 text-sm text-gray-500">
            <span>Post #{post.id}</span>
            <span>·</span>
            <span>상세 페이지 SSR</span>
          </div>

          {/* 제목 */}
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900">
            {post.title}
          </h1>

          {/* 본문 */}
          <div className="prose prose-slate max-w-none">
            <p className="whitespace-pre-line leading-relaxed text-gray-700">
              {post.content}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
