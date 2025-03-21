import { IGetLists } from "@/interface/listInterface";
import { createCardSchema } from "@/validations/cardValidation";
import { QueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { Socket } from "socket.io-client";
import { z } from "zod";

type CreateCard = {
  data: z.infer<typeof createCardSchema>;
  listId: string;
  boardId: string;
  userId: string;
};

export const useCardSocket = ({
  socket,
  form,
}: {
  socket: Socket | null;
  form?: UseFormReturn<z.infer<typeof createCardSchema>>;
}) => {
  const onCreateCard = ({ data, listId, boardId, userId }: CreateCard) => {
    socket?.emit("onCreateCard", { data, listId, boardId, userId });
    if (form) {
      form.reset();
    }
  };

  const updateCardHandler = (queryClient: QueryClient, boardId: string) => {
    socket?.on("onUpdateCard", ({ data, isSuccess }) => {
      queryClient.setQueryData(["lists", boardId], (oldData: IGetLists) => {
        return { ...oldData, data: data };
      });
    });
  };

  return { onCreateCard, updateCardHandler };
};
