import { IGetLists } from "@/interface/listInterface";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";
import { createListSchema } from "@/validations/listValidation";
import { z } from "zod";

type CreateList = {
  boardId: string;
  data: z.infer<typeof createListSchema>;
};

export const createList = async ({ boardId, data }: CreateList) => {
  const response = await apiClient.post(
    API_ROUTES.LIST.CREATE_LIST + boardId,
    data
  );
  return response.data;
};

export const getLists = async ({
  boardId,
}: {
  boardId: string;
}): Promise<IGetLists> => {
  const response = await apiClient.get(API_ROUTES.LIST.CREATE_LIST + boardId);
  return response.data;
};

type UpdateListPosition = {
  activeListId: string;
  overListId: string;
  boardId: string;
};
export const updateListPosition = async (data: UpdateListPosition) => {
  const response = await apiClient.post(
    API_ROUTES.LIST.UPDATE_LIST_POSITION,
    data
  );
  return { ...response.data, boardId: data.boardId };
};
