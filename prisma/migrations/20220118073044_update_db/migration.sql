/*
  Warnings:

  - Made the column `product_id` on table `catalogs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "catalogs" DROP CONSTRAINT "catalogs_product_id_fkey";

-- AlterTable
ALTER TABLE "catalogs" ADD COLUMN     "electrical" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "width" DROP NOT NULL,
ALTER COLUMN "depth" DROP NOT NULL,
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "width_metric" DROP NOT NULL,
ALTER COLUMN "depth_metric" DROP NOT NULL,
ALTER COLUMN "height_metric" DROP NOT NULL,
ALTER COLUMN "product_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "note" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "catalogs" ADD CONSTRAINT "catalogs_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
