"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Shell,
  User,
  X,
  FileText,
  Tag as TagIcon,
  PlusCircle,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCardStore } from "@/store/cardStore";
import { useGetCard, useUpdateCard } from "@/hooks/useCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "next/navigation";
import { UpdateCardSchema } from "@/validations/cardValidation";
import { useQueryClient } from "@tanstack/react-query";
import { IGetLists } from "@/interface/listInterface";
import AssigneesSelect from "./assigneesSelect";
import { MultiValue } from "react-select";
import { IProjectmember } from "@/interface/membersInterface";
import { useGetBoardMembers } from "@/hooks/useBoard";
import { IBoardMember } from "@/interface/boardInterface";

type FormValues = z.infer<typeof UpdateCardSchema>;

const defaultValues = {
  title: "",
  description: "",
  status: "test",
  assignees: [],
  dueDate: undefined,
  // checklist:  [],
  // activityLogs:  [],
  labels: [],
};
export function CardModal() {
  const queryClient = useQueryClient();
  const { isOpen, onClose, cardId } = useCardStore();
  const { channelId, projectId } = useParams() as {
    channelId: string;
    projectId: string;
  };
  const [newLabel, setNewLabel] = React.useState("");
  const [assignees, setAssignees] = useState<
    | MultiValue<{
        value: string;
        label: React.JSX.Element;
        data: IProjectmember;
      }>
    | unknown
  >([]);

  const {
    data,
    isSuccess: isCardSuccess,
    isLoading: isCardLoading,
  } = useGetCard({ cardId, isOpen });

  const { mutate, isPending } = useUpdateCard(channelId);
  const currentLists = queryClient.getQueryData<IGetLists>([
    "lists",
    channelId,
  ]);

  const form = useForm<FormValues>({
    resolver: zodResolver(UpdateCardSchema),
    defaultValues,
  });

  useEffect(() => {
    if (data?.data) {
      const initialData = data.data;

      form.reset({
        title: initialData.title,
        description: initialData.description,
        assignees: initialData.assignees,
        dueDate: initialData.dueDate,
        status: initialData.status,
        // checklist: initialData.checklist ,
        // activityLogs: initialData.activityLogs ,
        labels: initialData.labels,
      });
    }
  }, [data?.data, form]);

  useEffect(() => {
    if (data?.data?.assignees) {
      console.log("inside assignees", data?.data?.assignees);
      const formattedAssignees = data.data.assignees.map((assignee) => ({
        value: assignee.name,
        label: (
          <div className="flex items-center gap-2">
            <img
              src={assignee.profileImg}
              alt={assignee.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            {assignee.name}
          </div>
        ),
        data: data?.data?.assignees,
      }));
      setAssignees(formattedAssignees);
    }
  }, [data?.data?.assignees]);

  const formData = form.watch();

  const handleAddLabel = () => {
    formData.labels?.push(newLabel);
    setNewLabel("");
  };

  const labelColors = [
    "bg-red-100 text-red-800",
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
  ];

  const {
    data: membersData,
    isLoading: isMembersLoading,
    isSuccess: isMembersSuccess,
  } = useGetBoardMembers(channelId, isOpen);

  const handleAddAssignee = (
    newValue: MultiValue<{
      value: string;
      label: React.JSX.Element;
      data: IBoardMember;
    }>
  ) => {
    setAssignees(newValue);

    const newAssignees = newValue.map((member) => ({
      _id: member.data._id,
      name: member.data.name,
      profileImg: member.data.profileImg,
    }));

    form.setValue("assignees", newAssignees);
  };

  const handleRemoveLabel = (labelToRemove: string) => {
    form.reset({
      ...formData,
      labels: formData.labels?.filter((label) => label !== labelToRemove),
    });
  };

  const onSubmit = (submitData: FormValues) => {
    mutate({ cardId, projectId, formData: submitData });
  };

  const isLoading = isCardLoading || isMembersLoading;
  const isSuccess = isCardSuccess || isMembersSuccess;
  if (isLoading) return <div>Loading.....</div>;

  if (isSuccess)
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[850px] bg-primary border-none text-gray-100 shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-6">
                <div className="flex-1">
                  <DialogHeader className="border-b border-[#40444b] pb-4">
                    <DialogTitle>
                      <div className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <input
                                  {...field}
                                  placeholder="Card Title"
                                  className="text-xl font-bold p-2 px-0 border-none focus:border-none focus:outline-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-white placeholder:text-[#72767d]"
                                />
                              </FormControl>
                              <FormMessage className="mt-1 text-xs text-[#f04747]" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </DialogTitle>

                    {/* Description Section */}
                    <div className="mt-6 grid gap-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm font-semibold text-[#b9bbbe]">
                          Description
                        </Label>
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value || ""}
                                placeholder="Add a more detailed description"
                                className="text-lg px-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-gray-100 placeholder:text-[#72767d]"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    {/* Labels Section */}
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <TagIcon className="h-4 w-4 text-[#b9bbbe]" />
                        <Label className="text-[#b9bbbe]">Labels</Label>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.labels?.map((label, index) => (
                          <Badge
                            key={index}
                            className={cn(
                              "flex items-center gap-1 font-medium",
                              labelColors[index % labelColors.length]
                            )}
                          >
                            {label}
                            <X
                              className="h-3 w-3 cursor-pointer ml-1 hover:text-white transition-colors"
                              onClick={() => handleRemoveLabel(label)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <FormField
                          control={form.control}
                          name="labels"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input
                                  value={newLabel}
                                  onChange={(e) => setNewLabel(e.target.value)}
                                  placeholder="Add a label"
                                  className="flex-grow bg-secondary border-none text-gray-200 placeholder:text-[#72767d] focus-visible:ring-[#5865f2] focus-visible:border-[#5865f2]"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleAddLabel}
                          disabled={!newLabel.trim()}
                          className="bg-secondary border-none hover:bg-secondary/50 hover:text-white text-white"
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-[#b9bbbe]">
                              <Shell className="h-4 w-4 text-[#b9bbbe]" />
                              Status
                            </FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                const selectedList = currentLists?.data.find(
                                  (list) => list.name === value
                                );
                                form.setValue("listId", selectedList?._id);
                              }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full bg-secondary border-none text-gray-200 focus:ring-0">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#2f3136] border-[#202225] text-gray-200">
                                {currentLists?.data.map((list) => (
                                  <SelectItem
                                    key={list._id}
                                    value={list.name}
                                    className="hover:bg-[#393c43] focus:bg-[#393c43] cursor-pointer"
                                  >
                                    {list.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-[#f04747]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Assignees */}
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="assignees"
                        render={() => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-[#b9bbbe]">
                              <User className="h-4 w-4 text-[#b9bbbe]" />
                              Assignees
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <AssigneesSelect
                                  members={membersData?.data}
                                  handleChange={handleAddAssignee}
                                  value={assignees}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-[#f04747]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Due Date */}
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel className="flex items-center gap-2 text-[#b9bbbe]">
                            <CalendarIcon className="h-4 w-4 text-[#b9bbbe]" />
                            Due Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal bg-secondary border-none text-gray-200 hover:bg-secondary/50 hover:text-white"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value
                                    ? format(field.value, "PPP")
                                    : "Pick a date"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-[#2f3136] border-[#202225] text-gray-200">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className="bg-[#2f3136] text-gray-200"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="text-[#f04747]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter className="border-t border-[#40444b] pt-4">
                    {isPending ? (
                      <Button
                        className="bg-secondary border-none hover:bg-secondary/50 text-white"
                        disabled={!form.formState.isValid}
                      >
                        <Loader2 className="animate-spin" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-secondary border-none hover:bg-secondary/50 text-white transition-colors"
                        disabled={!form.formState.isValid}
                      >
                        Save Changes
                      </Button>
                    )}
                  </DialogFooter>
                </div>

                {/* Activity Logs */}
                <div className="w-64 border-l border-[#40444b] pl-6 rounded-r-lg">
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-white">
                    <FileText className="h-4 w-4 text-[#b9bbbe]" />
                    Activity
                  </h3>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#202225] scrollbar-track-[#2f3136]">
                    <div className="text-sm bg-[#32353b] p-3 rounded-lg border border-[#40444b] text-[#b9bbbe]">
                      <p className="text-center">No activity recorded yet</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
}
