// export type Assignee = {
//   id: string;
//   name?: string;
//   profileImg: string;
// };

// export type ActivityLog = {
//   id: string;
//   type: "assignee" | "label";
//   action: "added" | "removed";
//   assignee?: Assignee;
//   label?: string;
//   timestamp: Date;
// };

// const [activityLogs, setActivityLogs] = React.useState<ActivityLog[]>(
//   initialData?.activityLogs || []
// );

// handleRemoveAssignee
// if (assignee) {
//
//   setActivityLogs([
//     ...activityLogs,
//     {
//       id: Date.now().toString(),
//       type: "assignee",
//       action: "removed",
//       assignee: assignee,
//       timestamp: new Date(),
//     },
//   ]);
// }

// handleAddAssignee
// setActivityLogs([
//   ...activityLogs,
//   {
//     id: Date.now().toString(),
//     type: "assignee",
//     action: "added",
//     assignee: newAssignee,
//     timestamp: new Date(),
//   },
// ]);
