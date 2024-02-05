import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error("DB接続に失敗", err);
    throw new Error("DB接続に失敗");
  }
}