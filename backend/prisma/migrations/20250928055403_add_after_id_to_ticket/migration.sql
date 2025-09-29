-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "afterId" TEXT;

-- CreateIndex
CREATE INDEX "Ticket_afterId_idx" ON "Ticket"("afterId");
