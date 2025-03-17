/* eslint-disable @next/next/no-img-element */
import { Activity, ChevronRight, Clock } from "lucide-react";
import React from "react";

const ActivityLog = () => {
  const [activityLog, setActivityLog] = React.useState([
    {
      id: 1,
      user: "Abhay",
      action: "updated project description",
      timestamp: "1 hour ago",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmq0oTwjU1VsRT0ivdH_ohnte-5vQjdYsrDKXHavPpAyuqMq9Oh0H-sRs75j_FuYymQi8&usqp=CAU",
      //   icon: <FileText size={16} />,
      //   color: '#4CAF50'
    },
    {
      id: 2,
      user: "Shanoof",
      action: 'added new role "QA Engineer"',
      timestamp: "3 hours ago",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlOLBRK-3wEFFeCojWlHou4nooggl5iI2PJQ&s",
      //   icon: <Users size={16} />,
      //   color: '#FF9800'
    },
    {
      id: 3,
      user: "Hrithik",
      action: "deployed version 2.1.0 to production",
      timestamp: "6 hours ago",
      avatar:
        "https://img.freepik.com/premium-vector/boy-with-green-shirt-that-says-hes_1230457-34748.jpg",
      //   icon: <Code size={16} />,
      //   color: '#2196F3'
    },
    {
      id: 4,
      user: "Jasim",
      action: "merged PR #234: Fix authentication bug",
      timestamp: "1 day ago",
      avatar:
        "https://img.freepik.com/free-vector/smiling-boy-pink-hoodie_1308-175681.jpg",
      //   icon: <GitBranch size={16} />,
      //   color: '#9C27B0'
    },
    {
      id: 5,
      user: "Nishana",
      action: "updated project banner",
      timestamp: "1 day ago",
      avatar:
        "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg",
      //   icon: <Camera size={16} />,
      //   color: '#E91E63'
    },
    {
      id: 6,
      user: "Fathima",
      action: "created new documentation page",
      timestamp: "2 days ago",
      avatar:
        "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg",
      //   icon: <FileText size={16} />,
      //   color: '#4CAF50'
    },
    {
      id: 7,
      user: "Muhammed",
      action: "assigned 3 new tasks to Dev team",
      timestamp: "2 days ago",
      avatar:
        "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid",
      //   icon: <MessageSquare size={16} />,
      //   color: '#FFC107'
    },
    {
      id: 8,
      user: "Shana",
      action: 'changed project name to "Project Nebula"',
      timestamp: "3 days ago",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUCJBeXmq_PIJl5uxzqWBC_31XoNeyZwj6It9eCWGZqZUl0YdWhaFvSbgEePDXR9bXJt4&usqp=CAU",
      //   icon: <Edit2 size={16} />,
      //   color: '#2196F3'
    },
  ]);
  return (
    <div>
      <div className="w-80 border-l border-gray-700 bg-zi flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity size={18} className="text-indigo-400" />
            <h2 className="font-semibold">Activity Log</h2>
          </div>
          <button className="text-sm text-white hover:text-indigo-300">
            View All
          </button>
        </div>

        {/* Activity log with single scrollbar */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="divide-y divide-gray-700">
            {activityLog.map((activity) => (
              <div
                key={activity.id}
                className="p-4 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-start">
                  <div className="mr-3 relative">
                    <img
                      src={activity.avatar}
                      alt={activity.user}
                      className="w-8 h-8 rounded-full"
                    />
                    <div
                      className="absolute -bottom-1 -right-1 p-1 rounded-full"
                      //   style={{ backgroundColor: activity.color }}
                    >
                      {/* {activity.icon} */}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{activity.user}</p>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock size={12} className="mr-1" />
                        {activity.timestamp}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {activity.action}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed "Load More" button at the bottom */}
        <div className="p-4 border-t border-gray-700">
          <button className="w-full py-2 bg-primary hover:bg-muted-foreground rounded-md flex items-center justify-center space-x-1 transition-colors">
            <span>Load More</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
