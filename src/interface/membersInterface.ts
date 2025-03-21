export interface IProjectmember {
  _id: string;
  userId: {
    _id: string;
    name: string;
    profileImg: string;
  };
}

interface IFetch {
  status: string;
  message: string;
}

export interface IGetProjectMembersbyId extends IFetch {
  data: IProjectmember[];
}
