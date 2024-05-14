-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "brand_name" VARCHAR(255) NOT NULL,
    "brand_image" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" SERIAL NOT NULL,
    "application_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipments" (
    "id" SERIAL NOT NULL,
    "equipment_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand_on_applications" (
    "brand_id" INTEGER NOT NULL,
    "application_id" INTEGER NOT NULL,

    CONSTRAINT "brand_on_applications_pkey" PRIMARY KEY ("brand_id","application_id")
);

-- CreateTable
CREATE TABLE "brand_on_equipments" (
    "brand_id" INTEGER NOT NULL,
    "equipment_id" INTEGER NOT NULL,

    CONSTRAINT "brand_on_equipments_pkey" PRIMARY KEY ("brand_id","equipment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brands_brand_name_key" ON "brands"("brand_name");

-- CreateIndex
CREATE UNIQUE INDEX "applications_application_name_key" ON "applications"("application_name");

-- CreateIndex
CREATE UNIQUE INDEX "equipments_equipment_name_key" ON "equipments"("equipment_name");

-- AddForeignKey
ALTER TABLE "brand_on_applications" ADD CONSTRAINT "brand_on_applications_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_on_applications" ADD CONSTRAINT "brand_on_applications_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_on_equipments" ADD CONSTRAINT "brand_on_equipments_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_on_equipments" ADD CONSTRAINT "brand_on_equipments_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
