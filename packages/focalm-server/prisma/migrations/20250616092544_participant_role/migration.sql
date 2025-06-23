/*
  Warnings:

  - The primary key for the `UserInTaskTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tag` on the `UserInTaskTag` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `UserInTaskTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserInTaskTag" DROP CONSTRAINT "UserInTaskTag_pkey",
DROP COLUMN "tag",
ADD COLUMN     "roleId" UUID NOT NULL,
ADD CONSTRAINT "UserInTaskTag_pkey" PRIMARY KEY ("userInTaskId", "roleId");

-- CreateTable
CREATE TABLE "ParticipantRole" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "ParticipantRole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserInTaskTag" ADD CONSTRAINT "UserInTaskTag_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "ParticipantRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
