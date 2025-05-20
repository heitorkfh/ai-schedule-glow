
import { useLocation } from "react-router-dom";
import { 
  Calendar,
  Home, 
  Users, 
  FileText, 
  Settings,
  Activity,
  MessageSquare
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";

const DashboardSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const mainItems = [
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Agendamentos", path: "/agendamentos", icon: Calendar },
    { title: "Pacientes", path: "/pacientes", icon: Users },
    { title: "Prontuários", path: "/prontuarios", icon: FileText },
  ];

  const aiItems = [
    { title: "Assistente IA", path: "/assistente-ia", icon: MessageSquare },
    { title: "Análises", path: "/analises", icon: Activity },
  ];

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClasses = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
      isActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
    }`;
  };
  
  const isMainExpanded = mainItems.some(item => isActive(item.path));
  const isAiExpanded = aiItems.some(item => isActive(item.path));

  return (
    <Sidebar className={`border-r ${collapsed ? "w-16" : "w-64"}`} collapsible>
      <SidebarContent>
        <SidebarGroup defaultOpen={isMainExpanded}>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.path} end={item.path === "/"} className={getNavClasses}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup defaultOpen={isAiExpanded} className="mt-4">
          <SidebarGroupLabel>IA & Análises</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.path} className={getNavClasses}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/configuracoes" className={getNavClasses}>
                    <Settings className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Configurações</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
