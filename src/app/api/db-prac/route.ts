import { NextResponse, type NextRequest } from "next/server";

export default async function GET(request: NextRequest) {
  //Drizzle은 SQL-Like ORM

  return NextResponse.json({});
}
