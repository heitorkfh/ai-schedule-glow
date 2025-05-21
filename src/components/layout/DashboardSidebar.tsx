
import { useLocation } from "react-router-dom";
import { 
  Calendar,
  Home, 
  Users, 
  FileText, 
  Settings,
  Activity,
  MessageSquare,
  Radio,
  Mail,
  Tool,
  ChevronDown,
  ChevronRight
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
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  
  const [isMarketingOpen, setIsMarketingOpen] = useState(() => {
    return currentPath.startsWith('/marketing');
  });

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
  
  const marketingItems = [
    { title: "Leads", path: "/marketing/leads", icon: Users },
    { title: "Disparos", path: "/marketing/disparos", icon: Mail },
    { title: "Ferramentas", path: "/marketing/ferramentas", icon: Tool },
    { title: "Configurações", path: "/marketing/configuracoes", icon: Settings },
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
    <Sidebar className={`border-r ${isCollapsed ? "w-16" : "w-64"}`}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.path} end={item.path === "/"} className={getNavClasses}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>IA & Análises</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.path} className={getNavClasses}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Marketing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                {!isCollapsed ? (
                  <Collapsible 
                    open={isMarketingOpen} 
                    onOpenChange={setIsMarketingOpen}
                    className="w-full"
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground">
                      <div className="flex items-center gap-3">
                        <Radio className="h-4 w-4 shrink-0" />
                        <span>Marketing</span>
                      </div>
                      {isMarketingOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-3 mt-1">
                      <SidebarMenuSub>
                        {marketingItems.map((item) => (
                          <SidebarMenuSubItem key={item.path}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActive(item.path)}
                            >
                              <NavLink to={item.path} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4 shrink-0" />
                                <span>{item.title}</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuButton asChild tooltip="Marketing">
                    <NavLink 
                      to="/marketing/leads" 
                      className={getNavClasses}
                    >
                      <Radio className="h-4 w-4 shrink-0" />
                    </NavLink>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
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
                    {!isCollapsed && <span>Configurações</span>}
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
