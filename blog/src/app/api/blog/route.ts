import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import main  from "./main";

const prisma = new PrismaClient();


// ブログ全件取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


// ブログ投稿
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();

    await main();
    const post = await prisma.post.create({ data: {title, description} });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}