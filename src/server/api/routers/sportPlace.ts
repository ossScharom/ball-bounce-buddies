import { z } from "zod";
import { Sport } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const sportPlaceRouter = createTRPCRouter({
  getAllSportPlacesOf: publicProcedure
    .input(z.object({ type: z.string() }))
    .query(async ({ ctx, input }) => {
      const timeThreshold = new Date();
      timeThreshold.setMinutes(timeThreshold.getMinutes() - 30);

      const positions = await ctx.prisma.sportPlace.findMany({
        where: { type: input.type as Sport },
        include: {
          observations: {
            where: {
              userId: ctx.session?.user.id,
            },
          },
          checkIns: {
            where: {
              active: true,
              createdAt: { gte: timeThreshold },
            },
          },
        },
      });

      return positions.map(({ observations, ...rest }) => ({
        isObserved: observations.length > 0,
        ...rest,
      }));
    }),
});
