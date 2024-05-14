/*
  Warnings:

  - You are about to drop the column `equipment_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `attribute_on_equipments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `equipments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attribute_on_equipments" DROP CONSTRAINT "attribute_on_equipments_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_on_equipments" DROP CONSTRAINT "attribute_on_equipments_equipment_id_fkey";

-- DropForeignKey
ALTER TABLE "equipments" DROP CONSTRAINT "equipments_sub_category_Id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_equipment_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "equipment_id",
ADD COLUMN     "brand_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "attribute_on_equipments";

-- DropTable
DROP TABLE "equipments";

-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "sub_category_Id" INTEGER,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attribute_on_brands" (
    "brand_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attribute_on_brands_pkey" PRIMARY KEY ("brand_id","attribute_id")
);

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_sub_category_Id_fkey" FOREIGN KEY ("sub_category_Id") REFERENCES "sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_on_brands" ADD CONSTRAINT "attribute_on_brands_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_on_brands" ADD CONSTRAINT "attribute_on_brands_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
