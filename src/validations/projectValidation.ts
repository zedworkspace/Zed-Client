import { z } from "zod";

export const createProjectSchema = z.object({
  projectName: z.string().nonempty("Project name is required"),
  projectDescription: z.string().nonempty("Project description is required"),
  projectLogo: z.custom<File>(
    (file) => file instanceof File,
    "Project logo is required"
  ),
});
