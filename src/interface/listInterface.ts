import { ICard } from "./cardInterface";

interface IFetch {
  status: string;
  message: string;
}

export interface IList {
  _id: string;
  name: string;
  boardId: string;
  cards: ICard[];
}

export interface IGetLists extends IFetch {
  data: IList[];
}
