"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  CheckCircle,
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ICard } from "@/interface/cardInterface";
import { useParams } from "next/navigation";

// Type definitions
type ChecklistItem = {
  id: string;
  text: string;
  completed: boolean;
};

type Assignee = {
  id: string;
  name: string;
  avatar?: string;
};

type ActivityLog = {
  id: string;
  type: "assignee" | "label";
  action: "added" | "removed";
  assignee?: Assignee;
  label?: string;
  timestamp: Date;
};

// Form schema using zod
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  dueDate: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type CardModalProps = {
  initialData?: {
    title?: string;
    description?: string;
    status?: string;
    assignees?: Assignee[];
    dueDate?: Date;
    checklist?: ChecklistItem[];
    activityLogs?: ActivityLog[];
    labels?: string[];
  };
};

export function CardModal({ initialData }: CardModalProps) {
  const { channelId } = useParams() as { channelId: string };
  // React Hook Form with shadcn/ui Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      status: initialData?.status || "To Do",
      dueDate: initialData?.dueDate,
    },
  });

  // States for non-form elements
  const [assignees, setAssignees] = React.useState<Assignee[]>(
    initialData?.assignees || []
  );
  const [newAssignee, setNewAssignee] = React.useState("");
  const [activityLogs, setActivityLogs] = React.useState<ActivityLog[]>(
    initialData?.activityLogs || []
  );

  // Labels state
  const [labels, setLabels] = React.useState<string[]>(
    initialData?.labels || []
  );
  const [newLabel, setNewLabel] = React.useState("");

  // Predefined label colors
  const labelColors = [
    "bg-red-100 text-red-800",
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
  ];

  // Status options
  const statusOptions = ["To Do", "In Progress", "Review", "Done"];

  // Sample assignees for the demo
  const availableAssignees = [
    {
      id: "1",
      name: "Abhay",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg",
    },
    {
      id: "2",
      name: "Muhammed Jasim",
      avatar:
        "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg",
    },
    {
      id: "3",
      name: "Shanoof",
      avatar:
        "https://img.freepik.com/premium-vector/een-man-met-een-paars-hemd-en-een-blauw-hemd-met-een-paarse-kraag_969863-208745.jpg?semt=ais_hybrid",
    },
  ];

  // Handle assignee add
  const handleAddAssignee = (assigneeId: string) => {
    const assignee = availableAssignees.find((a) => a.id === assigneeId);
    if (assignee && !assignees.some((a) => a.id === assigneeId)) {
      setAssignees([...assignees, assignee]);
      setActivityLogs([
        ...activityLogs,
        {
          id: Date.now().toString(),
          type: "assignee",
          action: "added",
          assignee: assignee,
          timestamp: new Date(),
        },
      ]);
    }
    setNewAssignee("");
  };

  // Handle assignee remove
  const handleRemoveAssignee = (assigneeId: string) => {
    const assignee = assignees.find((a) => a.id === assigneeId);
    if (assignee) {
      setAssignees(assignees.filter((a) => a.id !== assigneeId));
      setActivityLogs([
        ...activityLogs,
        {
          id: Date.now().toString(),
          type: "assignee",
          action: "removed",
          assignee: assignee,
          timestamp: new Date(),
        },
      ]);
    }
  };

  // Handle label add
  const handleAddLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel.trim())) {
      const updatedLabels = [...labels, newLabel.trim()];
      setLabels(updatedLabels);
      setActivityLogs([
        ...activityLogs,
        {
          id: Date.now().toString(),
          type: "label",
          action: "added",
          label: newLabel.trim(),
          timestamp: new Date(),
        },
      ]);
      setNewLabel("");
    }
  };

  // Handle label remove
  const handleRemoveLabel = (labelToRemove: string) => {
    const updatedLabels = labels.filter((label) => label !== labelToRemove);
    setLabels(updatedLabels);
    setActivityLogs([
      ...activityLogs,
      {
        id: Date.now().toString(),
        type: "label",
        action: "removed",
        label: labelToRemove,
        timestamp: new Date(),
      },
    ]);
  };

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    // Combine form data with other state
    const formData: ICard = {
      ...data,
      assignees,
      labels,
      activityLogs,
    };

    console.log("Form submitted:", formData);
    mutate({ cardId, formData });
    // Here you would typically save the data or dispatch an action
    // onClose();
  };

  const { isOpen, onClose, cardId } = useCardStore();
  const { data, isSuccess, isLoading } = useGetCard({ cardId, isOpen });
  const { mutate, isPending } = useUpdateCard(channelId);
  // Update form when data is loaded
  React.useEffect(() => {
    if (isSuccess && data?.data) {
      form.reset({
        title: data.data.title,
        description: data.data.description || "",
        status: data.data.status || "To Do",
        dueDate: data.data.dueDate,
      });
      // Handle other fields if needed
    }
  }, [isSuccess, data, form]);

  if (isLoading) return <div>Loading.....</div>;

  if (isSuccess)
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[850px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-6">
                <div className="flex-1">
                  <DialogHeader>
                    <DialogTitle>
                      <div className="flex items-center gap-2">
                        <FileText className="h-8 w-8 text-gray-500" />
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Card Title"
                                  className="text-2xl font-bold px-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                              </FormControl>
                              <FormMessage className="mt-1 text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </DialogTitle>

                    {/* Description Section */}
                    <div className="mt-4 grid gap-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-xs font-semibold">
                          Description
                        </Label>
                      </div>
                      <DialogDescription>
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Add a more detailed description"
                                  className="px-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                  multiline
                                  rows={3}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </DialogDescription>
                    </div>
                  </DialogHeader>

                  <div className="grid gap-6 py-4">
                    {/* Labels Section */}
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <TagIcon className="h-4 w-4 text-gray-500" />
                        <Label>Labels</Label>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {labels.map((label, index) => (
                          <Badge
                            key={label}
                            className={cn(
                              "flex items-center gap-1",
                              labelColors[index % labelColors.length]
                            )}
                          >
                            {label}
                            <X
                              className="h-3 w-3 cursor-pointer ml-1"
                              onClick={() => handleRemoveLabel(label)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newLabel}
                          onChange={(e) => setNewLabel(e.target.value)}
                          placeholder="Add a label"
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleAddLabel}
                          disabled={!newLabel.trim()}
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
                            <FormLabel className="flex items-center gap-2">
                              <Shell className="h-4 w-4 text-gray-500" />
                              Status
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {statusOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    <div className="flex items-center gap-2">
                                      <CheckCircle
                                        className={cn(
                                          "h-4 w-4",
                                          option === "To Do"
                                            ? "text-gray-500"
                                            : option === "In Progress"
                                            ? "text-blue-500"
                                            : option === "Review"
                                            ? "text-yellow-500"
                                            : "text-green-500"
                                        )}
                                      />
                                      {option}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Assignees */}
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <Label>Assignees</Label>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {assignees.map((assignee) => (
                          <Badge
                            key={assignee.id}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <img
                              src={assignee.avatar}
                              alt={assignee.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            {assignee.name}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => handleRemoveAssignee(assignee.id)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <Select
                        value={newAssignee}
                        onValueChange={handleAddAssignee}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Add assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableAssignees
                            .filter(
                              (a) =>
                                !assignees.some(
                                  (assigned) => assigned.id === a.id
                                )
                            )
                            .map((assignee) => (
                              <SelectItem key={assignee.id} value={assignee.id}>
                                <div className="flex items-center gap-2">
                                  <img
                                    src={assignee.avatar}
                                    alt={assignee.name}
                                    width={24}
                                    height={24}
                                    className="rounded-full"
                                  />
                                  {assignee.name}
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Due Date */}
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem className="grid gap-2">
                          <FormLabel className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                            Due Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value
                                    ? format(field.value, "PPP")
                                    : "Pick a date"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter>
                    {isPending ? (
                      <Button
                        className="bg-primary hover:bg-muted-foreground text-white"
                        disabled={!form.formState.isValid}
                      >
                        <Loader2 className="animate-spin" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-primary hover:bg-muted-foreground text-white"
                        disabled={!form.formState.isValid}
                      >
                        Save Changes
                      </Button>
                    )}
                  </DialogFooter>
                </div>

                {/* Activity Logs */}
                <div className="w-64 border-l pl-6 rounded-r-lg">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-black" />
                    Activity
                  </h3>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {activityLogs.map((log) => (
                      <div
                        key={log.id}
                        className="text-sm bg-black p-3 rounded-lg shadow-sm border"
                      >
                        {log.type === "assignee" && (
                          <p>
                            {log.assignee?.name} was {log.action}{" "}
                            <span className="text-gray-500 block text-xs">
                              {format(log.timestamp, "PPpp")}
                            </span>
                          </p>
                        )}
                        {log.type === "label" && (
                          <p>
                            Label {log.label} was {log.action}{" "}
                            <span className="text-gray-500 block text-xs">
                              {format(log.timestamp, "PPpp")}
                            </span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
}
