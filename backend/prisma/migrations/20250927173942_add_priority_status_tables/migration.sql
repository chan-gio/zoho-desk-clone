/*
  Warnings:

  - The `priority` column on the `SLA` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `priority` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Ticket_priority_idx";

-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "statusId" TEXT;

-- AlterTable
ALTER TABLE "SLA" DROP COLUMN "priority",
ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'medium';

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "priority",
ADD COLUMN     "priorityId" TEXT;

-- DropEnum
DROP TYPE "TicketPriority";

-- CreateTable
CREATE TABLE "Priority" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "color" VARCHAR(7) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Priority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "color" VARCHAR(7) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Priority_tenantId_idx" ON "Priority"("tenantId");

-- CreateIndex
CREATE INDEX "Priority_order_idx" ON "Priority"("order");

-- CreateIndex
CREATE INDEX "Status_tenantId_idx" ON "Status"("tenantId");

-- CreateIndex
CREATE INDEX "Status_order_idx" ON "Status"("order");

-- CreateIndex
CREATE INDEX "Column_statusId_idx" ON "Column"("statusId");

-- CreateIndex
CREATE INDEX "Ticket_priorityId_idx" ON "Ticket"("priorityId");

-- AddForeignKey
ALTER TABLE "Priority" ADD CONSTRAINT "Priority_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority"("id") ON DELETE SET NULL ON UPDATE CASCADE;
