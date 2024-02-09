/*
  Warnings:

  - A unique constraint covering the columns `[UserName]` on the table `UserDetail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UserEmail]` on the table `UserDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_UserName_key" ON "UserDetail"("UserName");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_UserEmail_key" ON "UserDetail"("UserEmail");
