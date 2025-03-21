interface IFetch {
  status: string;
  message: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  otp: string;
  profileImg: string;
}

export interface IActivity {
  _id: string;
  entityId: string;
  entityType: "Card" | "Profile" | "Project";
  oldValue: string;
  newValue: string;
  timestamp: string;
  action: string;
  user: IUser;
  details: string;
}

export interface IGetActitiesByEntityId extends IFetch {
  data: IActivity[];
}
