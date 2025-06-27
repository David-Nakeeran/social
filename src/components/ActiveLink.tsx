"use client";

import { ActiveLinkProps } from "@/types/dataTypes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({ href, children }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={
        isActive
          ? "text-[#22c55e] border-b border-[#22c55e] pb-1"
          : "text-[#ededed] border-b border-transparent hover:text-[#22c55e] hover:border-[#22c55e] transition-colors pb-1"
      }
    >
      {children}
    </Link>
  );
}
