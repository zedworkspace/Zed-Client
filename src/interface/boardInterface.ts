interface IFetch {
  status: string;
  message: string;
}

export interface IBoard {
  _id: string;
  projectId: string;
  name: string;
  boardMembers: object[];
  isDefault: boolean;
}

export interface IGetBoards extends IFetch {
  data: IBoard[];
}
