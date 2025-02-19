import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useNewProjectStore } from "@/store/projectStore";
import { useNewInviteStore } from "@/store/inviteStore";

export default function LeftSection() {
  const { onOpen } = useNewProjectStore();
  const { onOpen: onInviteOpen } = useNewInviteStore();
  return (
    <div className="p-2 space-y-2">
           <Avatar>
        <AvatarImage src="https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg" />
        <AvatarFallback>P</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://cdn.dribbble.com/userupload/17175617/file/original-d4550896a72e6f3aae597e493a67d170.jpg?resize=752x&vertical=center" />
        <AvatarFallback>P</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://img.freepik.com/premium-vector/online-school-logo-learning-logo-design-vector_7888-850.jpg?semt=ais_hybridhttps://example.com/elearning-logo.png" />
        <AvatarFallback>P</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://images-platform.99static.com/fE3VP38GdvmpBhQ75p_erWEseqw=/100x100:900x900/500x500/top/smart/99designs-contests-attachments/90/90538/attachment_90538620" />
        <AvatarFallback>P</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://cdn.shopify.com/app-store/listing_images/d4718e5822b10dc93891cc169d97f4e3/icon/CLnh6ejKhfkCEAE=.png" />
        <AvatarFallback>P</AvatarFallback>
      </Avatar>
      <Button size="icon" className="border-non rounded-full" onClick={onOpen}>
        <Plus />
      </Button>
      <Button size="icon" className="border-non rounded-full" onClick={onInviteOpen}>
        <Plus />
      </Button>
    </div>
  );
}
