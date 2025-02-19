'use client'
import { useGetProfile } from "@/hooks/useProfile";
import { useUpdateProfile } from "@/store/updateProfileStore";
import { UserPen } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type UserProfileLayoutProps = {
    children: React.ReactNode;
};

const UserProfileLayout: React.FC<UserProfileLayoutProps> = ({ children }) => {
    const { onOpen } = useUpdateProfile();
    const router = useRouter();
    const pathname = usePathname();
    const userId = pathname.split("/")[1];

    const {data} = useGetProfile(userId)
    console.log(data);

    const navItems = [
        { name: "My Tasks", path: "/userprofile" },
        { name: "Activity", path: "/userprofile/activity" },
        { name: "Settings", path: "/userprofile/settings" },
    ];

    return (
        <div className="w-4/6 mx-auto mt-10">
            {/* Profile Banner */}
            <div className="bg-secondary h-44 relative rounded-lg"></div>

            {/* Profile Info Section */}
            <div className="flex items-center gap-6 mt-[-6rem] ml-10">
                <Image
                    width={100}
                    height={100}
                    src={'/sampleProfile.jpg'}
                    alt="profileImage"
                    className="rounded-full w-40 h-40 border-4 border-[#0f0f17] z-10"
                />
                <div className="flex-1 mt-28">
                    <div className="flex justify-between items-center">
                        <p className="text-xl font-semibold text-white">{data?.name}</p>
                        <UserPen 
                            color="white" 
                            className="cursor-pointer mr-5"
                            onClick={onOpen} 
                        />
                    </div>
                    <p className="text-white -mt-1 text-sm">{data?.email}</p>
                    <p className="text-sm text-gray-400 mt-2 max-w-2xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo distinctio autem nesciunt cumque at provident, 
                        facere laborum a eaque debitis expedita, beatae ipsa maxime tenetur soluta quaerat minima sunt placeat.
                    </p>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="mt-12">
                <ul className="flex gap-10 text-lg font-medium cursor-pointer text-white">
                    {navItems.map((item) => (
                        <li 
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className={`relative pb-2 ${
                                pathname === item.path ? 'text-blue-500' : ''
                            }`}
                        >
                            {item.name}
                            {pathname === item.path && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500"></span>
                            )}
                        </li>
                    ))}
                </ul>
                <hr className="mt-4 border-gray-700" />
            </div>

            {/* Page Content */}
            <div className="mt-10">{children}</div>
        </div>
    );
};

export default UserProfileLayout;
