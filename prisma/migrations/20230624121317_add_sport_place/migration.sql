/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Sport" AS ENUM ('TABLE_TENNIS', 'BASKETBALL', 'VOLLEYBALL');

-- DropTable
DROP TABLE "Example";

-- CreateTable
CREATE TABLE "SportPlace" (
    "id" TEXT NOT NULL,
    "type" "Sport" NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SportPlace_pkey" PRIMARY KEY ("id")
);
