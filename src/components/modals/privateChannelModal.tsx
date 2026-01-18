/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useCreateChannelStore,
  usePrivateChannelStore,
} from "@/store/channelStore";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

import { useCreateChannel } from "@/hooks/useChannel";
import { useParams, useRouter } from "next/navigation";
import { useGetRoles } from "@/hooks/useRole";

import Select, { GroupBase, StylesConfig } from "react-select";
import { useEffect, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { IRole2 } from "@/interface/roleInterFace";
import { useCreateBoard } from "@/hooks/useBoard";

// Define the option type for react-select
interface RoleOption {
  value: string;
  label: string;
  data: IRole2;
}

export function PrivatChannel() {
  const { onOpen, setName, setType, type, name, setIsPrivate } =
    useCreateChannelStore();

  const { isOpenPrivate, onClosePriate } = usePrivateChannelStore();

  const { projectId } = useParams() as {
    projectId: string;
  };

  const { isPending } = useCreateChannel(projectId);
  const { data } = useGetRoles(projectId, isOpenPrivate);
  const { mutate, isSuccess, data: channelData } = useCreateChannel(projectId);
  const {
    mutate: boardMutate,
    isSuccess: boardSuccess,
    data: boardData,
  } = useCreateBoard(projectId);
  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      const id = channelData.data._id;
      sessionStorage.setItem("channelType", type);
      router.push(`/project/${projectId}/${id}`);
      onClosePriate();
    } else if (boardSuccess) {
      const id = boardData.data._id;
      sessionStorage.setItem("channelType", type);
      router.push(`/project/${projectId}/${id}`);
      onClosePriate();
    }
  }, [isSuccess, boardSuccess]);
  // Use the proper type for selectedOptions state
  const [selectedOptions, setSelectedOptions] = useState<RoleOption[]>([]);

  const handleCreate = () => {
    const allowedRoles = selectedOptions.map((role) => role.data.roleId);
    console.log({ type, name, allowedRoles });
    if (type === "board") {
      boardMutate({ name, projectId, allowedRoles });
    } else {
      mutate({ name, projectId, type, allowedRoles });
    }
  };

  const handleBack = () => {
    onClosePriate();
    onOpen();
  };

  const handleClose = () => {
    setName("");
    setType("text");
    setIsPrivate(false);
    onClosePriate();
  };

  // Make sure we handle the case where data might be undefined
  const options: RoleOption[] =
    data?.data?.map((role) => ({
      value: role.roleName,
      label: role.roleName,
      data: role,
    })) || [];

  // Discord-style colors
  const discordLightBg = "#2f3136";
  const discordText = "#dcddde";
  const discordMutedText = "#8e9297";
  const discordPurple = "#5865f2";
  const discordRed = "#ed4245";

  const selectStyles: StylesConfig<RoleOption, true, GroupBase<RoleOption>> = {
    control: (base) => ({
      ...base,
      background: discordLightBg,
      borderColor: "rgba(0,0,0,0.3)",
      borderRadius: "4px",
      minHeight: "40px",
      boxShadow: "none",
      "&:hover": {
        borderColor: discordPurple,
      },
    }),
    menu: (base) => ({
      ...base,
      background: discordLightBg,
      borderRadius: "4px",
      overflow: "hidden",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? "rgba(88, 101, 242, 0.3)" : discordLightBg,
      color: discordText,
      cursor: "pointer",
      padding: "8px 12px",
      "&:hover": {
        background: "rgba(88, 101, 242, 0.2)",
      },
    }),
    multiValue: (base) => ({
      ...base,
      background: "rgba(88, 101, 242, 0.3)",
      borderRadius: "3px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: discordText,
      fontSize: "14px",
      padding: "2px",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: discordText,
      cursor: "pointer",
      "&:hover": {
        background: discordRed,
        color: "#fff",
      },
    }),
    input: (base) => ({
      ...base,
      color: discordText,
    }),
    placeholder: (base) => ({
      ...base,
      color: discordMutedText,
      fontSize: "14px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: discordMutedText,
      "&:hover": {
        color: discordText,
      },
    }),
    clearIndicator: (base) => ({
      ...base,
      color: discordMutedText,
      "&:hover": {
        color: discordText,
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <Dialog open={isOpenPrivate} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-[#36393f] border-none rounded-md shadow-xl text-[#dcddde] p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-white text-lg font-bold">
            Add roles to private channel
          </DialogTitle>
          <DialogDescription className="text-xs text-[#b9bbbe] font-semibold tracking-wide">
            Who can access this channel
          </DialogDescription>
        </DialogHeader>

        <div className="px-4">
          <div className="">
            <Select<RoleOption, true>
              options={options}
              isMulti
              value={selectedOptions}
              onChange={(newValue) =>
                setSelectedOptions(newValue as RoleOption[])
              }
              placeholder="Select Roles..."
              classNamePrefix="select"
              styles={selectStyles}
              noOptionsMessage={() => "No roles available"}
              menuPlacement="auto"
            />
            <p className="text-xs text-[#8e9297] mt-1">
              Private channels are only visible to selected roles
            </p>
          </div>
        </div>

        <DialogFooter className="bg-[#2f3136] px-4 py-3 mt-4 flex justify-between">
          <Button
            onClick={handleBack}
            className="bg-transparent hover:underline text-[#b9bbbe] hover:text-white"
          >
            Back
          </Button>
          <Button
            onClick={handleCreate}
            disabled={isPending || selectedOptions.length === 0}
            className="bg-[#5865f2] hover:bg-[#4752c4] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed px-4"
          >
            {isPending ? (
              <LoaderCircle className="animate-spin mr-2" size={16} />
            ) : null}
            {isPending ? "Creating..." : "Create Channel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
