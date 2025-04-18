import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, ilike } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const [user] = await db.insert(users).values(body).returning();
  return NextResponse.json(user);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    const results = name
      ? await db.select().from(users).where(ilike(users.name, `%${name}%`))
      : await db.select().from(users);

    return NextResponse.json(results);
  } catch (err) {
    console.error("GET /api/users error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
