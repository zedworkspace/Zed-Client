import { IGetLists } from "@/interface/listInterface";
import { createCardSchema } from "@/validations/cardValidation";
import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Socket } from "socket.io-client";
import { z } from "zod";

type CreateCard = {
  data: z.infer<typeof createCardSchema>;
  listId: string;
  boardId: string;
};

export const useCardSocket = ({
  socket,
  form,
}: {
  socket: Socket | null;
  form?: UseFormReturn<z.infer<typeof createCardSchema>>;
}) => {
  const [isCardCreateSuccess, setIsCardCreateSuccess] = useState(false);

  const onCreateCard = ({ data, listId, boardId }: CreateCard) => {
    socket?.emit("onCreateCard", { data, listId, boardId });
    console.log("triggred");
    if (form) {
      console.log("form", form);
      form.reset();
    }
  };

  const onUpdateCard = (queryClient: QueryClient, boardId: string) => {
    socket?.on("onUpdateCard", ({ data, isSuccess }) => {
      queryClient.setQueryData(["lists", boardId], (oldData: IGetLists) => {
        return { ...oldData, data: data };
      });
    });
  };

  return { onCreateCard, onUpdateCard, isCardCreateSuccess };
};
