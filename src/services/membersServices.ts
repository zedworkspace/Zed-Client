import { IGetProjectMembersbyId } from "@/interface/membersInterface";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export const getProjectMembersbyId = async ({
  projectId,
}: {
  projectId: string;
}):Promise<IGetProjectMembersbyId> => {
    console.log("vugh",projectId)
  const response = await apiClient.get(
    API_ROUTES.MEMBERS.GET_MEMBERS + projectId
  );
  return response.data;
};
