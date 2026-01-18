import Image from "next/image";
import { User } from "lucide-react";

interface UserAvatarProps {
  user: {
    _id:string;
    profileImg?:string
    name:string
  };
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  if (user?.profileImg) {
    return (
      <Image
        src={user.profileImg}
        alt="Profile"
        width={40}
        height={40}
        className="rounded-full w-10 h-10"
      />
    );
  }
  
  return <User className="rounded-full w-10 h-10 text-gray-300" />;
};

export default UserAvatar;