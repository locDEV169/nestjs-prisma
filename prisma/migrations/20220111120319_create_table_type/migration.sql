/*
  Warnings:

  - You are about to drop the column `type` on the `attributes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "attributes" DROP COLUMN "type",
ADD COLUMN     "type_id" INTEGER;

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- AddForeignKey
ALTER TABLE "attributes" ADD CONSTRAINT "attributes_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
