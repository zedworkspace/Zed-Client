import DataTable from "@/components/ui/dataTable";
import { column } from "./columns";

export default function UserProfile() {
  const data = [
    {
      _id: '1',
      task: "Task1",
      list: "List 1",
      dueDate: "1/1/2020",
      board: "Board 1",
      project: "Project 1",
    },
    {
        _id: '2',
        task: "Task1",
        list: "List 1",
        dueDate: "1/1/2020",
        board: "Board 1",
        project: "Project 1",
      },
      {
        _id: "3",
        task: "Task1",
        list: "List 1",
        dueDate: "1/1/2020",
        board: "Board 1",
        project: "Project 1",
      },
  ];

  return (
    <div>
      <DataTable columns={column} data={data}/>
    </div>
  );
}
