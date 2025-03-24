"use client";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useCardStore } from "@/store/cardStore";
import { useGetCard } from "@/hooks/useCard";
import { useGetBoardMembers } from "@/hooks/useBoard";
import { IGetLists } from "@/interface/listInterface";
import { CardModalContent } from "./cardContentSection";
import { useGetActivitiesByEntityId } from "@/hooks/useActivity";

export function CardModal() {
  const queryClient = useQueryClient();
  const { isOpen, cardId } = useCardStore();
  const { channelId } = useParams() as {
    channelId: string;
  };

  const {
    data,
    isSuccess: isCardSuccess,
    isLoading: isCardLoading,
  } = useGetCard({ cardId, isOpen });

  const {
    data: membersData,
    isLoading: isMembersLoading,
    isSuccess: isMembersSuccess,
  } = useGetBoardMembers(channelId, isOpen);

  const currentLists = queryClient.getQueryData<IGetLists>([
    "lists",
    channelId,
  ]);

  const {
    data: activities,
    isLoading: activityLoading,
    isSuccess: activitySuccess,
  } = useGetActivitiesByEntityId({
    enabled: isOpen,
    entityId: cardId,
  });

  const isLoading = isCardLoading || isMembersLoading || activityLoading;
  const isSuccess = isCardSuccess || isMembersSuccess || activitySuccess;

  if (isLoading) return <div>Loading.....</div>;

  if (!isSuccess) return null;

  return (
    <CardModalContent
      cardData={data?.data}
      members={membersData?.data}
      currentLists={currentLists?.data}
      activities={activities?.data}
    />
  );
}
