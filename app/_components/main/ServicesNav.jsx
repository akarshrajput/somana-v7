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
import { Circle, Sparkle } from "@phosphor-icons/react/dist/ssr";

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
              <span className="font-medium cursor-pointer w-full">
                Anon Share
              </span>
              <p className="ml-auto">
                <Circle weight="fill" />
              </p>
            </DropdownMenuItem>

            {/* <DropdownMenuItem>
              <Database />
              <span className="font-medium cursor-pointer w-full">
                Cloud Storage
              </span>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
