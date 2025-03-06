import { generateInvite, sendInvite } from "@/services/inviteServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGenerateInvite = (id: string) => {
    return useQuery({
      queryKey: ["invite", id],
      queryFn: ()=> generateInvite(id),
    });
};
export const useSendInvite = () => {
    return useMutation({
      mutationFn: sendInvite,
    });
};