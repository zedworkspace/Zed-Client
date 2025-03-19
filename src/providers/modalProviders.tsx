"use client";
import { CardModal } from "@/components/board/cardModal";
import { CreateBoard } from "@/components/modals/createBoardModal";
import { CreateChannel } from "@/components/modals/createChannelModal";
import { CreateProject } from "@/components/modals/createProjectModal";
import { PrivatChannel } from "@/components/modals/privateChannelModal";
import { UpdateProfileModal } from "@/components/modals/updateProfileModal";

export default function ModalProvider() {
  return (
    <>
      <CreateProject />
      <UpdateProfileModal />
      <CardModal />
      <CreateChannel />
      <PrivatChannel />
      <CreateBoard />
    </>
  );
}
