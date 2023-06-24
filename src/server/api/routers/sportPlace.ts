import { z } from "zod";
import { Sport } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const sportPlaceRouter = createTRPCRouter({
  getAllSportPlacesOf: publicProcedure.input(z.object({ type: z.string() })).
  query(({ ctx, input }) => {
    return ctx.prisma.sportPlace.findMany({where: {type: input.type as Sport}});
  }),
});
