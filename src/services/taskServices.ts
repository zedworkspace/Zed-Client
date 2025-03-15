import { GetCard, ICard } from "@/interface/cardInterface";
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

export const getCard = async ({
  cardId,
}: {
  cardId: string;
}): Promise<GetCard> => {
  const response = await apiClient.get(API_ROUTES.CARD.GET_CARDBY_ID + cardId);
  return response.data;
};

export const updatedCard = async ({
  cardId,
  formData,
}: {
  cardId: string;
  formData: ICard;
}) => {
  const response = await apiClient.put(
    API_ROUTES.CARD.UPDATE_CARD_BYID + cardId + "/edit",
    formData
  );
  return response.data;
};

type UpdateCardPositionWithInList = {
  listId: string;
  fromCardId: string;
  toCardId: string;
};

export const updateCardPositionWithInList = async (
  data: UpdateCardPositionWithInList
) => {
  const response = await apiClient.post(
    API_ROUTES.CARD.UPDATE_CARD_POSITION_IN_SAME_LIST,
    data
  );
  return response.data;
};
