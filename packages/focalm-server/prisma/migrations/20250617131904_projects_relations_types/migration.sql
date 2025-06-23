/*
  Warnings:

  - A unique constraint covering the columns `[ownProjectId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownProjectId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ownProjectId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskToTaskRelationType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "forward" TEXT NOT NULL,
    "inverse" TEXT NOT NULL,
    "projectId" UUID NOT NULL,

    CONSTRAINT "TaskToTaskRelationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskToTaskRelation" (
    "srcId" UUID NOT NULL,
    "dstId" UUID NOT NULL,
    "typeId" UUID NOT NULL,

    CONSTRAINT "TaskToTaskRelation_pkey" PRIMARY KEY ("srcId","dstId","typeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ownProjectId_key" ON "User"("ownProjectId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_ownProjectId_fkey" FOREIGN KEY ("ownProjectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskToTaskRelationType" ADD CONSTRAINT "TaskToTaskRelationType_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskToTaskRelation" ADD CONSTRAINT "TaskToTaskRelation_srcId_fkey" FOREIGN KEY ("srcId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskToTaskRelation" ADD CONSTRAINT "TaskToTaskRelation_dstId_fkey" FOREIGN KEY ("dstId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskToTaskRelation" ADD CONSTRAINT "TaskToTaskRelation_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TaskToTaskRelationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
