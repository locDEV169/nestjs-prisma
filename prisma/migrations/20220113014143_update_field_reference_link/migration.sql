/*
  Warnings:

  - You are about to drop the column `video` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "video",
ADD COLUMN     "reference_link" TEXT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "video",
ADD COLUMN     "reference_link" TEXT;
