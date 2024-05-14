-- AlterTable
ALTER TABLE "values" ADD COLUMN     "catalog_id" INTEGER;

-- AddForeignKey
ALTER TABLE "values" ADD CONSTRAINT "values_catalog_id_fkey" FOREIGN KEY ("catalog_id") REFERENCES "catalogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
