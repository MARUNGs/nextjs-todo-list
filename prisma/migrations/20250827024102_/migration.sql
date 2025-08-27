-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "remark_txt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."common_cd" ALTER COLUMN "remark_txt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."todos" ALTER COLUMN "memo" DROP NOT NULL,
ALTER COLUMN "remark_txt" DROP NOT NULL;
