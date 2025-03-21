import { IPermissions } from "@/interface/roleInterFace";

export const hasPermission = (permissions: string[], data?: IPermissions) => {
  return (
    data?.isOwner ||
    data?.permissions?.some((perm) => permissions.includes(perm))
  );
};
