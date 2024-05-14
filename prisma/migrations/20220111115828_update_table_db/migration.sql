/*
  Warnings:

  - The primary key for the `attribute_on_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_id` on the `attribute_on_products` table. All the data in the column will be lost.
  - You are about to drop the column `brand_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `catalog` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `dimensions` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `dimensions_metric` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `electrical` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `estimated_shipping_weight` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `estimated_shipping_weight_metric` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `attribute_on_brands` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `brands` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `attributes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brand_id` to the `attribute_on_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `attributes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attribute_on_brands" DROP CONSTRAINT "attribute_on_brands_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_on_brands" DROP CONSTRAINT "attribute_on_brands_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_on_products" DROP CONSTRAINT "attribute_on_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "brands" DROP CONSTRAINT "brands_sub_category_Id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_brand_id_fkey";

-- AlterTable
ALTER TABLE "attribute_on_products" DROP CONSTRAINT "attribute_on_products_pkey",
DROP COLUMN "product_id",
ADD COLUMN     "brand_id" INTEGER NOT NULL,
ADD CONSTRAINT "attribute_on_products_pkey" PRIMARY KEY ("brand_id", "attribute_id");

-- AlterTable
ALTER TABLE "attributes" ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "value" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "brand_id",
DROP COLUMN "catalog",
DROP COLUMN "dimensions",
DROP COLUMN "dimensions_metric",
DROP COLUMN "electrical",
DROP COLUMN "estimated_shipping_weight",
DROP COLUMN "estimated_shipping_weight_metric",
DROP COLUMN "region",
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "sub_category_Id" INTEGER,
ADD COLUMN     "video" TEXT;

-- DropTable
DROP TABLE "attribute_on_brands";

-- DropTable
DROP TABLE "brands";

-- CreateTable
CREATE TABLE "values" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "attribute_id" INTEGER,

    CONSTRAINT "values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalogs" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" TEXT,
    "catalog" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "estimated_shipping_weight" DOUBLE PRECISION NOT NULL,
    "estimated_shipping_weight_metric" DOUBLE PRECISION NOT NULL,
    "dimensions" TEXT NOT NULL,
    "dimensions_metric" TEXT NOT NULL,
    "electrical" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "depth" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "width_metric" DOUBLE PRECISION NOT NULL,
    "depth_metric" DOUBLE PRECISION NOT NULL,
    "height_metric" DOUBLE PRECISION NOT NULL,
    "product_id" INTEGER,

    CONSTRAINT "catalogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attribute_on_catalogs" (
    "catalog_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attribute_on_catalogs_pkey" PRIMARY KEY ("catalog_id","attribute_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attributes_name_key" ON "attributes"("name");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_sub_category_Id_fkey" FOREIGN KEY ("sub_category_Id") REFERENCES "sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "values" ADD CONSTRAINT "values_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_on_products" ADD CONSTRAINT "attribute_on_products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalogs" ADD CONSTRAINT "catalogs_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_on_catalogs" ADD CONSTRAINT "attribute_on_catalogs_catalog_id_fkey" FOREIGN KEY ("catalog_id") REFERENCES "catalogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_on_catalogs" ADD CONSTRAINT "attribute_on_catalogs_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
