import { db } from "@/lib/db/client";
import { blogsTable, postsTable, usersTable } from "@/lib/db/schema";
import { and, asc, desc, eq, gt, gte, isNull, lte, or } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  //Drizzle은 SQL-Like ORM

  //   게시글 추가

  // 게시글 추가
  //   const promises = Array(10)
  //     .keys()
  //     .map((value) => {
  //       return db
  //         .insert(blogsTable)
  //         .values({
  //           title: `게시글 ${value}`,
  //           content: `게시글 ${value} 내용`,
  //         })
  //         .returning();
  //     });
  //   const result = await Promise.all(promises);
  //   console.log(result);

  // Update(수정)
  //   const result = await db
  //     .update(blogsTable)
  //     .set({
  //       title: "수정된 게시글",
  //       content: "수정된 내용",
  //       // import { eq } from "drizzle-orm";
  //     })
  //     .where(eq(blogsTable.id, 1))
  //     .returning();
  //   console.log(result);

  //Delete (삭제)
  //   const result = await db.delete(blogsTable).where(eq(blogsTable.id, 1));

  // 1. 컬럼 지정해서 가져오기
  const result = await db
    .select({ id: blogsTable.id, title: blogsTable.title })
    .from(blogsTable);
  console.log(result);

  // 2. 전체 컬럼 가져오기
  const result2 = await db.select().from(blogsTable);
  console.log(result2);
  console.log("-====================");
  // 3. 조건 지정해서 가져오기 (where )
  const result3 = await db
    .select()
    .from(blogsTable)
    // import {gt, lte} from 'drizzle-orm'
    .where(and(gt(blogsTable.id, 3), lte(blogsTable.id, 8)));
  console.log(result3);
  console.log("-====================");

  // Where절 사용하기2 (OR 조건)
  const blogList4 = await db
    .select()
    .from(blogsTable)
    .where(or(eq(blogsTable.title, "게시글제목"), gte(blogsTable.id, 3)));
  console.log(blogList4);
  console.log("-====================");

  // 정렬 + offset
  const blogList5 = await db
    .select()
    .from(blogsTable)
    .orderBy(asc(blogsTable.id))
    .offset(5);
  console.log(blogList5);
  console.log("-====================");

  // Where절 사용하기3 (NULL 조건)
  const blogList6 = await db
    .select()
    .from(blogsTable)
    .where(isNull(blogsTable.content));

  console.log(blogList6);
  console.log("-====================");

  // INNER JOIN: 블로그 + 작성자 정보
  const blogsWithAuthor = await db
    .select({
      blogId: blogsTable.id,
      blogTitle: blogsTable.title,
      authorNickname: usersTable.nickname,
      authorEmail: usersTable.email,
      createdAt: blogsTable.createdAt,
    })
    .from(blogsTable)
    .innerJoin(usersTable, eq(blogsTable.id, usersTable.id))
    .where(eq(usersTable.role, "user"))
    .orderBy(desc(blogsTable.createdAt))
    .limit(20);

  console.log(blogsWithAuthor);

  return NextResponse.json({});
}
