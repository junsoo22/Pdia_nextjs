import { db } from "@/lib/db/client";
import { usersTable } from "@/lib/db/schema";
import response from "@/lib/http/response";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { signAccessToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";
const loginSchema = z.object({
  email: z.email({ message: "이메일형식이아닙니다." }),
  password: z.string().min(1, "비밀번호를입력해주세요."),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = loginSchema.safeParse(body);
  if (!result.success) {
    return response.fail("이메일 혹은 패스워드가 틀렸습니다.", 400);
  }
  const { email, password } = result.data;
  // 1. 이메일로유저조회
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  if (!user) {
    return response.fail("이메일혹은패스워드가틀렸습니다.", 400);
  }
  // 2. 비밀번호비교
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return response.fail("이메일혹은패스워드가틀렸습니다.", 400);
  }
  // 3. JWT 토큰생성
  const accessToken = await signAccessToken({
    userId: user.id,
    email: user.email,
    nickname: user.nickname,
    role: user.role,
  });
  // 4. 쿠키설정(// 따로파일로분리하는게깔끔하지만, 학습적인직관을위해해당파일에작성)
  const cookieStore = await cookies();
  cookieStore.set("access-token", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 1, // 1 hour
  });
  return response.ok({
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
    },
    token: accessToken,
  });
}
