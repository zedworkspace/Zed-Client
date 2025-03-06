import { CreateProject } from "@/components/modals/createProjectModal";
import { InviteMembers } from "@/components/modals/inviteMembersModal";
import { UpdateProfileModal } from "@/components/modals/updateProfileModal";
import React from "react";

export default function ModalProvider() {
  return (
    <>
      <CreateProject />
      {/* <InviteMembers /> */}
      <UpdateProfileModal />
    </>
  );
}
