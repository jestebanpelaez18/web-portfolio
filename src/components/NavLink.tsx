"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
};

/** Header link that marks the current section (the page itself or any page under it). */
export const NavLink = ({ href, className, activeClassName, children }: NavLinkProps) => {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={classNames(className, active && activeClassName)}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
};
