import { IGetBoards } from "@/interface/boardInterface";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export const getBoards = async (projectId: string): Promise<IGetBoards> => {
  const response = await apiClient.get(API_ROUTES.BOARD.GET_BOARDS + projectId);
  return response.data;
};
