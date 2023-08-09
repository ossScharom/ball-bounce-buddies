import { checkInRouter } from "./routers/checkIn";
import { messageRouter } from "./routers/message";
import { observationRouter } from "./routers/observation";
import { sportPlaceRouter } from "./routers/sportPlace";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  sportPlaces: sportPlaceRouter,
  checkIn: checkInRouter,
  observation: observationRouter,
  message: messageRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
