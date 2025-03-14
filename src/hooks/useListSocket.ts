import { IGetLists } from "@/interface/listInterface";
import { createListSchema } from "@/validations/listValidation";
import { QueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { Socket } from "socket.io-client";
import { z } from "zod";

type CreateList = {
  data: z.infer<typeof createListSchema>;
  boardId: string;
};

type Args = {
  socket: Socket | null;
  form?: UseFormReturn<z.infer<typeof createListSchema>>;
};

export const useListSocket = ({ socket, form }: Args) => {
  const onCreateList = ({ data, boardId }: CreateList) => {
    socket?.emit("onCreateList", { data, boardId });
    if (form) {
      form.reset();
    }
  };

  const updateListHandler = (queryClient: QueryClient, boardId: string) => {
    socket?.on("onUpdatedLists", ({ data, isSuccess }) => {
      queryClient.setQueryData(["lists", boardId], (oldData: IGetLists) => {
        return { ...oldData, data: data };
      });
    });
  };

  return { onCreateList, updateListHandler };
};
