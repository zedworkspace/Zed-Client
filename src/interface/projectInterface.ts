interface IFetch {
  status: string;
  message: string;
}

interface IProject {
  _id: string;
  name: string;
  description: string;
  logo: string;
  owner: {
    name: string;
    email: string;
    profileImg: string;
    bannerImg: string;
    gitId: string;
    googleId: string;
  };
  repo: string[];
}

export interface IGetProjects extends IFetch {
  data: IProject[];
}
