/*
  Warnings:

  - You are about to drop the column `priority` on the `SLA` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SLA" DROP COLUMN "priority",
ADD COLUMN     "priorityId" TEXT;

-- AddForeignKey
ALTER TABLE "SLA" ADD CONSTRAINT "SLA_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority"("id") ON DELETE SET NULL ON UPDATE CASCADE;
