import { z } from "zod";

export const createListSchema = z.object({
  name: z.string().nonempty("List name is required"),
});
