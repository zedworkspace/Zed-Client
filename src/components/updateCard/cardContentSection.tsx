import { useUpdateCard } from "@/hooks/useCard";
import { IBoardMember } from "@/interface/boardInterface";
import { FormValues, ICard } from "@/interface/cardInterface";
import { IProjectmember } from "@/interface/membersInterface";
import { useCardStore } from "@/store/cardStore";
import { UpdateCardSchema } from "@/validations/cardValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MultiValue } from "react-select";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon, User, Loader2 } from "lucide-react";
import CardLabelsSection from "./cardLabelSection";
import CardStatusSection from "./cardStatusSection";
import AssigneesSelect from "./assigneesSelect";
import { format } from "date-fns";
import CardActivitySection from "./cardActivitySection";
import { IList } from "@/interface/listInterface";

const defaultValues: FormValues = {
  title: "",
  description: "",
  status: "test",
  assignees: [],
  dueDate: undefined,
  labels: [],
};

export function CardModalContent({
  cardData,
  members,
  currentLists,
}: {
  cardData?: ICard;
  members?: IBoardMember[];
  currentLists?: IList[];
}) {
  const { isOpen, onClose, cardId } = useCardStore();
  const { channelId, projectId } = useParams() as {
    channelId: string;
    projectId: string;
  };

  const {
    mutate,
    isPending,
    isSuccess: isCardUpdatedSuccess,
  } = useUpdateCard(channelId);

  const [newLabel, setNewLabel] = useState("");
  const [assignees, setAssignees] = useState<
    | MultiValue<{
        value: string;
        label: React.JSX.Element;
        data: IProjectmember;
      }>
    | unknown
  >([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(UpdateCardSchema),
    defaultValues,
  });

  useEffect(() => {
    if (cardData) {
      const { title, assignees, description, dueDate, labels, status } =
        cardData;
      form.reset({
        title,
        description,
        assignees,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        status,
        labels,
      });
    }
  }, [cardData, form]);

  useEffect(() => {
    if (cardData?.assignees) {
      const formattedAssignees = cardData.assignees.map((assignee) => ({
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
        data: assignee,
      }));
      setAssignees(formattedAssignees);
    }
  }, [cardData?.assignees]);

  useEffect(() => {
    if (isCardUpdatedSuccess) {
      onClose();
    }
  }, [isCardUpdatedSuccess, onClose]);

  const formData = form.watch();

  const handleAddLabel = () => {
    if (newLabel.trim() && formData.labels) {
      form.setValue("labels", [...formData.labels, newLabel]);
      setNewLabel("");
    }
  };

  const handleRemoveLabel = (labelToRemove: string) => {
    if (formData.labels) {
      form.setValue(
        "labels",
        formData.labels.filter((label) => label !== labelToRemove)
      );
    }
  };

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

  const onSubmit = (submitData: FormValues) => {
    mutate({ cardId, projectId, formData: submitData });
  };

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
                  <CardLabelsSection
                    labels={formData.labels || []}
                    newLabel={newLabel}
                    setNewLabel={setNewLabel}
                    handleAddLabel={handleAddLabel}
                    handleRemoveLabel={handleRemoveLabel}
                    form={form}
                  />

                  {/* Status Section */}
                  <CardStatusSection
                    form={form}
                    currentLists={currentLists || []}
                  />

                  {/* Assignees Section */}
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
                                members={members}
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

                  {/* Due Date Section */}
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
                                  ? format(new Date(field.value), "PPP")
                                  : "Pick a date"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-[#2f3136] border-[#202225] text-gray-200">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
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
                      disabled
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

              <CardActivitySection />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
