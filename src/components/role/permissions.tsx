import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from '../ui/switch'
import { Check, ShieldAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

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
        id: "manage_roles",
        name: "Manage Roles",
        description: "Enables members to create, edit, and assign roles below their highest role.",
      },
      {
        id: "invite_members",
        name: "Invite Members",
        description: "Allows members to send invitations to new users to join the platform.",
      },
      {
        id: "administaration",
        name: "Administration",
        description: "Provides full administrative control, including managing users and settings.",
      },
    ],
  },
];


function Permissions() {

      const [role, setRole] = React.useState({
        color: "#5865f2",
        permissions: {} as Record<string, boolean>
      })

     React.useEffect(() => {
        const initialPermissions = {} as Record<string, boolean>
        permissionCategories.forEach(category => {
          category.permissions.forEach(permission => {
            initialPermissions[permission.id] = false
          })
        })
        setRole(prev => ({ ...prev, permissions: initialPermissions }))
      }, [])
    
      const togglePermission = (permissionId: string) => {
        setRole(prev => ({
          ...prev,
          permissions: {
            ...prev.permissions,
            [permissionId]: !prev.permissions[permissionId]
          }
        }))
      }
  return (
    <div>
         <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  Permissions
                </CardTitle>
                {/* <div className="flex items-center gap-2 text-sm">
                  <CircleDot className="h-4 w-4 text-green-500" />
                  <span className="text-zinc-300">Enabled</span>
                  <span className="mx-2 text-zinc-600">|</span>
                  <CircleDot className="h-4 w-4 text-zinc-600" />
                  <span className="text-zinc-300">Disabled</span>
                </div> */}
              </CardHeader>
              <CardContent className="space-y-6">
                {permissionCategories.map((category) => (
                  <div key={category.name} className="space-y-4">
                    {/* <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">{category.name}</h3>
                      <Separator className="flex-1 mx-4 bg-zinc-700" />
                    </div> */}
                    
                    <div className="space-y-2">
                      {category.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center justify-between p-2 hover:bg-zinc-700/40 rounded-md transition-colors">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {role.permissions[permission.id] && (
                                <Check className="h-4 w-4 text-green-500" />
                              )}
                              <span className={cn(
                                "font-medium",
                                role.permissions[permission.id] ? "text-white" : "text-zinc-300"
                              )}>
                                {permission.name}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400">{permission.description}</p>
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
              </CardContent>
            </Card>
    </div>
  )
}

export default Permissions