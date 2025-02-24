import Sidebar from "@/components/project/sidebar";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <>
      <div className="flex relative">
        <Sidebar />
        <main className="bg-secondary">{children}</main>
      </div>
    </>
  );
}

export default layout;
