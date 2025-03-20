import { X } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Member } from "@/interface/roleInterFace";
import { useAssignRoleStore, useRemoveRoleStore } from "@/store/roleStore";

function Members({
  roleName,
  roleId,
  roleMembers,
}: {
  roleName:string
  roleId: string;
  roleMembers: Member[];
}) {

    const {setMembers,onOpen} = useAssignRoleStore()
    const {onDeleteOpen, setMemberName, setRoleName, setMemeberId} = useRemoveRoleStore()

    const handleAdd = () => {
        setMembers(roleMembers)
        onOpen()
    }

    const handleRemove = (name:string,userId:string) => {
      setMemberName(name)
      setRoleName(roleName)
      setMemeberId(userId)
      onDeleteOpen()
    }
          
  return (
    <div className="space-y-7">
      <div className="flex space-x-5 ">
        <Input placeholder="Search Members" className="w-1/2" />
        <Button className="bg-secondary" onClick={handleAdd}>Add Members</Button>
      </div>
      {roleMembers?.map((member, ind) => (
        <div key={ind} className="flex items-center justify-between w-1/2">
          <div className="flex items-center space-x-3">
            <img
              width={100}
              height={100}
              src={member.profileImg}
              alt={member.name}
              className="w-8 h-8 rounded-full"
            />
            <p>{member.name}</p>
          </div>
          <X size={16} onClick={()=>handleRemove(member.name,member.userId)}/>
        </div>
      ))}
    </div>
  );
}

export default Members;
