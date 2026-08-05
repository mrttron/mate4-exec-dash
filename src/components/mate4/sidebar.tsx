import { Link } from "@tanstack/react-router";
import {
  ClipboardCheck,
  LayoutDashboard,
  ArrowLeftRight,
  FileText,
  ShieldCheck,
  Brain,
  Building2,
  Briefcase,
  Wallet,
  Receipt,
  Inbox,
} from "lucide-react";
import { QueenIcon } from "./queen-icon";
import { useUserRole } from "./user-role";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const items = [
  { title: "Central de Ações", url: "/central-de-acoes", icon: ClipboardCheck },
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Fluxo de Caixa", url: "/fluxo-de-caixa", icon: ArrowLeftRight },
  { title: "Notas Fiscais", url: "/notas-fiscais", icon: FileText },
  { title: "Compliance", url: "/compliance", icon: ShieldCheck },
  { title: "Inteligência IBS/CBS", url: "/inteligencia-ibs-cbs", icon: Brain },
];

const adminItems = [
  { title: "Painel do Contador", url: "/painel-contador", icon: Briefcase },
];

const empresas = [
  { id: "tech-solutions", nome: "Tech Solutions LTDA" },
  { id: "mate-holding", nome: "MATE4 Holding" },
  { id: "consultoria-beta", nome: "Consultoria Beta ME" },
];

export function Sidebar() {
  const { userRole } = useUserRole();
  const navItems =
    userRole === "admin" ? [...items, ...adminItems] : items;

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-5 py-8 md:flex">
      <div className="px-2">
        <div className="flex items-center gap-2.5">
          <QueenIcon className="h-7 w-7 text-primary" />
          <span className="text-xl font-extrabold tracking-tight text-primary">
            MATE4
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
        <Select defaultValue={empresas[0].id}>
          <SelectTrigger
            className="h-9 w-full min-w-0 flex-1 border-border bg-card text-sm font-medium text-foreground transition-colors hover:border-primary/70 focus:ring-0 focus:ring-offset-0 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:truncate"
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Menu do usuário"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              JD
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="min-w-40 rounded-xl border-border bg-card text-foreground"
          >
            <DropdownMenuItem className="cursor-pointer text-foreground focus:bg-primary/20 focus:text-foreground">
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-foreground focus:bg-primary/20 focus:text-foreground">
              Sair da Conta
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>



      <nav className="mt-10 flex flex-col gap-1.5">
        {navItems.map((item) => (
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
