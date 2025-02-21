"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateProject } from "@/hooks/useProject";
import { useNewProjectStore } from "@/store/projectStore";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema } from "@/validations/projectValidation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export function CreateProject() {
  const { onClose, isOpen } = useNewProjectStore();
  const { mutate } = useCreateProject();
  
  const [preview, setPreview] = useState<string | null>(null);

  const handleFilePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const form = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      projectLogo: undefined,
    },
  });

  const handleSubmit = (values: z.infer<typeof createProjectSchema>) => {
    console.log("values", values);
    const formData = new FormData();
    formData.append("projectName", values.projectName);
    formData.append("projectDescription", values.projectDescription);
    formData.append("projectLogo", values.projectLogo);
    mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-none text-muted-foreground">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-white">Create your Project</DialogTitle>
          <DialogDescription>
            Provide your project details and upload an image. Click &lsquo;Create&lsquo; to finalize your project setup.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="projectLogo"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel
                    htmlFor="project-logo"
                    className={`flex items-center justify-center w-24 h-24 border-2 border-dashed rounded-full cursor-pointer overflow-hidden transition-all duration-300 ${
                      preview ? "border-transparent" : "border-secondary"
                    }`}
                  >
                    {preview ? (
                      <Image
                        width={96}
                        height={96}
                        src={preview}
                        alt="Uploaded"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="text-gray-500 flex flex-col items-center justify-center">
                        <Camera className="w-6 h-6 text-gray-500" />
                        <p className="text-xs font-extrabold">Upload</p>
                      </div>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="project-logo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          field.onChange(files[0]);
                          handleFilePreview(e);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-left text-xs font-bold text-muted-foreground">
                    PROJECT NAME
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full border-secondary focus-visible:ring-0 focus-visible:border-white bg-transparent"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-left text-xs font-bold text-muted-foreground">
                    PROJECT DESCRIPTION
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full border-secondary focus-visible:ring-0 focus-visible:border-white bg-transparent"
                      {...field}
                      rows={3}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                className="font-semibold"
                size="lg"
                disabled={!form.formState.isValid}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
