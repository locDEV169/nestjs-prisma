/*
  Warnings:

  - You are about to drop the `Attribute` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attribute_on_brands" DROP CONSTRAINT "attribute_on_brands_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_on_products" DROP CONSTRAINT "attribute_on_products_attribute_id_fkey";

-- DropTable
DROP TABLE "Attribute";

-- CreateTable
CREATE TABLE "attributes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "attributes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attribute_on_brands" ADD CONSTRAINT "attribute_on_brands_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_on_products" ADD CONSTRAINT "attribute_on_products_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
