import { db } from "@/lib/db/client";
import { blogCommentsTable, blogsTable } from "@/lib/db/schema";
import response from "@/lib/http/response";
import type { NextRequest } from "next/server";

interface RouteContext {
  params: Promise<{ blogId: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  //   const { blogId } = await context.params;
  const comments = await db.select().from(blogCommentsTable);
  console.log(comments);
  return response.ok(comments);
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { blogId } = await context.params;
  const data = await request.json();
  console.log(data);
  console.log(Number(blogId));
  const comment = await db
    .insert(blogCommentsTable)
    .values({
      blogId: Number(blogId),
      content: data.content,
    })
    .returning();

  return response.ok(comment);
}
