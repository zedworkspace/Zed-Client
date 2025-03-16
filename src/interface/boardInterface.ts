import { ICard } from "./cardInterface";
import { IList } from "./listInterface";

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

export interface IGetBoard extends IFetch {
  data: IBoard;
}

interface IDragCard {
  data: ICard;
  type: "card";
}

interface IDragList {
  data: IList;
  type: "list";
}

export type IDragData = IDragCard | IDragList;