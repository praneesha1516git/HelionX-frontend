import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
return (
    <>
     <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen bg-gray-200 p-4">
        <SidebarTrigger className="w-8 h-8 block mb-4" />
        <Outlet />
      </main>
    </SidebarProvider>
    </>
)
}