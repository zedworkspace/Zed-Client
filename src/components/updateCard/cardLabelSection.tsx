import React from "react";
import { UseFormReturn } from "react-hook-form";
import { X, TagIcon, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { FormControl, FormItem, FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { FormValues } from "@/interface/cardInterface";

const labelColors = [
  "bg-red-100 text-red-800",
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
];

interface CardLabelsSectionProps {
  labels: string[];
  newLabel: string;
  setNewLabel: (value: string) => void;
  handleAddLabel: () => void;
  handleRemoveLabel: (label: string) => void;
  form: UseFormReturn<FormValues>;
}

export default function CardLabelsSection({
  labels,
  newLabel,
  setNewLabel,
  handleAddLabel,
  handleRemoveLabel,
  form,
}: CardLabelsSectionProps) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <TagIcon className="h-4 w-4 text-[#b9bbbe]" />
        <Label className="text-[#b9bbbe]">Labels</Label>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {labels.map((label, index) => (
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
          render={() => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Add a label"
                  className="flex-grow bg-secondary shadow border-none text-gray-200 placeholder:text-[#72767d] focus-visible:ring-0 focus-visible:border-0 outline-0 focus-visible:ring-offset-0"
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
          className="bg-secondary shadow border-none hover:bg-secondary/50 hover:text-white text-white"
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}