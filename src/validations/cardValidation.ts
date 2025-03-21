import { z } from "zod";

export const createCardSchema = z.object({
  title: z.string().nonempty("Task name is required."),
});

export const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  // email: z.string().email(),
  profileImg: z.string(),
});

export const UpdateCardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.string().optional(),
  dueDate: z.union([z.date(), z.string()]).optional(),
  labels: z.array(z.string()).optional(),
  assignees: z.array(UserSchema.optional()),
});
