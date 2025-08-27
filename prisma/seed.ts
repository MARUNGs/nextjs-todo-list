/**
 * 서버를 실행하면서 기본 데이터를 세팅해주는 파일
 */

import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // 사용자 삭제
  await prisma.user.deleteMany();

  // 할일목록 삭제
  await prisma.todos.deleteMany();

  // 공통코드 설정
  await prisma.commonCd.deleteMany();
  await prisma.commonCd.createMany({
    data: [
      { group_nm: "todoStatus", code: "10", value: "todo" },
      { group_nm: "todoStatus", code: "20", value: "doing" },
      { group_nm: "todoStatus", code: "30", value: "done" },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
