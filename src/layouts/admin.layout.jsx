import { Outlet } from "react-router";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarTrigger , SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout() {
    return (
         <>
  <SidebarProvider>
    <AdminSidebar />
    <main className="p-4 w-full min-h-screen bg-gray-200">
      <SidebarTrigger className="block mb-4" />
      <Outlet />
    </main>
  </SidebarProvider>
</>
    );
}
