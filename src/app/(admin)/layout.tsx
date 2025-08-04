"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  Newspaper,
  Paintbrush,
  Settings,
  ShoppingBag,
  Users,
  PanelLeft,
  BotMessageSquare,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path || (path !== "/dashboard" && pathname.startsWith(path));

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className="p-2">
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 3L4 7v10l8 4 8-4V7l-8-4z" />
                  <path d="M4 7l8 4 8-4" />
                  <path d="M12 21V11" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">
                NextPress
              </span>
            </Link>
          </SidebarHeader>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard")}
                tooltip="Dashboard"
              >
                <Link href="/dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/content")}
                tooltip="Content"
              >
                <Link href="/content/posts">
                  <Newspaper />
                  <span>Content</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive('/content/posts')}>
                    <Link href="/content/posts">Posts</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                   <SidebarMenuSubButton asChild isActive={isActive('/content/pages')}>
                    <Link href="/content/pages">Pages</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                 <SidebarMenuSubItem>
                   <SidebarMenuSubButton asChild isActive={isActive('/content/editor/new')}>
                    <Link href="/content/editor/new">AI Editor</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/marketplace")}
                tooltip="Marketplace"
              >
                <Link href="/marketplace/themes">
                  <ShoppingBag />
                  <span>Marketplace</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuSub>
                 <SidebarMenuSubItem>
                   <SidebarMenuSubButton asChild isActive={isActive('/marketplace/themes')}>
                    <Link href="/marketplace/themes">Themes</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={isActive('/marketplace/plugins')}>
                    <Link href="/marketplace/plugins">Plugins</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/settings")}
                tooltip="Settings"
              >
                <Link href="/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="justify-start gap-2 w-full px-2">
                         <Avatar className="h-8 w-8">
                            <AvatarImage src="https://placehold.co/40x40" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                            <p className="text-sm font-medium text-sidebar-foreground">Admin</p>
                            <p className="text-xs text-muted-foreground">admin@nextpress.dev</p>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Admin</p>
                        <p className="text-xs leading-none text-muted-foreground">
                        admin@nextpress.dev
                        </p>
                    </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
                {/* Header content can go here, like breadcrumbs or a search bar */}
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8">
                <BotMessageSquare className="h-4 w-4" />
                <span className="sr-only">AI Assistant</span>
            </Button>
        </header>
        <main className="flex-1 p-4 lg:p-6 bg-background">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
