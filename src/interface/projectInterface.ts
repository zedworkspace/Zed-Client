interface IFetch {
  status: string;
  message: string;
}

export interface IProject {
  projectId: {
    _id: string;
    name: string;
    description: string;
    logo: string;
    banner:string
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
}


export interface IGetProjects extends IFetch {
  data: IProject[];
}

export interface IGetProject extends IFetch {
  data: {
    _id: string;
    name: string;
    description: string;
    logo: string;
    banner:string
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
}
