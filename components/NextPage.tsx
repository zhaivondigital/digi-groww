"use client";

/* "Next page: About Us →" teaser in the footer, cycling through the main pages. */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/site";

export default function NextPage() {
  const pathname = usePathname();
  const i = NAV.findIndex((n) => n.href === pathname);
  const next = NAV[(i + 1) % NAV.length];
  return (
    <Link className="next-page" href={next.href}>
      Next page <b>{next.label} →</b>
    </Link>
  );
}
