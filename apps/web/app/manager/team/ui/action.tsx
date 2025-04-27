import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { MoreHorizontal, Trash, TrendingDown, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Account } from "./columns";
import { changeRole, deleteUser } from "@/actions/team";

export const ActionComp = ({ row }: { row: Row<Account> }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { role } = row.original;
  const handleUserState = async () => {
    setLoading(true);
    const { title, description, label } = await deleteUser(row.original.userId);
    toast(title, {
      description,
      action: {
        label,
        onClick: () => window.location.reload(),
      },
    });
    setLoading(false);
    setOpen(false);
  };
  const handleUserRole = async (toPromote: boolean) => {
    setLoading(true);
    const { title, description, label } = await changeRole(
      row.original.userId,
      toPromote,
    );

    toast(title, {
      description,
      action: {
        label,
        onClick: () => window.location.reload(),
      },
    });
    setLoading(false);
    setOpen(false);
  };
  return (
    <DropdownMenu
      open={open}
      onOpenChange={(e) => {
        if (!loading) setOpen(e);
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={true} onClick={() => handleUserRole(true)}>
          <TrendingUp />
          Promote
        </DropdownMenuItem>
        <DropdownMenuItem disabled={true} onClick={() => handleUserRole(false)}>
          <TrendingDown />
          Demote
        </DropdownMenuItem>
        <DropdownMenuItem disabled={true} onClick={handleUserState}>
          <Trash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
