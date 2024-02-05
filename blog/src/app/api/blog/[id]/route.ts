import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import main  from "../main";

const prisma = new PrismaClient();


// ブログ詳細記事取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);
    await main();
    const posts = await prisma.post.findFirst({ where: { id } });
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// ブログ編集
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);
    const { title, description } = await req.json();
    await main();

    const posts = await prisma.post.update({
      data: { title, description },
      where: { id }
    });
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// ブログ削除
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);
    await main();

    const posts = await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
