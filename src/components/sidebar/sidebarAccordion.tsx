import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useParams } from "next/navigation";
import { IChannel } from "@/interface/channelInterface";
import { LucideIcon } from "lucide-react";
import { IBoard } from "@/interface/boardInterface";

interface Props {
  channelData?: IChannel[] | IBoard[];
  Icon: LucideIcon;
  accordianValue: string;
  title: string;
  type: "text" | "voice" | "board";
  userId?: string;
  handleClick: (channelId: string, type: string) => void;
  unreadCounts?: Record<string, number>;
  socketChannelId?: string
}

export default function SidebarAccordion({
  accordianValue,
  channelData = [],
  Icon,
  title,
  type,
  handleClick,
  unreadCounts,
  socketChannelId
}: Props) {
  const { channelId }: { channelId: string } = useParams();

  return (
    <Accordion
      type="single"
      collapsible
      className="border-none"
      defaultValue={
        channelData.some((channel) => channel._id === channelId)
          ? accordianValue
          : undefined
      }
    >
      <AccordionItem value={accordianValue} className="border-none px-2">
        <AccordionTrigger className="font-semibold text-xs text-gray-400 hover:no-underline tracking-wide uppercase py-1">
          {title}
        </AccordionTrigger>
        {channelData.map((channel) => {
          const isActive = channelId === channel._id;
          const unreadCount = (unreadCounts && unreadCounts[channel._id]) || 0;

          return (
            <AccordionContent
              key={channel._id}
              className={`w-full flex items-center p-2 text-muted-foreground hover:bg-secondary/50 hover:text-white transition-colors duration-200 rounded-md h-10 font-bold cursor-pointer ${
                isActive ? "bg-secondary/80" : ""
              }`}
              onClick={() => handleClick(channel._id, type)}
            >
              <Icon className="size-5" />
              <span className="text-sm font-bold ml-2">{channel.name}</span>
              {unreadCount > 0 && socketChannelId !==channelId &&(
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </AccordionContent>
          );
        })}
      </AccordionItem>
    </Accordion>
  );
}
