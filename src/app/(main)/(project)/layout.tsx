import SideBar from "@/components/sidebar/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <SidebarProvider className="relative">
      <SideBar />
      <SidebarInset>
        <main className="bg-secondary w-full h-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default layout;
