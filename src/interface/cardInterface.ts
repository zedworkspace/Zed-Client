import { IUser } from "./userInterface";

export interface ICard {
  _id: string;
  listId: string;
  title: string;
  description: string;
  labels: string[];
  dueDate: string;
  assignees: IUser[];
}
