"use client";
import { usePathname } from "next/navigation";

export default function Pathname() {
  const pathname = usePathname();
  const segment = pathname.split("/")[2];

  return segment
    ? segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
    : "";
}
