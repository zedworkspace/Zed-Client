import { IBoard } from "@/interface/boardInterface";
import React from "react";
import BoardHeader from "./boardHeader";
import BoardContents from "./boardContents";
import { useParams } from "next/navigation";

export default function Board({ data }: { data?: IBoard }) {
  const { channelId, projectId } = useParams() as {
    channelId: string;
    projectId: string;
  };
  const lists = [
    {
      _id: 1,
      name: "To Do",
      cards: [
        {
          _id: 103,
          title:
            "Write unit tests this is a sampel one for noting and abhay said nothing and shanoof is writing this code and he is instruncting me",
          description:
            "Ensure code quality with proper unit testing Ensure code quality with proper unit testing ",
          labels: [
            "testing",
            "quality",
            "testing",
            "quality",
            "testing",
            "quality",
            "testing",
            "quality",
            "quality",
            "testing",
            "quality",
            "testing",
            "quality",
          ],
          dueDate: "2025-03-12",
          assignees: [
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
          ],
        },
      ],
    },
    {
      _id: 2,
      name: "In Progress",
      cards: [
        {
          _id: 301,
          title: "Database Schema",
          description: "Design database models and relationships",
          // labels: ["backend", "architecture", "database"],
          // dueDate: "2025-01-15",
          // assignees: [
          //   {
          //     id: 5,
          //     profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
          //   },
          // ],
        },
        {
          _id: 301,
          title: "Database Schema",
          description: "Design database models and relationships",
          // labels: ["backend", "architecture", "database"],
          dueDate: "2025-01-15",
          assignees: [
            {
              id: 5,
              profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
            },
          ],
        },
        {
          _id: 201,
          title: "Authentication system",
          description: "Implement login and registration features",
          labels: ["security", "backend"],
          dueDate: "2025-02-28",
          assignees: [
            {
              id: 3,
              profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
            },
            {
              id: 4,
              profileImg: "https://randomuser.me/api/portraits/women/4.jpg",
            },
          ],
        },
        {
          _id: 202,
          title: "UI Components",
          description: "Develop reusable UI components",
          labels: ["frontend"],
          dueDate: "2025-03-10",
          assignees: [],
        },
        {
          _id: 203,
          title: "Optimize database queries",
          description: "Improve database performance with indexing",
          labels: ["performance", "database"],
          dueDate: "2025-03-15",
          assignees: [
            {
              id: 9,
              profileImg: "https://randomuser.me/api/portraits/women/9.jpg",
            },
          ],
        },
      ],
    },
    {
      _id: 3,
      name: "Completed",
      cards: [
        {
          _id: 301,
          title: "Database Schema",
          description: "Design database models and relationships",
          labels: ["backend"],
          dueDate: "2025-01-15",
          assignees: [
            {
              id: 5,
              profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
            },
          ],
        },
        {
          _id: 302,
          title: "Deploy application",
          description: "Deploy the project to a cloud provider",
          labels: ["deployment", "production"],
          dueDate: "2025-01-30",
          assignees: [
            {
              id: 6,
              profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
            },
            {
              id: 7,
              profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
            },
            {
              id: 6,
              profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
            },
            {
              id: 7,
              profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
            },
            {
              id: 6,
              profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
            },
            {
              id: 7,
              profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
            },
            {
              id: 6,
              profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
            },
            {
              id: 7,
              profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
            },
            {
              id: 6,
              profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
            },
            {
              id: 7,
              profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
            },
            {
              id: 6,
              profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
            },
            {
              id: 7,
              profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
            },
            {
              id: 6,
              profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
            },
            {
              id: 7,
              profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
            },
            {
              id: 6,
              profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
            },
            {
              id: 7,
              profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
            },
          ],
        },
        {
          _id: 303,
          title: "Code review",
          description: "Review code and suggest improvements",
          labels: ["quality", "teamwork"],
          dueDate: "2025-02-05",
          assignees: [
            {
              id: 10,
              profileImg: "https://randomuser.me/api/portraits/men/10.jpg",
            },
          ],
        },
      ],
    },
    {
      _id: 1,
      name: "To Do",
      cards: [
        {
          _id: 301,
          title: "Database Schema",
          description: "Design database models and relationships",
          labels: ["backend", "architecture", "database"],
          dueDate: "2025-01-15",
          assignees: [
            {
              id: 5,
              profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
            },
          ],
        },
        {
          _id: 301,
          title: "Database Schema",
          description: "Design database models and relationships",
          labels: ["backend", "architecture", "database"],
          dueDate: "2025-01-15",
          assignees: [
            {
              id: 5,
              profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
            },
          ],
        },
        {
          _id: 101,
          title: "Create board modal",
          description: "Implement a modal for board creation",
          labels: ["important", "security", "UI"],
          dueDate: "2025-02-21",
          assignees: [
            {
              id: 1,
              profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
            },
            {
              id: 2,
              profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
            },
            {
              id: 11,
              profileImg: "https://randomuser.me/api/portraits/men/11.jpg",
            },
          ],
        },
        {
          _id: 102,
          title: "Setup project APIs",
          description: "Design and implement backend APIs",
          labels: ["urgent", "backend", "performance"],
          dueDate: "2025-03-05",
          assignees: [
            {
              id: 3,
              profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
            },
          ],
        },
        {
          _id: 301,
          title: "Database Schema",
          description: "Design database models and relationships",
          labels: ["backend", "architecture", "database"],
          dueDate: "2025-01-15",
          assignees: [
            {
              id: 5,
              profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
            },
          ],
        },
        {
          _id: 301,
          title: "Database Schema",
          description: "Design database models and relationships",
          labels: ["backend", "architecture", "database"],
          dueDate: "2025-01-15",
          assignees: [
            {
              id: 5,
              profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
            },
          ],
        },
        {
          _id: 301,
          title: "Database Schema",
          description: "Design database models and relationships",
          labels: ["backend", "architecture", "database"],
          dueDate: "2025-01-15",
          assignees: [
            {
              id: 5,
              profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
            },
          ],
        },
        {
          _id: 301,
          title: "Database Schema",
          description: "Design database models and relationships",
          labels: ["backend", "architecture", "database"],
          dueDate: "2025-01-15",
          assignees: [
            {
              id: 5,
              profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
            },
          ],
        },
        {
          _id: 103,
          title: "Write unit tests",
          description: "Ensure code quality with proper unit testing",
          labels: ["testing", "quality", "automation"],
          dueDate: "2025-03-12",
          assignees: [
            {
              id: 8,
              profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
            },
            {
              id: 12,
              profileImg: "https://randomuser.me/api/portraits/women/12.jpg",
            },
          ],
        },
      ],
    },
    {
      _id: 2,
      name: "In Progress",
      cards: [
        {
          _id: 301,
          title: "Database Schema",
          description: "Design database models and relationships",
          labels: ["backend", "architecture", "database"],
          dueDate: "2025-01-15",
          assignees: [
            {
              id: 5,
              profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
            },
          ],
        },
        {
          _id: 201,
          title: "Authentication system",
          description: "Implement login and registration features",
          labels: [
            "security",
            "backend",
            "user management",
            "usermanagement faskdj",
          ],
          dueDate: "2025-02-28",
          assignees: [
            {
              id: 3,
              profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
            },
            {
              id: 4,
              profileImg: "https://randomuser.me/api/portraits/women/4.jpg",
            },
            {
              id: 13,
              profileImg: "https://randomuser.me/api/portraits/men/13.jpg",
            },
          ],
        },
        {
          _id: 202,
          title: "UI Components",
          description: "Develop reusable UI components",
          labels: ["frontend", "design", "reusability"],
          dueDate: "2025-03-10",
          assignees: [
            {
              id: 5,
              profileImg: "https://randomuser.me/api/portraits/women/5.jpg",
            },
          ],
        },
        {
          _id: 203,
          title: "Optimize database queries",
          description: "Improve database performance with indexing",
          labels: ["performance", "database", "optimization"],
          dueDate: "2025-03-15",
          assignees: [
            {
              id: 9,
              profileImg: "https://randomuser.me/api/portraits/women/9.jpg",
            },
            {
              id: 14,
              profileImg: "https://randomuser.me/api/portraits/men/14.jpg",
            },
          ],
        },
      ],
    },
    {
      _id: 3,
      name: "Completed",
      cards: [
        {
          _id: 301,
          title: "Database Schema",
          description: "Design database models and relationships",
          labels: ["backend", "architecture", "database"],
          dueDate: "2025-01-15",
          assignees: [
            {
              id: 5,
              profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
            },
          ],
        },
        {
          _id: 301,
          title: "Database Schema",
          description: "Design database models and relationships",
          labels: ["backend", "architecture", "database"],
          dueDate: "2025-01-15",
          assignees: [
            {
              id: 5,
              profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
            },
          ],
        },
        {
          _id: 301,
          title: "Database Schema",
          description: "Design database models and relationships",
          labels: ["backend", "architecture", "database"],
          dueDate: "2025-01-15",
          assignees: [
            {
              id: 5,
              profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
            },
          ],
        },
        {
          _id: 302,
          title: "Deploy application",
          description: "Deploy the project to a cloud provider",
          labels: ["deployment", "production", "cloud"],
          dueDate: "2025-01-30",
          assignees: [
            {
              id: 6,
              profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
            },
            {
              id: 7,
              profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
            },
          ],
        },
        {
          _id: 303,
          title: "Code review",
          description: "Review code and suggest improvements",
          labels: ["quality", "teamwork", "best practices"],
          dueDate: "2025-02-05",
          assignees: [
            {
              id: 10,
              profileImg: "https://randomuser.me/api/portraits/men/10.jpg",
            },
            {
              id: 15,
              profileImg: "https://randomuser.me/api/portraits/women/15.jpg",
            },
          ],
        },
      ],
    },
  ];

  // const lists: any = [];

  return (
    <div className="h-full flex flex-col">
      <BoardHeader data={data} />
      <BoardContents lists={lists} boardId={channelId} />
    </div>
  );
}
