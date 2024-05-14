-- DropForeignKey
ALTER TABLE "values" DROP CONSTRAINT "values_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "values" DROP CONSTRAINT "values_catalog_id_fkey";

-- AlterTable
ALTER TABLE "values" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "attribute_id" DROP NOT NULL,
ALTER COLUMN "catalog_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "values" ADD CONSTRAINT "values_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "values" ADD CONSTRAINT "values_catalog_id_fkey" FOREIGN KEY ("catalog_id") REFERENCES "catalogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
