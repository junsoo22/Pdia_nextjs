import { db } from "@/lib/db/client"; // Drizzle ORM DB 클라이언트
import { blogsTable } from "@/lib/db/schema"; // blogs 테이블 스키마
import response from "@/lib/http/response"; // 표준화된 응답 헬퍼
import { createBlogSchema } from "@/lib/validators/blogs"; // Zod 검증 스키마
import { desc } from "drizzle-orm";

import { NextRequest, type NextResponse } from "next/server"; // Next.js 요청 타입
import z from "zod"; // Zod (에러 트리 변환용)

export async function POST(request: NextRequest) {
  //1. /api/blogs로 오는 HTTP request Body에서 내용을 꺼내서
  //2. validation check를 하고
  //3. 통과 시 db에 insert
  const data = await request.json();
  const result = createBlogSchema.safeParse(data); //검증 실패시 에러 객체를 반환
  if (!result.success) {
    //검증 실패 처리
    return response.fail(JSON.stringify(z.treeifyError(result.error))); //zod의 에러를 트리구조로 변환
  }
  console.log(result);
  const [blog] = await db.insert(blogsTable).values(result.data).returning();
  return response.ok(blog, { status: 201 });
}

// GET요청
export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const page = url.searchParams.get("page");
  console.log(page); //3
  const limit = 10;
  const offest = (Number(page) - 1) * limit;

  const blogs = await db
    .select()
    .from(blogsTable)
    .orderBy(desc(blogsTable.createdAt))
    .limit(limit);

  return response.ok(blogs);
}
