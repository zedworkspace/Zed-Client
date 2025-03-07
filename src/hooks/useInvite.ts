import { acceptInvite, generateInvite, getInviteInfo, sendInvite } from "@/services/inviteServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGenerateInvite = (inviteId: string, enabled: boolean) => {
    return useQuery({
      queryKey: ["invite", inviteId],
      queryFn: ()=> generateInvite(inviteId),
      enabled,
    });
};
export const useSendInvite = () => {
  return useMutation({
    mutationFn: sendInvite,
  });
};

export const useGetInviteInfo = (inviteId: string) => {
    return useQuery({
      queryKey: ["inviteInfo", inviteId],
      queryFn: ()=> getInviteInfo(inviteId),
      enabled: !!inviteId,
    });
};

export const useAcceptInvite = () => {
    return useMutation({
      mutationFn: acceptInvite,
    })
};