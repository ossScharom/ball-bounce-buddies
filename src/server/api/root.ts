import { checkInRouter } from "./routers/checkIn";
import { sportPlaceRouter } from "./routers/sportPlace";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  sportPlaces: sportPlaceRouter,
  checkIn: checkInRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
