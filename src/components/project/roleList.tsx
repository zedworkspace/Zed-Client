/* eslint-disable @next/next/no-img-element */
// components/project/RolesList.tsx
import React, { useState } from "react";
import { Edit2, Users, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DeleteRoleModal from "../modals/deleteRoleModal";
import { useRouter } from "next/navigation";

// Define the type for a single role
type Role = {
  _id: string;
  members: Member[];
  permissions: string[];
  roleId: string;
  roleName: string;
};

// Define the type for a member
type Member = {
  name: string;
  profileImg?: string;
};

const RolesList = ({ roles, projectId }: { roles: Role[], projectId: string }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const router = useRouter()

  const handleDeleteClick = (role: Role) => {
    setSelectedRole(role)
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="overflow-hidden">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {roles?.map((role, ind) => (
          <AccordionItem
            key={ind}
            value={role._id || `role-${ind}`}
            className="border-none bg-primary/30 rounded-md"
          >
            {/* Main issue: we need to restructure this to avoid nested buttons */}
            <div className="flex items-center justify-between p-4 hover:bg-primary/40 transition-colors w-full">
              {/* Left side: Role name and AccordionTrigger */}
              <div className="flex-1">
                <AccordionTrigger className="flex items-center gap-3 w-full justify-start">
                  <span className="font-medium">{role.roleName}</span>
                </AccordionTrigger>
              </div>

              {/* Middle: Members Count */}
              <div className="flex items-center gap-2 mx-4">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {role.members?.length || 0} members
                </span>
              </div>

              {/* Right side: Actions - Now outside the AccordionTrigger */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-indigo-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`profile/${role.roleId}`);
                  }}
                >
                  <Edit2 className="h-4 w-4"/>
                </Button>

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
              </div>
            </div>

            {/* Accordion Content - Members List */}
            <AccordionContent className="p-4 bg-primary/20">
              <div className="space-y-3">
                <p className="text-sm font-medium">
                  Members in {role.roleName}
                </p>
                <div className="flex flex-wrap gap-3">
                  {/* Iterate over members and display each member */}
                  {role.members && role.members.length > 0 ? (
                    role.members.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-md"
                      >
                        <img
                          src={
                            member.profileImg ||
                            `https://i.pravatar.cc/40?img=${index}`
                          }
                          alt={member.name}
                          className="h-6 w-6 rounded-full"
                        />
                        <span className="text-sm">{member.name}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No members assigned.
                    </p>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Delete Role Modal */}
      <DeleteRoleModal
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        selectedRole={selectedRole}
        projectId={projectId}
      />
    </div>
  );
};

export default RolesList;