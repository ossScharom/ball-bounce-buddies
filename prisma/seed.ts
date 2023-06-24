import { prisma } from "~/server/db";
import basketballJson from "~/Leipzig_basketball_locations.json"
import beachvolleyballJson from "~/Leipzig_beachvolleyball_locations.json"
import tableTennisJson from "~/Leipzig_table_tennis_locations.json"
import { Sport } from "@prisma/client";

async function main() {
    // DELETE old state
    await prisma.sportPlace.deleteMany({})

    // CREATE new state
    await prisma.sportPlace.createMany(
        {
        data: Object.values(basketballJson).map(({lat,lon})=>({lat: Number(lat), lon: Number(lon), type: Sport.BASKETBALL})),
        skipDuplicates: true,
        }
    )
    await prisma.sportPlace.createMany(
        {
        data: Object.values(beachvolleyballJson).map(({lat,lon})=>({lat: Number(lat), lon: Number(lon), type: Sport.VOLLEYBALL})),
        skipDuplicates: true,
        }
    )
    await prisma.sportPlace.createMany(
        {
        data: Object.values(tableTennisJson).map(({lat,lon})=>({lat: Number(lat), lon: Number(lon), type: Sport.TABLE_TENNIS})),
        skipDuplicates: true,
        }
    )
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });