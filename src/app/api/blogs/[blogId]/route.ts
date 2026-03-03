import { db } from "@/lib/db/client";
import { blogsTable } from "@/lib/db/schema";
import response from "@/lib/http/response";
import { eq } from "drizzle-orm";

import { type NextRequest } from "next/server";

interface RouteContext {
  params: Promise<{ blogId: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { blogId } = await context.params;
  console.log(blogId);

  const [blog] = await db
    .select()
    .from(blogsTable)
    .where(eq(blogsTable.id, Number(blogId)));
  return response.ok(blog);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { blogId } = await context.params;
  const data = await request.json();
  console.log(data);
  console.log(blogId);

  const blog = await db
    .update(blogsTable)
    .set(data)
    .where(eq(blogsTable.id, Number(blogId)))
    .returning();
  return response.ok(blog);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { blogId } = await context.params;
  const blog = await db
    .delete(blogsTable)
    .where(eq(blogsTable.id, Number(blogId)));

  return response.ok(blog);
}
