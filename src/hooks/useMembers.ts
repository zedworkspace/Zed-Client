import { IGetProjectMembersbyId } from "@/interface/membersInterface";
import { getProjectMembersbyId } from "@/services/membersServices";
import { useQuery } from "@tanstack/react-query";

export const useGetProjectMembers = ({
  projectId,
  enabled,
}: {
  projectId: string;
  enabled: boolean;
}) => {
  return useQuery<IGetProjectMembersbyId>({
    queryKey: ["projectMembers", projectId],
    queryFn: async () => await getProjectMembersbyId({ projectId }),
    enabled,
  });
};

