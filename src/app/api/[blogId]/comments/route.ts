import { db } from "@/lib/db/client";
import { blogCommentsTable } from "@/lib/db/schema";
import response from "@/lib/http/response";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

interface RouteContext {
  params: Promise<{ blogId: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { blogId } = await context.params;
  const comments = await db
    .select()
    .from(blogCommentsTable)
    .where(eq(blogCommentsTable.blogId, Number(blogId)));
  console.log(comments);
  return response.ok(comments);
}
