import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import { createCardSchema } from "@/validations/cardValidation";
import { z } from "zod";

type CreateCard = {
  data: z.infer<typeof createCardSchema>;
  listId: string;
};

export const createCard = async ({ data, listId }: CreateCard) => {
  const response = await apiClient.post(
    API_ROUTES.CARD.CREATE_CARD + listId,
    data
  );

  return response.data;
};
