import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-200 ease-out";

  const styles = {
    primary:
      "bg-creativo-magenta text-white hover:opacity-90",
    secondary:
      "border border-creativo-border text-creativo-dark hover:border-creativo-magenta hover:text-creativo-magenta",
  };

  return (
    <Link href={href} className={`${base} ${styles[variant]}`}>
      {children}
    </Link>
  );
}
