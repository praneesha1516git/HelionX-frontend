import { Settings, Zap } from "lucide-react";
import { Link, useLocation } from "react-router";
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
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { User as UserIcon, Settings as SettingsIcon, LogOut,ReceiptText,TriangleAlert } from "lucide-react";

// Menu items for admin navigation.
const items = [
  {
    title: "Solar Units",
    url: "/admin/solar-units",
    icon: <Zap className="w-8 h-8" size={32} />,
  },

   {
    title: "Invoices",
    url: "/admin/invoices",
    icon: <ReceiptText className="w-8 h-8" size={32} />,
  },
   {
    title: "Anomalies",
    url: "/admin/anomalies",
    icon: <TriangleAlert className="w-8 h-8" size={32} />,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: <Settings className="w-8 h-8" size={32} />,
  },
];

const AdminSideBarTab = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.url;

  return (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to={item.url}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export function AdminSidebar() {
  const { user } = useUser();
  const initials = (user?.firstName?.[0] || user?.lastName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0] || "?").toUpperCase();

  return (
    <Sidebar>
      <SidebarContent className="pt-8 ">
        <SidebarGroup>
          <SidebarGroupLabel className="text-4xl font-bold text-foreground">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/assets/images/logoBlack2.png"
                alt="Home"
                className="h-16 w-auto"
              />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-8 text space-y-2">
              {items.map((item) => (
                <AdminSideBarTab key={item.url} item={item} />
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
              <UserIcon className="h-4 w-4 mr-2" />
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
              <span className="ml-2">Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
