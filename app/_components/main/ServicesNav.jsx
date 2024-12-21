"use client";
import {
  ChevronDown,
  Cloud,
  CreditCard,
  Database,
  FileLock,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Server,
  Settings,
  User,
  UserPlus,
  Users,
  Webhook,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretDown } from "@phosphor-icons/react";

export function ServicesNav() {
  return (
    <div className="hidden md:block">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Services</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <FileLock />
              <span>Share File [Private]</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileLock />
              <span>Share File [Public]</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Webhook />
              <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Server />
              <span>Cloud API</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Database />
              <span>Cloud Storage</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
