-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "logId" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "start_date" TIMESTAMP(3);
