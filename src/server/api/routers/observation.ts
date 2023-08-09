import { Sport } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const observationRouter = createTRPCRouter({
  getObservations: protectedProcedure
    .input(z.object({ selectedSport: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.observation.findMany({
        where: {
          userId: ctx.session.user.id,
          sportPlace: {
            type: input.selectedSport as Sport,
          },
        },
        select: {
          sportPlace: {
            select: {
              lat: true,
              lon: true,
            },
          },
        },
      });
    }),
  createObservation: protectedProcedure
    .input(z.object({ sportPlaceId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.observation.create({
        data: {
          sportPlaceId: input.sportPlaceId,
          userId: ctx.session.user.id,
        },
      });
    }),
  deleteObservation: protectedProcedure
    .input(z.object({ sportPlaceId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.observation.delete({
        where: {
          sportPlaceId_userId: {
            sportPlaceId: input.sportPlaceId,
            userId: ctx.session.user.id,
          },
        },
      });
    }),
});
