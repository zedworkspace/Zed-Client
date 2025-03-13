import { IUser } from "./userInterface";

interface IProjectmember{
    _id:string,
    userId:IUser
    
}

interface IFetch{
    status:string,
    message:string
}

 export interface IGetProjectMembersbyId extends IFetch{
    data:IProjectmember[]
}