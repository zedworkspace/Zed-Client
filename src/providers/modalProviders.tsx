import { CardModal } from "@/components/board/cardModal";
import { CreateBoard } from "@/components/modals/createBoardModal";
import { CreateChannel } from "@/components/modals/createChannelModal";
import { CreateProject } from "@/components/modals/createProjectModal";
import { CreateRole } from "@/components/modals/createRoleModal";
import { PrivatChannel } from "@/components/modals/privateChannelModal";
import { UpdateProfileModal } from "@/components/modals/editProfileModal";
import React from "react";
import { EditProjectModal } from "@/components/modals/editProjectModal";
import { AssigneRole } from "@/components/modals/assignRoleModal";
import { RemoveRole } from "@/components/modals/removeRoleModal";

export default function ModalProvider() {
  return (
    <>
      <CreateProject />
      <UpdateProfileModal />
      <CardModal/>
      <CreateChannel/>
      <PrivatChannel/>
      <CreateBoard/>
      <CreateRole/>
      <EditProjectModal/>
      <AssigneRole/>
      <RemoveRole/>
    </>
  );
}
