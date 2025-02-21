import { User } from "./userInterface";

interface FetchObject {
  status: string;
  message: string;
}

interface Project {
  _id: string;
  projectName: string;
  projectLogo: string;
  projectMembers: User[];
  projectRepo: string[];
  projectDescription: string;
  projectOwner: string;
}

export interface GetAllProjects extends FetchObject {
  data: Project[];
}
