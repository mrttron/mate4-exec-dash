import { Link, useRouterState } from "@tanstack/react-router";
import {
  ClipboardCheck,
  LayoutDashboard,
  ArrowLeftRight,
  FileText,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { QueenIcon } from "./queen-icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  { title: "Central de Ações", url: "/central-de-acoes", icon: ClipboardCheck },
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Fluxo de Caixa", url: "/fluxo-de-caixa", icon: ArrowLeftRight },
  { title: "Notas Fiscais", url: "/notas-fiscais", icon: FileText },
  { title: "Compliance", url: "/compliance", icon: ShieldCheck },
];

const empresas = [
  { id: "tech-solutions", nome: "Tech Solutions LTDA" },
  { id: "mate-holding", nome: "MATE4 Holding" },
  { id: "consultoria-beta", nome: "Consultoria Beta ME" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-5 py-8 md:flex">
      <div className="px-2">
        <div className="flex items-center gap-2.5">
          <QueenIcon className="h-7 w-7 text-primary" />
          <span className="text-xl font-extrabold tracking-tight text-primary">
            MATE4
          </span>
        </div>

        <Select defaultValue={empresas[0].id}>
          <SelectTrigger
            className="mt-4 h-9 w-full border-border bg-card text-sm font-medium text-foreground transition-colors hover:border-primary/70 focus:ring-0 focus:ring-offset-0 [&>span]:flex [&>span]:items-center [&>span]:gap-2"
            aria-label="Selecionar empresa"
          >
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Selecionar empresa" />
          </SelectTrigger>
          <SelectContent className="border-border bg-card text-foreground">
            {empresas.map((empresa) => (
              <SelectItem
                key={empresa.id}
                value={empresa.id}
                className="cursor-pointer focus:bg-primary/20 focus:text-foreground"
              >
                {empresa.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <nav className="mt-10 flex flex-col gap-1.5">
        {items.map((item) => (
          <Link
            key={item.title}
            to={item.url}
            activeOptions={{ exact: true }}
            activeProps={{ className: "bg-primary/20 text-foreground" }}
            inactiveProps={{
              className:
                "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
            }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
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
        <p className="mt-1 text-sm font-bold">2026 · Simples Nacional</p>
      </div>
    </aside>
  );
}
