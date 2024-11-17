-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CLIENT', 'EMPLOYEE', 'PROVIDER');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('BILLING', 'SHIPPING');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PREPARING', 'IN_TRANSIT', 'DELIVERED', 'CANCELED');

-- CreateEnum
CREATE TYPE "CurrencyEnum" AS ENUM ('USD', 'EUR', 'GBP', 'JPY', 'RON');

-- CreateEnum
CREATE TYPE "PricesAvailability" AS ENUM ('IN_STOCK', 'OUT_OF_STOCK');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "UserType" NOT NULL,
    "imageProfile" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "employeeName" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "company" TEXT NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "addressId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "addressType" "AddressType" NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addressId")
);

-- CreateTable
CREATE TABLE "OrdersEmployee" (
    "orderEmployeeId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "employeeUsername" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL,
    "employeeApproved" BOOLEAN NOT NULL,

    CONSTRAINT "OrdersEmployee_pkey" PRIMARY KEY ("orderEmployeeId")
);

-- CreateTable
CREATE TABLE "OrdersProvider" (
    "orderProviderId" SERIAL NOT NULL,
    "orderEmployeeId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "providerUsername" TEXT NOT NULL,
    "providerApproved" BOOLEAN NOT NULL,
    "quantity" INTEGER NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatus" NOT NULL,

    CONSTRAINT "OrdersProvider_pkey" PRIMARY KEY ("orderProviderId")
);

-- CreateTable
CREATE TABLE "ratingClient" (
    "ratingId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "review" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ratingClient_pkey" PRIMARY KEY ("ratingId")
);

-- CreateTable
CREATE TABLE "Products" (
    "productId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" "CurrencyEnum" NOT NULL,
    "name" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "pricesAvailability" "PricesAvailability",
    "providerUsername" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL,
    "imageUrls" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "nrOfRatings" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "quality" DECIMAL(15,4) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_email_key" ON "Users"("username", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_username_key" ON "Client"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_username_key" ON "Employee"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_username_key" ON "Provider"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ratingClient_username_productId_key" ON "ratingClient"("username", "productId");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_username_fkey" FOREIGN KEY ("username") REFERENCES "Client"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersEmployee" ADD CONSTRAINT "OrdersEmployee_username_fkey" FOREIGN KEY ("username") REFERENCES "Client"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersEmployee" ADD CONSTRAINT "OrdersEmployee_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("addressId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersEmployee" ADD CONSTRAINT "OrdersEmployee_employeeUsername_fkey" FOREIGN KEY ("employeeUsername") REFERENCES "Employee"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersProvider" ADD CONSTRAINT "OrdersProvider_orderEmployeeId_fkey" FOREIGN KEY ("orderEmployeeId") REFERENCES "OrdersEmployee"("orderEmployeeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersProvider" ADD CONSTRAINT "OrdersProvider_providerUsername_fkey" FOREIGN KEY ("providerUsername") REFERENCES "Provider"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersProvider" ADD CONSTRAINT "OrdersProvider_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratingClient" ADD CONSTRAINT "ratingClient_username_fkey" FOREIGN KEY ("username") REFERENCES "Client"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratingClient" ADD CONSTRAINT "ratingClient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_providerUsername_fkey" FOREIGN KEY ("providerUsername") REFERENCES "Provider"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
