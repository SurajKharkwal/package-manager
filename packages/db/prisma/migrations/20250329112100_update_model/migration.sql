-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'CREW');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('IMPORTANT', 'SUCCESS', 'GENERAL');

-- CreateTable
CREATE TABLE "Qrcode" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "costPrice" DOUBLE PRECISION NOT NULL,
    "sellingPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Qrcode_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CREW',
    "email" TEXT NOT NULL,
    "mobileNo" INTEGER,
    "imagePath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Entry" (
    "eid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "noOfItemsIn" INTEGER NOT NULL DEFAULT 0,
    "noOfItemsOut" INTEGER NOT NULL DEFAULT 0,
    "qrcodeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("eid")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" "Category" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "for" "Role" NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_mobileNo_key" ON "Account"("mobileNo");

-- CreateIndex
CREATE UNIQUE INDEX "Entry_qrcodeId_date_key" ON "Entry"("qrcodeId", "date");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_qrcodeId_fkey" FOREIGN KEY ("qrcodeId") REFERENCES "Qrcode"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Account"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
