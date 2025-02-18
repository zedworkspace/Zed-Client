import { CreateProject } from "@/components/modals/createProjectModal";
import { UpdateProfileModal } from "@/components/modals/updateProfileModal";
import React from "react";

export default function ModalProvider() {
  return (
    <>
      <CreateProject />
      <UpdateProfileModal />
    </>
  );
}
