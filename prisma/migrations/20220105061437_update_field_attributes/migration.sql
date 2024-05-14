/*
  Warnings:

  - You are about to drop the `attribute_on_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attributes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attribute_on_products" DROP CONSTRAINT "attribute_on_products_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_on_products" DROP CONSTRAINT "attribute_on_products_product_id_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "attributes" TEXT[];

-- DropTable
DROP TABLE "attribute_on_products";

-- DropTable
DROP TABLE "attributes";
