import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Prompt" },
  { href: "/spec", label: "Spec" },
  { href: "/builder", label: "Builder" },
  { href: "/export", label: "Export" }
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding: "24px" }}>
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ marginBottom: "12px" }}>Prompt-to-EA Builder</h1>
        <nav style={{ display: "flex", gap: "16px" }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
