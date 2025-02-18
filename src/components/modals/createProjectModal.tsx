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
import { Label } from "@/components/ui/label";
import { useCreateProject } from "@/hooks/useProject";
import { useNewProjectStore } from "@/store/projectStore";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { onClose, isOpen } = useNewProjectStore();
  const { mutate } = useCreateProject();
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("projectName", name);
    formData.append("projectDescription", description);
    formData.append("projectLogo", image!);
    mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] border-none text-muted-foreground">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-muted-foreground">
            Create your Project
          </DialogTitle>
          <DialogDescription>
            Provide your project details and upload an image. Click
            &lsquo;Create&lsquo; to finalize your project setup.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center gap-4">
            <label
              htmlFor="fileUpload"
              className="relative flex items-center justify-center w-24 h-24 border rounded-full cursor-pointer overflow-hidden"
            >
              {preview ? (
                <Image
                  width={200}
                  height={200}
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
              <Input
                id="fileUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="space-y-2">
            <div>
              <Label
                htmlFor="projectName"
                className="text-right text-xs font-bold text-muted-foreground"
              >
                PROJECT NAME
              </Label>
              <Input
                id="projectName"
                value={name}
                className="col-span-3 border  focus-visible:ring-0"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label
                htmlFor="projectName"
                className="text-right text-xs font-bold text-muted-foreground"
              >
                PROJECT DESCRIPTION
              </Label>
              <textarea
                id="projectDescription"
                value={description}
                className="col-span-3 border focus-visible:ring-0 h-28 resize-none  flex  w-full rounded-md  border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
