import { Outlet } from "react-router";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarTrigger , SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout() {
    return (
         <>
  <SidebarProvider>
    <AdminSidebar />
    <main className="p-4 w-full min-h-screen bg-gradient-to-b from-[#f0f4f8] via-[#d9e8f5] to-[#e8f0f7]">
      <SidebarTrigger className="block mb-4" />
      <Outlet />
    </main>
  </SidebarProvider>
</>
    );
}
