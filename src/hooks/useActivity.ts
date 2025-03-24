import { getActivitiesByEntityId } from "@/services/activityServices";
import { useQuery } from "@tanstack/react-query";

export const useGetActivitiesByEntityId = ({
  entityId,
  enabled,
}: {
  entityId: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["activities", entityId],
    queryFn: async () => await getActivitiesByEntityId({ entityId }),
    enabled,
  });
};
