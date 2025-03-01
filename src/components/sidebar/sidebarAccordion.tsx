import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useParams, useRouter } from "next/navigation";
import { IChannel } from "@/interface/channelInterface";
import { LucideIcon } from "lucide-react";
import { IBoard } from "@/interface/boardInterface";

type Props = {
  channelData?: IChannel[] | IBoard[];
  Icon: LucideIcon;
  accordianValue: string;
  title: string;
  type: "text" | "voice" | "board";
};

export default function SidebarAccordion({
  accordianValue,
  channelData,
  Icon,
  title,
  type,
}: Props) {
  const params = useParams();
  const channelId = params.channelId as string;
  const router = useRouter();

  return (
    <Accordion
      type="single"
      collapsible
      className="border-none"
      defaultValue={
        channelData?.some((channel) => channel._id === channelId)
          ? accordianValue
          : undefined
      }
    >
      <AccordionItem value={accordianValue} className="border-none px-2">
        <AccordionTrigger className="font-semibold text-xs text-gray-400 hover:no-underline tracking-wide uppercase  py-1 border-none outline-none">
          {title}
        </AccordionTrigger>
        {channelData?.map((channel) => (
          <AccordionContent
            key={channel._id}
            className={`w-full gap-2 cursor-pointer flex items-center p-2 text-muted-foreground hover:bg-secondary/50 hover:text-white transition-colors duration-200 rounded-md h-10 font-bold ${
              channelId === channel._id ? "bg-secondary/80" : ""
            }`}
            onClick={() => {
              sessionStorage.setItem("channelType", type);
              router.replace(`${channel._id}`);
            }}
          >
            <Icon className="size-5" />
            <span className="text-sm font-bold">{channel.name}</span>
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  );
}
