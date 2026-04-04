"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Bot,
  Briefcase,
  Cpu,
  KeyRound,
  Library,
  ListOrdered,
  Monitor,
  Play,
  Plug,
  Send,
  Shield,
  Users,
  Zap,
} from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "My Projects",
    items: [
      { key: "agents", label: "Agents", icon: Bot, href: "/agents" },
      { key: "aiModels", label: "AI Models", icon: Cpu, href: "/ai-models" },
      { key: "library", label: "Library", icon: Library, href: "/library" },
    ],
  },
  {
    label: "Orchestrator",
    items: [
      { key: "published", label: "Published", icon: Send, href: "/published" },
      { key: "machines", label: "Machines", icon: Monitor, href: "/machines" },
      { key: "queues", label: "Queues", icon: ListOrdered, href: "/queues" },
      { key: "triggers", label: "Triggers", icon: Zap, href: "/triggers" },
      { key: "jobs", label: "Jobs", icon: Briefcase, href: "/jobs" },
      {
        key: "executions",
        label: "Executions",
        icon: Play,
        href: "/executions",
      },
      { key: "vault", label: "Vault", icon: Shield, href: "/vault" },
      {
        key: "knowledgeBase",
        label: "Knowledge Base",
        icon: BookOpen,
        href: "/knowledge-base",
      },
      {
        key: "keyStore",
        label: "Key Store",
        icon: KeyRound,
        href: "/key-store",
      },
    ],
  },
  {
    label: "Admin",
    items: [
      { key: "tenant", label: "Tenant", icon: Users, href: "/tenant" },
      {
        key: "integrations",
        label: "Integrations",
        icon: Plug,
        href: "/integrations",
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" className="mt-14">
      <SidebarContent>
        {NAV_SECTIONS.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.href}>
                          <Icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
