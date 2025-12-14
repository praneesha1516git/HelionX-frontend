import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-4 w-full">
        <SidebarTrigger className="w-8 h-8 block" />
        <Outlet />
        </main>
      </SidebarProvider>
    </>
)
}