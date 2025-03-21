import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Shell } from "lucide-react";
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FormValues } from "@/interface/cardInterface";

interface CardStatusSectionProps {
  form: UseFormReturn<FormValues>;
  currentLists: Array<{
    _id: string;
    name: string;
  }>;
}

export default function CardStatusSection({
  form,
  currentLists,
}: CardStatusSectionProps) {
  return (
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
                const selectedList = currentLists.find(
                  (list) => list.name === value
                );
                if (selectedList) {
                  form.setValue("listId", selectedList._id);
                }
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full bg-secondary shadow border-none text-gray-200 focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-[#2f3136] border-[#202225] text-gray-200 focus:ring-0 focus:ring-offset-0">
                {currentLists.map((list) => (
                  <SelectItem
                    key={list._id}
                    value={list.name}
                    className="hover:bg-secondary focus:bg-white/30 cursor-pointer"
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
  );
}