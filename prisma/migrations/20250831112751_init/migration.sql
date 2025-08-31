-- CreateTable
CREATE TABLE "public"."User" (
    "id" VARCHAR(30) NOT NULL,
    "password" VARCHAR(300) NOT NULL,
    "nick_nm" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "remark_txt" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."todos" (
    "no" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "status" VARCHAR(2) NOT NULL,
    "highlightYn" VARCHAR(1) NOT NULL,
    "memo" TEXT,
    "remark_txt" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(300) NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("no")
);

-- CreateTable
CREATE TABLE "public"."common_cd" (
    "no" SERIAL NOT NULL,
    "group_nm" VARCHAR(50) NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "value" VARCHAR(100) NOT NULL,
    "remark_txt" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "common_cd_pkey" PRIMARY KEY ("no")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nick_nm_key" ON "public"."User"("nick_nm");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."todos" ADD CONSTRAINT "todos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
