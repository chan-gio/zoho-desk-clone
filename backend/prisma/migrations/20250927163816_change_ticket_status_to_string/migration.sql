/*
  Warnings:

  - The `status` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `filename` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedBy` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SLA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TicketPriority" ADD VALUE 'urgent';

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'super_admin';

-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "filename" VARCHAR(255) NOT NULL,
ADD COLUMN     "mimeType" VARCHAR(100) NOT NULL,
ADD COLUMN     "originalName" VARCHAR(255) NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ADD COLUMN     "tenantId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uploadedBy" TEXT NOT NULL,
ADD COLUMN     "url" VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "description" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SLA" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "departmentId" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "escalationRules" JSONB,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "priority" "TicketPriority" NOT NULL DEFAULT 'medium',
ADD COLUMN     "resolutionTime" INTEGER NOT NULL DEFAULT 72,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "closedAt" TIMESTAMP(3),
ADD COLUMN     "columnId" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'open';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "description" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "TicketStatus";

-- CreateTable
CREATE TABLE "Column" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "color" VARCHAR(7),
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Column_tenantId_idx" ON "Column"("tenantId");

-- CreateIndex
CREATE INDEX "Column_order_idx" ON "Column"("order");

-- CreateIndex
CREATE INDEX "Ticket_status_idx" ON "Ticket"("status");

-- CreateIndex
CREATE INDEX "Ticket_columnId_idx" ON "Ticket"("columnId");

-- CreateIndex
CREATE INDEX "Ticket_order_idx" ON "Ticket"("order");

-- CreateIndex
CREATE INDEX "Ticket_closedAt_idx" ON "Ticket"("closedAt");

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE SET NULL ON UPDATE CASCADE;
