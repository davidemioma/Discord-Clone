"use client";

import React from "react";
import { ServerProps } from "@/types";
import { Role } from "@prisma/client";
import useInviteModal from "@/hooks/use-invite-modal";
import useEditServerModal from "@/hooks/use-edit-server-modal";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

interface Props {
  server: ServerProps;
  role?: Role;
}

const ServerHeader = ({ server, role }: Props) => {
  const isAdmin = role === Role.ADMIN;

  const isModerator = isAdmin || role === Role.MODERATOR;

  const inviteModal = useInviteModal();

  const editServerModal = useEditServerModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full font-semibold h-12 flex items-center px-3 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}

          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 text-black dark:text-neutral-400 text-xs font-medium space-y-2">
        {isModerator && (
          <DropdownMenuItem
            className="px-3 py-2 text-indigo-600 dark:text-indigo-400 text-sm cursor-pointer"
            onClick={() => inviteModal.onOpen({ server })}
          >
            Invite People
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-sm cursor-pointer"
            onClick={() => editServerModal.onOpen({ server })}
          >
            Server Settings
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-sm cursor-pointer"
            onClick={() => {}}
          >
            Manage Members
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem
            className="px-3 py-2 text-sm cursor-pointer"
            onClick={() => {}}
          >
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {isModerator && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-rose-500 text-sm cursor-pointer"
            onClick={() => {}}
          >
            Delete Server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}

        {!isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-rose-500 text-sm cursor-pointer"
            onClick={() => {}}
          >
            Leave Server
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
