import { z } from "zod";
import { Sport } from "@prisma/client";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { cssTransition } from "react-toastify";

export const messageRouter = createTRPCRouter({
  getMessages: publicProcedure
    .input(z.object({ sportPlaceId: z.optional(z.string().cuid()) }))
    .query(async ({ ctx, input }) => {
      return input.sportPlaceId
        ? await ctx.prisma.message.findMany({
            where: {
              sportPlaceId: input.sportPlaceId,
            },
            include: {
              user: { select: { image: true } },
            },
          })
        : [];
    }),
  create: protectedProcedure
    .input(z.object({ sportPlaceId: z.string().cuid(), message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.message.create({
        data: {
          sportPlaceId: input.sportPlaceId,
          userId: ctx.session.user.id,
          message: input.message,
        },
      });
    }),
});
