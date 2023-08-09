import { z } from "zod";
import { Sport } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const checkInRouter = createTRPCRouter({
  checkInHistory: protectedProcedure.input(z.object({selectedSport: z.string()})).query(
    ({ctx,input}) => {
        return ctx.prisma.checkIn.findMany({
            where: {
                userId: ctx.session.user.id,
                sportPlace: {
                    type: input.selectedSport as Sport
                }
            },
            select: {
              sportPlace: {
                select: {
                  lat: true,
                  lon: true
                }
              },
              createdAt: true,
              id: true
            }
        })
    }
  ),
  createCheckIn: protectedProcedure
    .input(z.object({ sportPlaceId: z.string().cuid() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.checkIn.create({
        data: {
          active: true,
          sportPlaceId: input.sportPlaceId,
          userId: ctx.session.user.id,
        },
      });
    }),
  deactivateCheckIn: protectedProcedure
    .input(z.object({ checkInId: z.string().cuid() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.checkIn.update({
        where:{
          id: input.checkInId
        },
        data: {
          active: false,
        },
        
      });
    }),
});
