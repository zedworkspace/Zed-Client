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
import { useState } from "react"
import { Textarea } from "../ui/textarea"
import { useUpdateProfile } from "@/store/updateProfileStore"

const myBio = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo distinctio autem nesciunt cumque at provident, facere laborum a eaque debitis expedita, beatae ipsa maxime tenetur soluta quaerat minima sunt placeat.'
const profileImage = '/images/barc.jpg'

export function UpdateProfileModal() {

  const [name,setName] = useState("userName")
  const [bio, setBio] = useState(myBio)
  const [image, setImage] = useState<string >(profileImage);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const {onClose, isOpen } = useUpdateProfile()
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="sm:max-w-[420px] border-none">
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
            <Textarea id="bio" value={bio} onChange={(e)=>setBio(e.target.value)}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit"onClick={()=>onClose()}>Edit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
