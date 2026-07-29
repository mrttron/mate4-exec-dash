import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ArrowLeftRight,
  FileText,
  Percent,
  ShieldCheck,
} from "lucide-react";
import { QueenIcon } from "./queen-icon";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Fluxo de Caixa", url: "/", icon: ArrowLeftRight },
  { title: "Notas Fiscais", url: "/", icon: FileText },
  { title: "Créditos IBS/CBS", url: "/", icon: Percent },
  { title: "Compliance", url: "/", icon: ShieldCheck },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-6 md:flex">
      <div className="flex items-center gap-2.5 px-2">
        <QueenIcon className="h-7 w-7 text-primary" />
        <span className="text-xl font-extrabold tracking-tight text-primary">
          MATE4
        </span>
      </div>

      <nav className="mt-10 flex flex-col gap-1">
        {items.map((item, i) => (
          <Link
            key={item.title}
            to={item.url}
            className={
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors " +
              (i === 0
                ? "bg-primary/20 text-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground")
            }
          >
            <item.icon className="h-4.5 w-4.5" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="mt-auto rounded-xl border border-border bg-background/40 p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Exercício fiscal
        </p>
        <p className="mt-1 text-sm font-bold">2026 · Regime Lucro Real</p>
      </div>
    </aside>
  );
}
