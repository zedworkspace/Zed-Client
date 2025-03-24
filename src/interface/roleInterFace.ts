interface IFetch {
  status: string;
  message: string;
}

interface IRole {
  _id: string;
  name: string;
  permissions: string[];
}
export interface CreateRole extends IFetch {
  data: IRole;
}

export interface Member {
  userId: string;
  name: string;
  profileImg: string;
}

export interface IRole2 {
  _id: string;
  members: Member[];
  permissions: string[];
  roleId: string;
  roleName: string;
}
export interface GetRole extends IFetch {
  data: IRole2[];
}

export interface IPermissions {
  isOwner: boolean;
  permissions?: string[];
}

export interface IGetMemberPermissions extends IFetch {
  data: IPermissions;
}
