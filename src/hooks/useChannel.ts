import {
  createChannels,
  getChannelById,
  getChannels,
} from "@/services/channelServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useCreateChannelStore } from "@/store/channelStore";

export const useGetChannels = ({
  projectId,
}: // isEnabled,
{
  projectId: string;
  isEnabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["channels", projectId],
    queryFn: () => getChannels(projectId),
    // enabled: isEnabled,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
};

export const useCreateChannel = (projectId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { onClose } = useCreateChannelStore();
  return useMutation({
    mutationFn: createChannels,
    onSuccess: (res) => {
      toast({ description: res.message });
      onClose();
      queryClient.invalidateQueries({ queryKey: ["channels", projectId] });
    },
    onError: (err) => {
      toast({ description: err.message });
    },
  });
};

export const useGetChannelById = ({
  channelId,
  projectId,
  enabled = false,
}: {
  channelId: string;
  projectId: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["channel"],
    queryFn: async () => await getChannelById({ channelId, projectId }),
    enabled,
  });
};
