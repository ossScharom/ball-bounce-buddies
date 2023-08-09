-- CreateTable
CREATE TABLE "Observation" (
    "sportPlaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "observedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("sportPlaceId","userId")
);

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_sportPlaceId_fkey" FOREIGN KEY ("sportPlaceId") REFERENCES "SportPlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
