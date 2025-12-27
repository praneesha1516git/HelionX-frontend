import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
return (
    <>
     <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen  p-4 bg-gradient-to-b from-[#f0f4f8] via-[#d9e8f5] to-[#e8f0f7]">
        <SidebarTrigger className="w-8 h-8 block mb-4" />
        <Outlet />
      </main>
    </SidebarProvider>
    </>
)
}