import Sidebar from "@/components/sidebar/sidebar";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <main className="bg-black/40 flex-1 overflow-auto h-full scrollbar-hide ">
        {children}
      </main>
    </div>
  );
}

export default layout;
