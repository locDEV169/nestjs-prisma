/*
  Warnings:

  - You are about to drop the column `application_id` on the `equipments` table. All the data in the column will be lost.
  - You are about to drop the column `equipment_name` on the `equipments` table. All the data in the column will be lost.
  - You are about to drop the column `attributes` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `brand_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `brand_on_applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `brand_on_equipments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `brands` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `country` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `equipments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "brand_on_applications" DROP CONSTRAINT "brand_on_applications_application_id_fkey";

-- DropForeignKey
ALTER TABLE "brand_on_applications" DROP CONSTRAINT "brand_on_applications_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "brand_on_equipments" DROP CONSTRAINT "brand_on_equipments_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "brand_on_equipments" DROP CONSTRAINT "brand_on_equipments_equipment_id_fkey";

-- DropForeignKey
ALTER TABLE "brands" DROP CONSTRAINT "brands_category_id_fkey";

-- DropForeignKey
ALTER TABLE "equipments" DROP CONSTRAINT "equipments_application_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_brand_id_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "country" VARCHAR(255) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "video" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "equipments" DROP COLUMN "application_id",
DROP COLUMN "equipment_name",
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "sub_category_Id" INTEGER;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "attributes",
DROP COLUMN "brand_id",
ADD COLUMN     "region" TEXT NOT NULL;

-- DropTable
DROP TABLE "applications";

-- DropTable
DROP TABLE "brand_on_applications";

-- DropTable
DROP TABLE "brand_on_equipments";

-- DropTable
DROP TABLE "brands";

-- CreateTable
CREATE TABLE "sub_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category_id" INTEGER,

    CONSTRAINT "sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attribute_on_equipments" (
    "equipment_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attribute_on_equipments_pkey" PRIMARY KEY ("equipment_id","attribute_id")
);

-- CreateTable
CREATE TABLE "attribute_on_products" (
    "product_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attribute_on_products_pkey" PRIMARY KEY ("product_id","attribute_id")
);

-- AddForeignKey
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_sub_category_Id_fkey" FOREIGN KEY ("sub_category_Id") REFERENCES "sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_on_equipments" ADD CONSTRAINT "attribute_on_equipments_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_on_equipments" ADD CONSTRAINT "attribute_on_equipments_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_on_products" ADD CONSTRAINT "attribute_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_on_products" ADD CONSTRAINT "attribute_on_products_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
