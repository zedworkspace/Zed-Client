// import { ActivityLog } from "@/components/board/cardModal";
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
  dueDate:string;
  assignees: IUser[];
  projectId:string;
  status:string
  // activityLogs:ActivityLog[]
}

export interface GetCard extends IFetch{
  data:ICard
}

// export interface IUpdateCard {
//   _id?: string;
//   listId?: string;
//   title?: string;
//   description?: string;
//   labels?: string[];
//   dueDate?:string;
//   assignees?: IUser[];
//   projectId?:string;
//   activityLogs?:ActivityLog[]
// }


import { z } from "zod";
import { UpdateCardSchema } from "@/validations/cardValidation";

export type FormValues = z.infer<typeof UpdateCardSchema>;