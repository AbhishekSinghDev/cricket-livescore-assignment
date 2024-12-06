import { z } from "zod";

export const BallDetailsValidationSchema = z.object({
  matchId: z.string(),
  runs: z.number().min(0).max(6),
  extras: z.number().min(0).optional(),
  extraType: z.enum(["wide", "no-ball", "bye", "leg-bye"]).optional(),
  wicket: z.boolean().optional(),
  wicketType: z
    .enum(["bowled", "caught", "lbw", "run-out", "stumped"])
    .optional(),
});
