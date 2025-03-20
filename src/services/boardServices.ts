import {
  IGetBoard,
  IGetBoardMemebers,
  IGetBoards,
} from "@/interface/boardInterface";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export const getBoards = async (projectId: string): Promise<IGetBoards> => {
  const response = await apiClient.get(API_ROUTES.BOARD.GET_BOARDS + projectId);
  return response.data;
};

export const getBoardById = async ({
  boardId,
  projectId,
}: {
  boardId: string;
  projectId: string;
}): Promise<IGetBoard> => {
  const response = await apiClient.get(
    API_ROUTES.BOARD.GET_BOARD + projectId + "/" + boardId
  );
  return response.data;
};

export const createBoard = async (data: {
  name: string;
  projectId: string;
  allowedRoles?: string[];
}): Promise<IGetBoard> => {
  const response = await apiClient.post(API_ROUTES.BOARD.CREATE_BOARDS, data);
  return response.data;
};

export const getBoardMembers = async (
  boardId: string
): Promise<IGetBoardMemebers> => {
  const response = await apiClient.get(
    API_ROUTES.BOARD.GET_BOARD_MEMBERS + boardId
  );
  return response.data;
};
