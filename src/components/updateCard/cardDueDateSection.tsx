import React from "react";
import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormValues } from "@/interface/cardInterface";

interface CardDueDateSectionProps {
  form: UseFormReturn<FormValues>;
}

export default function CardDueDateSection({ form }: CardDueDateSectionProps) {
  return (
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
                selected={field.value ? new Date(field.value) : undefined}
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
  );
}
