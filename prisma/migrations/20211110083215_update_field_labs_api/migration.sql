/*
  Warnings:

  - You are about to drop the column `brand_image` on the `brands` table. All the data in the column will be lost.
  - Added the required column `image` to the `brands` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "brands_brand_name_key";

-- DropIndex
DROP INDEX "products_image_key";

-- AlterTable
ALTER TABLE "brands" DROP COLUMN "brand_image",
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "image" SET DATA TYPE TEXT;
