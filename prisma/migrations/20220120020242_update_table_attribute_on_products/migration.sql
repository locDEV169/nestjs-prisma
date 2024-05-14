/*
  Warnings:

  - The primary key for the `attribute_on_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brand_id` on the `attribute_on_products` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `attribute_on_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attribute_on_products" DROP CONSTRAINT "attribute_on_products_brand_id_fkey";

-- AlterTable
ALTER TABLE "attribute_on_products" DROP CONSTRAINT "attribute_on_products_pkey",
DROP COLUMN "brand_id",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD CONSTRAINT "attribute_on_products_pkey" PRIMARY KEY ("product_id", "attribute_id");

-- AddForeignKey
ALTER TABLE "attribute_on_products" ADD CONSTRAINT "attribute_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
