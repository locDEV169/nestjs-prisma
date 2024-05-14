/*
  Warnings:

  - You are about to drop the column `catalog_number` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `cubic` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `ship` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `standard_package` on the `products` table. All the data in the column will be lost.
  - Added the required column `note` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `equipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feature` to the `equipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `equipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `equipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `equipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `catalog` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensions` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensions_metric` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electrical` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimated_shipping_weight` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimated_shipping_weight_metric` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feature` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "category_id" INTEGER,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "video" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "equipments" ADD COLUMN     "application_id" INTEGER,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "feature" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "video" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "catalog_number",
DROP COLUMN "cubic",
DROP COLUMN "price",
DROP COLUMN "ship",
DROP COLUMN "standard_package",
ADD COLUMN     "catalog" INTEGER NOT NULL,
ADD COLUMN     "dimensions" TEXT NOT NULL,
ADD COLUMN     "dimensions_metric" TEXT NOT NULL,
ADD COLUMN     "electrical" TEXT NOT NULL,
ADD COLUMN     "equipment_id" INTEGER,
ADD COLUMN     "estimated_shipping_weight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "estimated_shipping_weight_metric" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "feature" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "attribute_on_products" (
    "product_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,

    CONSTRAINT "attribute_on_products_pkey" PRIMARY KEY ("product_id","attribute_id")
);

-- CreateTable
CREATE TABLE "attributes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_on_products" ADD CONSTRAINT "attribute_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_on_products" ADD CONSTRAINT "attribute_on_products_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE CASCADE;
