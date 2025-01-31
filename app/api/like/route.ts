import { NextResponse } from "next/server";
import { addLike, getLikes, removeLike } from "@/server";

export async function GET() {
  const state = getLikes();
  return NextResponse.json(state);
}

export async function POST() {
  // 네트워크 지연 시뮬레이션
  await new Promise((resolve) =>
    setTimeout(resolve, 1000),
  );

  if (Math.random() < 0.5) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } else {
    const result = addLike();
    return NextResponse.json(result);
  }
}

export async function DELETE() {
  // 네트워크 지연 시뮬레이션
  // await new Promise((resolve) =>
  //   setTimeout(resolve, 1200 * Math.random() + 200),
  // );

  const result = removeLike();

  return NextResponse.json(result);
}
