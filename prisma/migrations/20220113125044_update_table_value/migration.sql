/*
  Warnings:

  - Made the column `name` on table `values` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attribute_id` on table `values` required. This step will fail if there are existing NULL values in that column.
  - Made the column `catalog_id` on table `values` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "values" DROP CONSTRAINT "values_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "values" DROP CONSTRAINT "values_catalog_id_fkey";

-- AlterTable
ALTER TABLE "values" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "attribute_id" SET NOT NULL,
ALTER COLUMN "catalog_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "values" ADD CONSTRAINT "values_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "values" ADD CONSTRAINT "values_catalog_id_fkey" FOREIGN KEY ("catalog_id") REFERENCES "catalogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
