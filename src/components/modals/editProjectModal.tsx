/* eslint-disable @next/next/no-img-element */
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
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { useEditProjectStore } from "@/store/projectStore";
import { useGetProject, useUpdateProject } from "@/hooks/useProject";
import { useParams } from "next/navigation";

export function EditProjectModal() {
  const { projectId } = useParams() as { projectId: string };
  const { onClose, isOpen } = useEditProjectStore();
  const { data } = useGetProject(projectId, isOpen);
  const { mutate: updateProject, isPending } = useUpdateProject(projectId);

  const [name, setName] = useState(data?.data?.name || "");
  const [description, setDescription] = useState(data?.data?.description || "");
  const [logo, setLogo] = useState<string>(data?.data?.logo ?? "");
  const [banner, setBanner] = useState<string>(data?.data?.banner ?? "");

  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      setName(data.data.name || "");
      setDescription(data.data.description || "");
      setLogo(data.data.logo || "");
      setBanner(data.data.banner || "");
    }
  }, [data]);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedLogo(file);
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedBanner(file);
      setBanner(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name ?? "");
    formData.append("description", description ?? "");
    if (selectedLogo) {
      formData.append("logo", selectedLogo);
    }
    if (selectedBanner) {
      formData.append("banner", selectedBanner);
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
          <div className="relative w-full h-40 rounded-lg overflow-hidden  ">
          <label
            htmlFor="bannerUpload"
            className="absolute inset-0 flex items-center justify-center bg-primary hover:bg-primary/60 transition cursor-pointer text-white/40"
          >
            {banner ? (
              <img
                src={banner}
                alt="Project Banner"
                className="rounded-lg w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className=" ">Add Banner</div>
                <Camera className="w-5 h-5" />
              </div>
            )}
              </label>
              <Input
                id="bannerUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerChange}
              />
          </div>

          <div className="flex items-center justify-center relative -mt-16">
            <label
              htmlFor="logoUpload"
              className="relative flex items-center justify-center w-24 h-24 border rounded-full cursor-pointer overflow-hidden"
            >
              {logo ? (
                <img
               
                  src={logo}
                  alt="Uploaded Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="text-gray-500 flex flex-col items-center justify-center">
                  <Camera className="w-6 h-6 text-gray-500" />
                  <p className="text-xs font-extrabold">Upload</p>
                </div>
              )}
            </label>
            <Input
              id="logoUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="userName" className="text-right font-bold">
              Project Name
            </Label>
            <Input
              id="userName"
              value={name}
              className="col-span-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add your description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleUpdateProfile} disabled={description =="" || name == ""}>
            {isPending ? <LoaderCircle className="animate-spin" /> : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
