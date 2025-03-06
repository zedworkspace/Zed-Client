import { IUser } from "./userInterface";

interface IFetch {
  status: string;
  message: string;
}

export interface ICard {
  _id: string;
  listId: string;
  title: string;
  description: string;
  labels: string[];
  dueDate: string;
  assignees: IUser[];
}

export interface GetCard extends IFetch{
  data:ICard
}