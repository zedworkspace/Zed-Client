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
 

interface Member {
  _id:string
  name:string,
  profileImg:string,
}

export interface GetRole extends IFetch {
  data:{
    _id:string,
    members:Member[],
    permissions:string[],
    roleId:string,
    roleName:string
  }[]
}
