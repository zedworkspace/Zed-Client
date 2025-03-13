"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useInviteStore } from "@/store/inviteStore";
import AcceptInviteModal from "@/components/modals/inviteAcceptModal";
import { useGetInviteInfo } from "@/hooks/useInvite";

export default function InvitePage() {
    const { inviteId } = useParams<{ inviteId: string }>();
    const router = useRouter();
    const { setInvite, openAcceptModal } = useInviteStore();

    useEffect(() => {
        setInvite(inviteId);
        openAcceptModal();
      }, [inviteId, setInvite, openAcceptModal]);
    
      const { data, isLoading } = useGetInviteInfo(inviteId);
      useEffect(() => {
        if (data?.project?.redirectToProject) {
          router.push(`/project/${data?.project?.projectId}`);
        }
      }, [data, router]);
    
      if (isLoading) return <p>Loading...</p>;
    
    return <AcceptInviteModal project={data?.project}/>;
}
