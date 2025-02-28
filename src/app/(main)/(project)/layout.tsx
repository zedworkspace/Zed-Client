import Sidebar from "@/components/sidebar/sidebar";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="bg-secondary w-full h-full">{children}</main>
    </div>
  );
}

export default layout;
