import { List } from "lucide-react";
import Link from "next/link";

export default async function PostList() {
  type Item = {
    id: number;
    title: string;
  };

  const res = await fetch(
    "https://shinhan-pda-react-router-full-examp.vercel.app/api/posts",
  );

  const data = await res.json();
  const postList: Item[] = data.data.items;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-2">
          <List className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">
            게시글 목록-SSR
          </h1>
        </div>

        {/* Post List */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {postList.map((item) => (
            <li
              key={item.id}
              className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-2 text-xs text-gray-400">Post #{item.id}</div>
              <Link href={`/blog-ssr/${item.id}`}>
                <h2 className="line-clamp-2 text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
                  {item.title}
                </h2>
              </Link>
              <div className="mt-3 text-sm text-gray-500">
                클릭해서 자세히 보기 →
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
