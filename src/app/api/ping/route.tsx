import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("/api/ping GET 실행");
  const url = new URL(request.url);
  console.log("URL", url);

  console.log("headers", request.headers);
  //---------response
  const respHeaders = new Headers();
  respHeaders.set("pingHeader", "pongHeaders");

  const response = NextResponse.json(
    {
      ping: "pong",
    },
    { headers: respHeaders },
  );
  response.cookies.set("sample-cookie", "sample-value"); //key, value
  return response;
}

export async function POST(request: NextRequest) {
  console.log("/api/ping POST 실행");

  //json 형태의 request.body parsing
  const body = await request.json();
  console.log(body);
  const response = NextResponse.json({
    ping: "POST-pong",
  });
  return response;
}
