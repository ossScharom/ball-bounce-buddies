import { z } from "zod";
import { Sport } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const sportPlaceRouter = createTRPCRouter({
  getAllSportPlacesOf: publicProcedure
    .input(z.object({ type: z.string() }))
    .query(async ({ ctx, input }) => {
      const timeThreshold = new Date();
      timeThreshold.setMinutes(timeThreshold.getMinutes() - 30);
      return ctx.prisma.sportPlace.findMany({
        where: { type: input.type as Sport },
        include: {
          checkIns: {
            where: {
              active: true,
              createdAt: { gte: timeThreshold },
            },
          },
        },
      });
    }),
});
