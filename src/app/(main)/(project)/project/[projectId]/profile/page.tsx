"use client";
import React from "react";
import {
  Camera,
  Edit2,
  Save,
  X,
  Users,
  Settings,
  Bell,
  Tag,
  Home,
  Activity,
  Clock,
  ChevronRight,
  MessageSquare,
  FileText,
  GitBranch,
  Code,
  Star,
  Search,
  Plus,
  Trash2,
  ShieldCheck,
  Laptop,
  Wand,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionHeader } from "@radix-ui/react-accordion";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog"; 
import { useRouter } from "next/navigation";

export default function ProjectProfile() {
  // State for editable fields
  const [isEditing, setIsEditing] = React.useState(false);
  const [projectName, setProjectName] = React.useState("New Project");
  const [projectDescription, setProjectDescription] = React.useState(
    "A collaborative workspace for our team to design, develop, and deploy the next generation of cloud infrastructure solutions."
  );
  const [bannerColor, setBannerColor] = React.useState("gray");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<{
    id: number;
    name: string;
  } | null>(null);

  const router = useRouter();

  const handleDeleteClick = (role: { id: number; name: string }) => {
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRole) {
      console.log("Deleting role:", selectedRole.name);
      // Add your delete logic here
      setIsDeleteDialogOpen(false);
    }
  };

  // State for roles
  const [roles, setRoles] = React.useState([
    { id: 1, name: "Admin", icon: <ShieldCheck size={16} />, members: 2 },
    { id: 2, name: "Developer", icon: <Laptop size={16} />, members: 8 },
    { id: 3, name: "Designer", icon: <Wand size={16} />, members: 4 },
    { id: 4, name: "Viewer", icon: <Eye size={16} />, members: 12 },
  ]);

  // Activity log data
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
        "data:image/jpeg;base64,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",
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

  // Handle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // Create a new activity log entry when saving changes
      const newActivity = {
        id: activityLog.length + 1,
        user: "You",
        action: "updated project information",
        timestamp: "just now",
        avatar: "/api/placeholder/40/40",
        icon: <Edit2 size={16} />,
        // color: '#2196F3'
      };

      setActivityLog([newActivity, ...activityLog]);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900 text-gray-200">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        {/* <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4">
          {/* <h1 className="text-lg font-semibold">{projectName}</h1> */}
        {/* </div> */}

        {/* Content Area with Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {/* Banner Section */}
            <div
              className="relative h-48 flex items-end"
              style={{ backgroundColor: bannerColor }}
            >
              {isEditing && (
                <div className="absolute top-4 right-4 flex space-x-2">
                  <input
                    type="color"
                    value={bannerColor}
                    onChange={(e) => setBannerColor(e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded"
                  />
                  <button className="bg-gray-900 bg-opacity-50 p-2 rounded hover:bg-opacity-70">
                    <Camera size={20} />
                  </button>
                </div>
              )}

              <div className="absolute -bottom-12 left-8">
                <div className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-muted-foreground">
                    PN
                  </span>
                  {/* <img src="" alt="" /> */}
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-1 bg-indigo-500 rounded-full">
                      <Camera size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="mt-16 px-8">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="text-2xl font-bold bg-primary border border-gray-600 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold">{projectName}</h2>
                  )}
                </div>
                <button
                  onClick={toggleEditMode}
                  className={`flex items-center space-x-1 px-3 py-1 rounded ${
                    isEditing
                      ? "bg-black hover:bg-muted-foreground"
                      : "bg-primary hover:bg-muted-foreground"
                  }`}
                >
                  {isEditing ? (
                    <>
                      {/* <Save size={16} /> */}
                      <span>Save</span>
                    </>
                  ) : (
                    <>
                      <Edit2 size={16} />
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4">
                {isEditing ? (
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full bg-primary border-gray-600 rounded px-3 py-2 min-h-24"
                  ></textarea>
                ) : (
                  <p className="text-gray-400">{projectDescription}</p>
                )}
              </div>

              {/* Tabs */}
              {/* <div className="mt-8 border-b border-gray-700">
                <div className="flex space-x-4">
                  <button className="px-4 py-2 text-white border-b-2 border-foreground font-medium">Overview</button>
                  <button className="px-4 py-2 text-gray-400 hover:text-gray-200">Members</button>
                  <button className="px-4 py-2 text-gray-400 hover:text-gray-200">Settings</button>
                </div>
              </div> */}

              {/* Roles Section */}
              <div className="mt-8">
                <div className="space-y-4">
                  {/* Heading and Description */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">Roles</h3>
                    <p className="text-sm text-muted-foreground">
                      Use roles to group your project members and assign
                      permissions.
                    </p>
                  </div>

                  {/* Search and Create Role Button */}
                  <div className="flex justify-between items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search roles..."
                        className="pl-10 bg-primary outline-none border-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                    <Button
                      className="flex items-center gap-2 bg-indigo-500"
                      onClick={() => {
                        // Add logic to create a new role
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Role</span>
                    </Button>
                  </div>

                  {/* Roles List */}
                  <div className="   overflow-hidden">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full space-y-4 "
                    >
                      {roles.map((role) => (
                        <AccordionItem
                          key={role.id}
                          value={role.id.toString()}
                          className="border-none bg-zinc-800 rounded-md"
                        >
                          {/* Role Header */}
                          <AccordionHeader>
                            <AccordionTrigger
                              variant="withoutTriggerIcon"
                              className=" p-0"
                            >
                              <div className="flex items-center justify-between p-4 hover:bg-primary/40 transition-colors w-full">
                                {/* Role Name and Icon */}
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 flex items-center justify-center bg-primary/10 rounded-full">
                                    {role.icon}
                                  </div>
                                  <span className="font-medium">
                                    {role.name}
                                  </span>
                                </div>

                                {/* Members Count */}
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {role.members} members
                                  </span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-indigo-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push("profile/rolename")
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>

                      {/* Delete Button with Confirmation Dialog */}
                      <Dialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(role);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Are you absolutely sure?
                            </DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently
                              delete the role{" "}
                              <span className="font-semibold">
                                {selectedRole?.name}
                              </span>{" "}
                              and remove all associated data.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              variant="destructive"
                              onClick={handleDeleteConfirm}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </AccordionTrigger>
                          </AccordionHeader>

                          {/* Accordion Content - Members List */}
                          <AccordionContent className="p-4 bg-primary/20">
                            <div className="space-y-3">
                              {/* <p className="text-sm font-medium">
                                Members in {role.name}
                              </p> */}
                              <div className="flex flex-wrap gap-3">
                                {/* Example Members */}
                                {Array.from({ length: role.members }).map(
                                  (_, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-md"
                                    >
                                      <img
                                        src={`https://i.pravatar.cc/40?img=${index}`}
                                        alt="User Avatar"
                                        className="h-6 w-6 rounded-full"
                                      />
                                      <span className="text-sm">
                                        User {index + 1}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </div>
              {/* Stats Section */}
              <div className="mt-8 mb-12">
                {/* <h3 className="text-xl font-semibold mb-4">Project Stats</h3> */}
                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-primary/30 rounded-md p-4 border border-gray-700"> */}
                {/* <div className="text-gray-400 text-sm">Total Members</div>
                    <div className="text-2xl font-bold mt-1">26</div> */}
                {/* </div> */}
                {/* <div className="bg-primary/30 rounded-md p-4 border border-gray-700"> */}
                {/* <div className="text-gray-400 text-sm">Active Tasks</div>
                    <div className="text-2xl font-bold mt-1">12</div> */}
                {/* </div> */}
                {/* <div className="bg-primary/30 rounded-md p-4 border border-gray-700"> */}
                {/* <div className="text-gray-400 text-sm">Completed Tasks</div>
                    <div className="text-2xl font-bold mt-1">48</div> */}
                {/* </div> */}
                {/* <div className="bg-primary/30 rounded-md p-4 border border-gray-700"> */}
                {/* <div className="text-gray-400 text-sm">Project Age</div>
                    <div className="text-2xl font-bold mt-1">3 months</div> */}
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>

          {/* Right Side - Activity Log */}
          <div className="w-80 border-l border-gray-700 bg-zinc-900 flex flex-col">
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
      </div>
    </div>
  );
}
