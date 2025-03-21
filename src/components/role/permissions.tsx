/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "../ui/switch";
import { Check, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseMutateFunction } from "@tanstack/react-query";
import { useUpdateRole } from "@/hooks/useRole";

const permissionCategories = [
  {
    name: "General Permissions",
    permissions: [
      {
        id: "manage_channels",
        name: "Manage Channels",
        description: "Allows members to create, modify, and delete channels.",
      },
      {
        id: "manage_board",
        name: "Manage Board",
        description:
          "Grants members the ability to manage and configure board settings.",
      },
      {
        id: "manage_roles",
        name: "Manage Roles",
        description:
          "Enables members to create, edit, and assign roles below their highest role.",
      },
      {
        id: "invite_members",
        name: "Invite Members",
        description:
          "Allows members to send invitations to new users to join the platform.",
      },
      {
        id: "administration",
        name: "Administration",
        description:
          "Provides full administrative control, including managing users and settings.",
      },
    ],
  },
];


const Permissions = ({roleId,existingPermissions}:{roleId:string,existingPermissions:string[]}) => {

  console.log(existingPermissions,'aklsjdf');
  const [role, setRole] = useState({
    color: "#5865f2",
    permissions: {} as Record<string, boolean>,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialPermissions = {} as Record<string, boolean>;
  
    permissionCategories.forEach((category) => {
      category.permissions.forEach((permission) => {
        // Set existing permissions as checked
        initialPermissions[permission.id] = existingPermissions.includes(permission.id);
      });
    });
  
    setRole((prev) => ({ ...prev, permissions: initialPermissions }));
  }, [existingPermissions]);

  const togglePermission = (permissionId: string) => {
    setRole((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permissionId]: !prev.permissions[permissionId],
      },
    }));
  };

  const {mutate} = useUpdateRole(roleId)

  const handleSubmit = () => {
    const selectedPermissions = Object.entries(role.permissions)
      .filter(([_, isEnabled]) => isEnabled)
      .map(([key]) => key);

    if (selectedPermissions.length === 0) {
      setError("Please select at least one permission.");
      return;
    }

    setError(null);
    mutate({ roleId, permissions: selectedPermissions });
    console.log(selectedPermissions,'permsinnioslndf');
  };

  return (
    <div>
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-zinc-100 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {permissionCategories.map((category) => (
            <div key={category.name} className="space-y-4">
              <div className="space-y-2">
                {category.permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between p-2 hover:bg-zinc-700/40 rounded-md transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {role.permissions[permission.id] && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                        <span
                          className={cn(
                            "font-medium",
                            role.permissions[permission.id]
                              ? "text-white"
                              : "text-zinc-300"
                          )}
                        >
                          {permission.name}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">
                        {permission.description}
                      </p>
                    </div>
                    <Switch
                      checked={role.permissions[permission.id]}
                      onCheckedChange={() => togglePermission(permission.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
          >
            Save Permissions
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Permissions;
