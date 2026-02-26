import { List } from "lucide-react";
import Link from "next/link";
import BlogClient from "./blog.client";

export default async function Blog() {
  type Item = {
    id: number;
    title: string;
  };

  const res = await fetch(
    "https://shinhan-pda-react-router-full-examp.vercel.app/api/posts",
  );

  const data = await res.json();
  const serverFetchPosts: Item[] = data.data.items;

  return (
    <div>
      <BlogClient initialPosts={serverFetchPosts}></BlogClient>
    </div>
  );
}
