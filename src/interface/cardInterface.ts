import { ActivityLog } from "@/components/board/cardModal";
import { IUser } from "./userInterface";

interface IFetch {
  status: string;
  message: string;
}

export interface ICard {
  _id?: string;
  listId?: string;
  title?: string;
  description?: string;
  labels?: string[];
  dueDate?:Date;
  assignees?: IUser[];
  projectId?:string;
  activityLogs?:ActivityLog[]
}

export interface GetCard extends IFetch{
  data:ICard
}