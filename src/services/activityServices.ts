import { IGetActitiesByEntityId } from "@/interface/activityInterface";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export const getActivitiesByEntityId = async ({
  entityId,
}: {
  entityId: string;
}): Promise<IGetActitiesByEntityId> => {
  const res = await apiClient.get(
    API_ROUTES.ACTIVITY.GET_ACTIVITY_BY_ENTITY_ID + entityId
  );
  return res.data;
};
