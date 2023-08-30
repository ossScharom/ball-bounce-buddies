-- AlterTable
ALTER TABLE "SportPlace" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "SportPlace" ADD CONSTRAINT "SportPlace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
