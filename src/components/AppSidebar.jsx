import { ChartLine, LayoutDashboard, TriangleAlert ,ReceiptText} from "lucide-react";
import { useGetInvoicesforUserQuery } from "@/lib/redux/query";
import { Link } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, SignOutButton  } from "@clerk/clerk-react";
import { User, Settings as SettingsIcon, LogOut } from "lucide-react";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Anomalies",
    url: "/dashboard/anomalies",
    icon: TriangleAlert,
  },
   {
    title: "Invoices",
    url: "/dashboard/invoices",
    icon: ReceiptText,

  },
];

export function AppSidebar() {

   const { data: invoices } = useGetInvoicesforUserQuery();
   const pendingCount = invoices?.filter(inv => inv.paymentStatus ==="PENDING").length ||0 ;
   const { user } = useUser();
   const initials = (user?.firstName?.[0] || user?.lastName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0] || "?").toUpperCase();



  return (
    <Sidebar >
      <SidebarContent className="pt-8 bg-white/50 backdrop-blur-lg border-r border-white/30 shadow-lg">
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold text-foreground mb-4">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/assets/images/logoBlack2.png"
                alt="Home"
                className="h-16 w-auto"
              />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu className="mt-4 text space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.title === "Invoices" && pendingCount > 0 && (
                        <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                          {pendingCount}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/20 bg-white/30 backdrop-blur-md p-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full text-left rounded-lg hover:bg-white/60 p-2 transition flex items-center gap-3">
            <div className="h-10 w-10 min-h-10 min-w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold aspect-square">
              {initials}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">
                {user?.fullName || user?.firstName || "My Account"}
              </div>
              <div className="text-xs text-gray-600 truncate">
                {user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || ""}
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-700">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="ml-1">
                <SignOutButton redirectUrl="/" />
              </span>
              
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
