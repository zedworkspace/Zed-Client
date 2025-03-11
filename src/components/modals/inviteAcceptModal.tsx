"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useInviteStore } from "@/store/inviteStore";
import { useRouter } from "next/navigation";
import { useAcceptInvite } from "@/hooks/useInvite";

interface Project {
  logo: string;
  name: string;
  description: string;
  projectId: string;
}

interface AcceptInviteModalProps {
  project: Project;
}

export default function AcceptInviteModal({ project }: AcceptInviteModalProps) {
  const { isAcceptModalOpen, closeAcceptModal, inviteId } = useInviteStore();
  const router = useRouter();
  const { mutate, isSuccess } = useAcceptInvite()

  const handleAccept = () =>{
    if(inviteId) mutate({inviteLink: inviteId}, {
        onSuccess: () =>{
            router.push(`/project/${project.projectId}`);
        }
    })
  }

  const handleReject = () => {
    closeAcceptModal();
    router.push("/");
  };

  return (
    <Dialog open={isAcceptModalOpen} onOpenChange={handleReject}>
      <DialogContent className="max-w-md border-none text-muted-foreground">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-muted-foreground">Join Project</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center w-full gap-5">
          <div className="flex justify-center items-center w-3/4">
            <img src={project?.logo} alt="Project Logo" className="w-full h-3/4 rounded-xl mb-4 object-cover" />
          </div>
          <div className="flex flex-col items-center text-center">

            <h2 className="text-lg font-semibold">{project?.name}</h2>
            <p className="text-gray-500">{project?.description}</p>

            <div className="mt-4 flex gap-3">
              <Button onClick={handleAccept} className="bg-green-600 hover:bg-green-700">
                Accept
              </Button>
              <Button variant="outline" onClick={handleReject}>
                Reject
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
