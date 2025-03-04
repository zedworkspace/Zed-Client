import { z } from "zod";

export const createCardSchema = z.object({
  title: z.string().nonempty("Task name is required."),
});
