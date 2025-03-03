'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"
import { useGetProfile, useUpdateProfile } from "@/hooks/useProfile"
import { useUpdateProfileStore } from "@/store/updateProfileStore"


export function UpdateProfileModal() {
    
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId") || "";
      setUserId(storedUserId);
    }
  }, []);

    
    const {data} = useGetProfile(userId)

    const {mutate:updateProfile, isPending} = useUpdateProfile(userId)


    const [bio, setBio] = useState(data?.bio)
    const [image, setImage] = useState<string >(data?.profileImg);
    const [name,setName] = useState(data?.name)
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store actual file


  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setBio(data.bio || '');
      setImage(data.profileImg || "/sampleProfile.jpg");
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
  

  const handleUpdateProfile = () =>{
    const formData = new FormData()
    formData.append('name',name)
    formData.append('bio',bio)
    if(selectedFile) {
      formData.append('profileImg',selectedFile)
    }
    updateProfile({userId,formData})
  }

  const {onClose, isOpen } = useUpdateProfileStore()
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
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
                <Image width={200} height={200} src={image} alt="Uploaded" className="w-full h-full object-cover rounded-full" />
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
            <Input id="userName" value={name} className="col-span-3" onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="space-y-1">
            <Label htmlFor="bio">
              Bio
            </Label>
            <Textarea id="bio" placeholder="Add your bio" value={bio} onChange={(e)=>setBio(e.target.value)}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit"onClick={handleUpdateProfile}>{isPending?'Updating':"Edit"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
