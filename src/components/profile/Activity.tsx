/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Clock, ArrowRight, MoveRight } from 'lucide-react';

export const ProfileActivity = () => {
  const activity = [
    {profileImage:'https://images.pexels.com/photos/691583/pexels-photo-691583.jpeg?cs=srgb&dl=pexels-ezz7-691583.jpg&fm=jpg', actionTaker: 'Mohammed Jasim', action: 'moved', card: 'User Profile Design with shadcn sheet', fromStatus: 'In Progress', toStatus: 'In Review', date: 'Feb 12, 2025 1:42pm', board: 'Design System'},
    {profileImage:'https://images.pexels.com/photos/691583/pexels-photo-691583.jpeg?cs=srgb&dl=pexels-ezz7-691583.jpg&fm=jpg', actionTaker: 'Mohammed Jasim', action: 'assigned', card: 'API Integration for User Auth', fromStatus: 'Backlog', toStatus: 'In Progress', date: 'Feb 11, 2025 3:22pm', board: 'Backend'},
    {profileImage:'https://images.pexels.com/photos/691583/pexels-photo-691583.jpeg?cs=srgb&dl=pexels-ezz7-691583.jpg&fm=jpg', actionTaker: 'Mohammed Jasim', action: 'commented', card: 'Dashboard Analytics Component', fromStatus: '', toStatus: '', date: 'Feb 10, 2025 11:15am', board: 'Frontend'},
    {profileImage:'https://images.pexels.com/photos/691583/pexels-photo-691583.jpeg?cs=srgb&dl=pexels-ezz7-691583.jpg&fm=jpg', actionTaker: 'Mohammed Jasim', action: 'created', card: 'User Profile Design with shadcn sheet', fromStatus: '', toStatus: 'Backlog', date: 'Feb 09, 2025 9:30am', board: 'Design System'},
    {profileImage:'https://images.pexels.com/photos/691583/pexels-photo-691583.jpeg?cs=srgb&dl=pexels-ezz7-691583.jpg&fm=jpg', actionTaker: 'Mohammed Jasim', action: 'completed', card: 'Login Page Redesign', fromStatus: 'In Review', toStatus: 'Done', date: 'Feb 08, 2025 5:17pm', board: 'Design System'},
  ];

  // Function to get appropriate action color and icon
  const getActionStyles = (action: string) => {
    switch(action) {
      case 'moved':
        return { 
          color: 'text-blue-400',
          bgColor: 'bg-blue-900/20',
          iconColor: 'text-blue-400',
          icon: <MoveRight size={12} className="ml-1 mr-2" />
        };
      case 'assigned':
        return { 
          color: 'text-purple-400',
          bgColor: 'bg-purple-900/20',
          iconColor: 'text-purple-400',
          icon: <ArrowRight size={12} className="ml-1 mr-2" />
        };
      case 'completed':
        return { 
          color: 'text-green-400',
          bgColor: 'bg-green-900/20',
          iconColor: 'text-green-400',
          icon: null
        };
      case 'commented':
        return { 
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-900/20',
          iconColor: 'text-yellow-400',
          icon: null
        };
      case 'created':
        return { 
          color: 'text-teal-400',
          bgColor: 'bg-teal-900/20',
          iconColor: 'text-teal-400',
          icon: null
        };
      default:
        return { 
          color: 'text-gray-400',
          bgColor: 'bg-gray-800/40',
          iconColor: 'text-gray-400',
          icon: null
        };
    }
  };

  // Function to get status colors
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In Progress':
        return 'bg-blue-900/30 text-blue-300';
      case 'In Review':
        return 'bg-purple-900/30 text-purple-300';
      case 'Done':
        return 'bg-green-900/30 text-green-300';
      case 'Backlog':
        return 'bg-gray-700/60 text-gray-300';
      default:
        return 'bg-gray-700/60 text-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
      
      <div className="space-y-6">
        {activity.map((act, ind) => {
          const actionStyle = getActionStyles(act.action);
          
          return (
            <div key={ind} className="group relative">
              {/* Timeline connector */}
              {ind !== activity.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-gray-700 to-gray-900/0 z-0"></div>
              )}
              
              <div className="relative flex items-start space-x-3 rounded-lg p-1 hover:bg-gray-800/20 transition-all duration-300">
                {/* Profile Image */}
                <div className="relative z-10 pt-1">
                  <img 
                    src={act.profileImage} 
                    alt="Profile" 
                    className="w-11 h-11 rounded-full object-cover shadow-lg shadow-black/30 border border-gray-700" 
                  />
                  
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  {/* Action Detail */}
                  <div className="flex flex-wrap items-center text-sm text-muted-foreground">
                    <span className="font-medium text-white mr-1">{act.actionTaker}</span>
                    <span className={`${actionStyle.color} font-medium`}>
                      {act.action}
                    </span>
                    <span className="text-white font-bold ml-1 mr-1">
                      {act.card}
                    </span>
                    
                    {(act.fromStatus || act.toStatus) && (
                      <div className="flex items-center mt-1 space-x-2 text-xs">
                        {act.fromStatus && (
                          <span className={`px-2 py-1 rounded-md ${getStatusColor(act.fromStatus)}`}>
                            {act.fromStatus}
                          </span>
                        )}
                        
                        {act.fromStatus && act.toStatus && (
                          <MoveRight size={14} className="text-gray-500" />
                        )}
                        
                        {act.toStatus && (
                          <span className={`px-2 py-1 rounded-md ${getStatusColor(act.toStatus)}`}>
                            {act.toStatus}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Timestamp and Board */}
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    <span>{act.date}</span>
                    <span className="mx-1">•</span>
                    <span>on board</span>
                    <span className="ml-1 px-2 py-0.5 rounded-full bg-gray-800/80 text-gray-300 font-medium border border-gray-700/50">
                      {act.board}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};