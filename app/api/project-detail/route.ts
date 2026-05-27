import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing project id" }, { status: 400 });
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return NextResponse.json({ error: "Redis configuration missing" }, { status: 500 });
  }

  try {
    const res = await fetch(`${url}/get/project:detail:${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch from database" }, { status: 502 });
    }

    const data = await res.json();
    if (!data.result) {
      return NextResponse.json({ error: "Project details not found" }, { status: 404 });
    }

    const detail = JSON.parse(data.result);
    return NextResponse.json(detail);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
