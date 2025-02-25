import SideBar from "@/components/sidebar/sidebar";


type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <>
      <div className="grid grid-cols-5 relative">
        <SideBar />
        <main className="bg-secondary w-full col-span-4">{children}</main>
      </div>
    </>
  );
}

export default layout;
