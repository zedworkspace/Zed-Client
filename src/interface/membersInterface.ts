export interface IProjectmember {
  _id: string;
  userId: {
    _id: string;
    name: string;
    profileImg: string;
  };
  isOwner: boolean;
}

interface IFetch {
  status: string;
  message: string;
}

export interface IGetProjectMembersbyId extends IFetch {
  data: IProjectmember[];
}
