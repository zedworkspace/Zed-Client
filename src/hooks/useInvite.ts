import { acceptInvite, generateInvite, getInviteInfo, sendInvite } from "@/services/inviteServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useInviteStore } from "@/store/inviteStore";

export const useGenerateInvite = (inviteId: string, enabled: boolean) => {
    return useQuery({
      queryKey: ["invite", inviteId],
      queryFn: ()=> generateInvite(inviteId),
      enabled,
    });
};
export const useSendInvite = () => {
  const { toast } = useToast();
  const {closeGenerateModal} = useInviteStore();
  return useMutation({
    mutationFn: sendInvite,
    onSuccess: (res) => {
      toast({ description: res.message });
      closeGenerateModal();
    },
    onError: (err) => {
      toast({ description: err.message });
    },
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