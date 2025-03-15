"use client";

import { SidebarMenuButton } from "../ui/sidebar";

export default function SideBar() {

    return (
      <div className="mt-16">
        <div className=" w-[14rem] flex flex-col gap-10 ">
          <div className="bg-white bg-opacity-20 h-14 flex justify-center items-center">
            <h1 className="font-bold text-xl">Admin Panel</h1>
          </div>
          <div className="mid flex flex-col">
            <SidebarMenuButton >
            <button>Dashbord</button> 
            <button>Users</button> 
            <button>Projects</button> 
            </SidebarMenuButton>
          </div>
          <div className="bottom">
            <button>Sign Out</button>
          </div>
        </div>
      </div>
    )
}
