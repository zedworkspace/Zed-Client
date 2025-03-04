"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Check } from "lucide-react";
import { useInviteStore } from '@/store/inviteStore'
import { useParams } from "next/navigation";
import { useGenerateInvite, useSendInvite } from "@/hooks/useInvite";
export function InviteMembers() {
    const [email, setEmail] = useState("");
    const [copied, setCopied] = useState(false);
    const { projectId } = useParams() as { projectId: string };
    const { data, isSuccess, isError, isLoading } = useGenerateInvite(projectId);
    const { mutate } = useSendInvite()

    const handleSendEmail = ()=>{
        mutate({email, inviteLink:data.inviteLink});
    }

    const handleCopy = () => {
      navigator.clipboard.writeText(data.inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    const { closeGenerateModal, isGenerateModalOpen } = useInviteStore();
    if(isLoading) <div>loading</div>
    return(
        <Dialog open={isGenerateModalOpen} onOpenChange={closeGenerateModal}>
            <DialogContent className="max-w-md border-none text-muted-foreground">
            <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-muted-foreground">Invite Members</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
                <p className="text-sm">Invite</p>
                <div className="flex gap-2 mt-2">
                    <Input
                        type="email"
                        placeholder="Email"
                        className="flex-1 border focus-visible:ring-0"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="default" onClick={handleSendEmail}>Send Invite</Button>
                </div>
            </div>
            <div className="mt-4 border-t border-gray-700 pt-4 overflow-hidden">
                    <p className="text-sm">Or share a link</p>
                    <div className="flex items-center justify-between bg-gray-800 p-2 rounded-md mt-2">
                        <span className="text-sm truncate">{data?.inviteLink}</span>
                        <button onClick={handleCopy} className="p-1 transition-all duration-200">
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}