"use client"
import React from "react"
import { useParams } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ChevronLeft, CircleDot, Settings, ShieldAlert, ShieldCheck, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const permissionCategories = [
  {
    name: "General Permissions",
    permissions: [
      { id: "view_channels", name: "View Channels", description: "Allow members to view text channels and voice channels" },
      { id: "manage_channels", name: "Manage Channels", description: "Allow members to create, edit or delete channels" },
      { id: "manage_roles", name: "Manage Roles", description: "Allow members to create and edit roles lower than their highest role" },
      { id: "manage_emojis", name: "Manage Emojis and Stickers", description: "Allow members to add or remove custom emojis and stickers" },
      { id: "view_audit_log", name: "View Audit Log", description: "Allow members to view the server's audit log" },
      { id: "view_server_insights", name: "View Server Insights", description: "Allow members to view server insights" }
    ]
  },
  {
    name: "Text Channel Permissions",
    permissions: [
      { id: "send_messages", name: "Send Messages", description: "Allow members to send messages in text channels" },
      { id: "send_messages_in_threads", name: "Send Messages in Threads", description: "Allow members to send messages in threads" },
      { id: "create_public_threads", name: "Create Public Threads", description: "Allow members to create threads that everyone can see" },
      { id: "create_private_threads", name: "Create Private Threads", description: "Allow members to create private threads" },
      { id: "embed_links", name: "Embed Links", description: "Allow links posted by members to show content previews" },
      { id: "attach_files", name: "Attach Files", description: "Allow members to upload files" },
      { id: "add_reactions", name: "Add Reactions", description: "Allow members to add new reactions to messages" },
      { id: "use_external_emojis", name: "Use External Emojis", description: "Allow members to use emojis from other servers" },
      { id: "mention_everyone", name: "Mention @everyone, @here and All Roles", description: "Allow members to use @everyone and @here mentions" }
    ]
  },
  {
    name: "Voice Channel Permissions",
    permissions: [
      { id: "connect", name: "Connect", description: "Allow members to join voice channels" },
      { id: "speak", name: "Speak", description: "Allow members to talk in voice channels" },
      { id: "video", name: "Video", description: "Allow members to share their video" },
      { id: "use_voice_activity", name: "Use Voice Activity", description: "Allow members to speak without using push-to-talk" },
      { id: "priority_speaker", name: "Priority Speaker", description: "Allow members to be more easily heard when speaking" },
      { id: "mute_members", name: "Mute Members", description: "Allow members to mute other members in voice channels" },
      { id: "deafen_members", name: "Deafen Members", description: "Allow members to deafen other members in voice channels" },
      { id: "move_members", name: "Move Members", description: "Allow members to move other members between voice channels" }
    ]
  }
]

export default function RolePage() {
  const { roleId } = useParams() as { roleId: string }
  const [role, setRole] = React.useState({
    name: roleId.replace(/-/g, ' '),
    color: "#5865f2",
    permissions: {} as Record<string, boolean>
  })

  // Initialize default permissions
  React.useEffect(() => {
    const initialPermissions = {} as Record<string, boolean>
    permissionCategories.forEach(category => {
      category.permissions.forEach(permission => {
        initialPermissions[permission.id] = false
      })
    })
    setRole(prev => ({ ...prev, permissions: initialPermissions }))
  }, [roleId])

  const togglePermission = (permissionId: string) => {
    setRole(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permissionId]: !prev.permissions[permissionId]
      }
    }))
  }

  const handleRoleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(prev => ({ ...prev, name: e.target.value }))
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(prev => ({ ...prev, color: e.target.value }))
  }

  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      {/* Sidebar  */}
      <div className="w-64 border-r border-zinc-800 p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-6">
          <Users className="h-5 w-5 text-zinc-400" />
          <h3 className="font-semibold">Roles</h3>
        </div>
        
        <div className="space-y-1">
          <button className="w-full text-left p-2 rounded flex items-center gap-2 bg-zinc-800 text-white">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }}></div>
            <span>{role.name}</span>
          </button>
          <button className="w-full text-left p-2 rounded flex items-center gap-2 hover:bg-zinc-800 text-zinc-400">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Moderator</span>
          </button>
          <button className="w-full text-left p-2 rounded flex items-center gap-2 hover:bg-zinc-800 text-zinc-400">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Member</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-zinc-800 p-4">
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-full hover:bg-zinc-800">
              <ChevronLeft className="h-5 w-5 text-zinc-400" />
            </button>
            <h1 className="font-bold text-xl">Role Settings</h1>
          </div>
        </header>

        {/* Content */}
        <ScrollArea className="flex-1 px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-8 pb-16">
            {/* Role Overview Card */}
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Role Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">ROLE NAME</label>
                  <Input 
                    value={role.name} 
                    onChange={handleRoleNameChange}
                    className="bg-zinc-900 border-zinc-700 focus:border-blue-500 text-zinc-100"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">ROLE COLOR</label>
                  <div className="flex items-center gap-3">
                    <Input 
                      type="color" 
                      value={role.color} 
                      onChange={handleColorChange}
                      className="w-12 h-8 p-1 bg-transparent border-0"
                    />
                    <Badge 
                      style={{ backgroundColor: role.color }}
                      className="text-white px-3 py-1 font-normal"
                    >
                      {role.name}
                    </Badge>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-zinc-300" />
                      <h3 className="font-medium text-muted-foreground">Display role members separately</h3>
                    </div>
                    <Switch />
                  </div>
                  <p className="text-sm text-zinc-400">Members with this role will display separately from online members.</p>
                </div>
              </CardContent>
            </Card>

            {/* Permissions Card */}
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  Permissions
                </CardTitle>
                <div className="flex items-center gap-2 text-sm">
                  <CircleDot className="h-4 w-4 text-green-500" />
                  <span className="text-zinc-300">Enabled</span>
                  <span className="mx-2 text-zinc-600">|</span>
                  <CircleDot className="h-4 w-4 text-zinc-600" />
                  <span className="text-zinc-300">Disabled</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {permissionCategories.map((category) => (
                  <div key={category.name} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">{category.name}</h3>
                      <Separator className="flex-1 mx-4 bg-zinc-700" />
                    </div>
                    
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
        </ScrollArea>
      </div>
    </div>
  )
}