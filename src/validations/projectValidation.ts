import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().nonempty("Project name is required"),
  description: z.string(),
  logo: z.custom<File>(
    (file) => file instanceof File,
    "Project logo is required"
  ),
});
