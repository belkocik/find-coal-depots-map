-- CreateTable
CREATE TABLE "coalDepots" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "coalDepotName" TEXT NOT NULL,
    "mobilePhone" TEXT NOT NULL,
    "landline" TEXT NOT NULL,
    "coalDescAndAmount" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coalDepots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "coalDepots.userId" ON "coalDepots"("user_id");
