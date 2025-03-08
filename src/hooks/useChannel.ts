import { getChannels } from "@/services/channelServices";
import { useQuery } from "@tanstack/react-query";

export const useGetChannels = ({
  projectId,
  isEnabled,
}: {
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
