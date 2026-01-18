'use client'
import { ColumnDef } from "@tanstack/react-table";

type Task = {
    _id:string,
    task:string,
    list:string,
    dueDate:string,
    board:string,
    project:string
}   

export const column:ColumnDef<Task>[] = [{
    accessorKey : "task",
    header: () =>{
        return(
            <span>Tasks</span>
        )
    },
    
} ,
    {
        accessorKey : "list",
        header: () =>{
            return(
                <span>List</span>
            )
        }
    },
    {
        accessorKey : "dueDate",
        header: () =>{
            return(
                <span>Due Date</span>
            )
        }
    },
    {
        accessorKey : "project",
        header: () =>{
            return(
                <span>Project</span>
            )
        }
    }, 
    {
        accessorKey : "board",
        header: () =>{
            return(
                <span>Board</span>
            )
        }
    }
]