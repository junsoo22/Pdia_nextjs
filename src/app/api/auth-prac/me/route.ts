import { verifyAccessToken } from "@/lib/auth/jwt";
import response from "@/lib/http/response";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
// 자기 자신을 확인하는 API
// 클라이언트 사이드에서 현재 로그인한 사용자의 세션 유효성을 검증하고,
// 사용자 프로필 정보를 가져와 UI 상태를동 기화하기위해 사용.
/**
 * 학습을 위해 다음 두가지 모두 받음
 * 1. 쿠키 기반 인증
 * 2. 토큰 기반 인증(Authorization 헤더)
 */

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  // 파일로 분리하는게 깔끔하지만, 학습적인 직관을 위해 해당파일에 작성
  let accessToken = cookieStore.get("access-token")?.value;
  // 쿠키가 없으면 Authorization 헤더에서 토큰을 가져옴
  if (!accessToken) {
    const authHeader = request.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      accessToken = authHeader.split(" ")[1];
    }
  }
  if (!accessToken) {
    return response.fail("Unauthorized", 401);
  }
  const payload = await verifyAccessToken(accessToken);
  if (!payload) {
    return response.fail("Unauthorized", 401);
  }
  return response.ok({
    user: {
      id: payload.userId,
      email: payload.email,
      nickname: payload.nickname,
      role: payload.role,
    },
  });
}
