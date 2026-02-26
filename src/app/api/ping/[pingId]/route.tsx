import { NextResponse, type NextRequest } from "next/server";

interface RouteContext {
  params: Promise<{ pingId: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { pingId } = await context.params;
  return NextResponse.json({
    ping: `GET-PING-${pingId}`,
  });
}
