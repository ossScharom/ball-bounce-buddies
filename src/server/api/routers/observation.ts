import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const observationRouter = createTRPCRouter({
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
