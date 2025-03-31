import { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Delete, Download, MoreHorizontal, Pen, Loader2 } from "lucide-react";

import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";
import { Button } from "@workspace/ui/components/button";
import { Row } from "@tanstack/react-table";
import { Qrcode } from "./columns";
import { useRouter } from "nextjs-toploader/app";
import { deleteQrcode } from "@/actions/qrcodes";

export default function ActionComp({ row }: { row: Row<Qrcode> }) {
  const router = useRouter();
  const code = row.original.code;
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const downloadQR = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qrcode.png";
    link.click();
  };

  const handleDelete = async () => {
    setLoading(true);
    const { title, description, label } = await deleteQrcode(code);
    setLoading(false);

    toast(title, {
      description,
      action: {
        label,
        onClick: () => window.location.reload(),
      },
    });
    setOpen(false);
  };

  return (
    <div>
      <DropdownMenu
        open={open}
        onOpenChange={(isOpen) => {
          if (!loading) setOpen(isOpen);
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
          <DropdownMenuItem onClick={downloadQR}>
            <div ref={canvasRef} className="hidden">
              <QRCodeCanvas value={code} size={200} />
            </div>
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/manager/edit-qrcode?qrcode=${row.original.code}`)
            }
          >
            <Pen className="mr-2 h-4 w-4" />
            Edit QR Code Details
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={handleDelete}
            className="flex items-center"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Delete className="mr-2 h-4 w-4" />
            )}
            {loading ? "Deleting..." : "Delete QR Code"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
