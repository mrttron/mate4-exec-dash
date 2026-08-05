import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  FileWarning,
  ShieldAlert,
  FolderX,
  CalendarClock,
} from "lucide-react";
import { Sidebar } from "@/components/mate4/sidebar";
import { useUserRole } from "@/components/mate4/user-role";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/central-do-contador")({
  head: () => ({
    meta: [
      { title: "MATE4 · Central do Contador" },
      {
        name: "description",
        content:
          "Visão geral de alertas fiscais de todas as empresas da carteira do contador.",
      },
      { property: "og:title", content: "MATE4 · Central do Contador" },
      {
        property: "og:description",
        content:
          "Acompanhe pendências, certificados e guias de toda a carteira em um só lugar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CentralDoContador,
});

const resumo = [
  { label: "Notas Pendentes (Geral)", valor: "12", icon: FileWarning },
  { label: "Certificados Vencendo", valor: "3", icon: ShieldAlert },
  { label: "Documentos Faltantes", valor: "8", icon: FolderX },
  { label: "Guias a Vencer", valor: "5", icon: CalendarClock },
];

const alertas = [
  {
    empresa: "Tech Solutions",
    descricao:
      "Recebimento de R$ 5.000 sem nota fiscal vinculada há 3 dias.",
  },
  {
    empresa: "MATE4 Holding",
    descricao:
      "Certificado digital A1 vence em 12 dias (27/08/2026). Solicite a renovação.",
  },
  {
    empresa: "Consultoria Beta ME",
    descricao:
      "Comprovante de aluguel de julho ainda não enviado pelo cliente.",
  },
  {
    empresa: "Alfa Comércio EIRELI",
    descricao: "Guia DAS de R$ 3.410,00 vence em 2 dias e segue em aberto.",
  },
  {
    empresa: "Nova Era Serviços",
    descricao:
      "7 transações do extrato importado seguem sem categorização fiscal.",
  },
];

function CentralDoContador() {
  const { userRole } = useUserRole();

  if (userRole !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <ShieldAlert className="mx-auto h-8 w-8 text-muted-foreground" />
          <h1 className="mt-4 text-lg font-bold text-foreground">
            Acesso restrito
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Esta área é exclusiva para contadores. Entre com uma conta de
            administrador para continuar.
          </p>
          <Button asChild className="mt-6 bg-primary hover:bg-primary/90">
            <Link to="/login">Ir para o login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-6 py-10 md:px-12">
        <header className="flex items-center gap-3">
          <Briefcase className="h-7 w-7 text-primary" />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Central do Contador
            </h1>
            <p className="text-sm text-muted-foreground">
              Alertas consolidados de todas as empresas da carteira
            </p>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {resumo.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-primary/40 bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {item.label}
                </p>
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="metric-value mt-3 text-foreground">{item.valor}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Alertas da carteira
          </h2>

          {alertas.map((alerta) => (
            <div
              key={alerta.empresa}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <span className="w-fit rounded-full border border-accent/50 bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                  {alerta.empresa}
                </span>
                <p className="text-sm text-foreground">{alerta.descricao}</p>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-fit shrink-0 border-primary/60 bg-transparent text-foreground hover:bg-primary/20"
              >
                <Link to="/painel-contador">Ver Empresa</Link>
              </Button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
