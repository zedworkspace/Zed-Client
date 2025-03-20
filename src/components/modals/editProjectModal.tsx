"use client";
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
import { Camera, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useEditProjectStore } from "@/store/projectStore";
import { useGetProject, useUpdateProject } from "@/hooks/useProject";
import { useParams } from "next/navigation";

export function EditProjectModal() {
  const { projectId } = useParams() as {
    projectId: string;
  };
  const { data } = useGetProject(projectId);

  const { mutate: updateProject, isPending } = useUpdateProject(projectId);

  const [description, setDescription] = useState(data?.data?.description);
  const [image, setImage] = useState<string>(data?.data?.logo ?? "");
  const [name, setName] = useState(data?.data?.name);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { onClose, isOpen } = useEditProjectStore();

  useEffect(() => {
    if (data) {
      setName(data.data.name || "");
      setDescription(data.data.description || "");
      setImage(data.data.logo);
    }
  }, [data]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Store the actual file
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name ?? "");
    formData.append("description", description ?? "");
    if (selectedFile) {
      formData.append("logo", selectedFile);
    }
    updateProject({ projectId: projectId, data: formData });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] border-none text-white">
        <DialogHeader>
          <DialogTitle>Update your profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center gap-4">
            <label
              htmlFor="fileUpload"
              className="relative flex items-center justify-center w-24 h-24 border rounded-full cursor-pointer overflow-hidden"
            >
              {image ? (
                <Image
                  width={200}
                  height={200}
                  src={image}
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
          <div className="space-y-1">
            <Label htmlFor="userName" className="text-right font-bold">
              UserName
            </Label>
            <Input
              id="userName"
              value={name}
              className="col-span-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Add your bio"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpdateProfile}>
            {isPending ? <LoaderCircle className="animate-spin" /> : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
