import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  ShieldAlert,
  ArrowUpRight,
  Users,
  Receipt,
  TrendingUp,
  UserMinus,
  Activity,
  AlertCircle,
  Circle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Sidebar } from "@/components/mate4/sidebar";
import { useUserRole } from "@/components/mate4/user-role";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard-mate4")({
  head: () => ({
    meta: [
      { title: "MATE4 · Visão do Escritório" },
      {
        name: "description",
        content:
          "Dashboard executivo do escritório MATE4: MRR, clientes ativos, churn e alertas críticos.",
      },
      { property: "og:title", content: "MATE4 · Visão do Escritório" },
      {
        property: "og:description",
        content:
          "Métricas de agosto/2026: receita recorrente, saúde operacional e ações prioritárias.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardMate4,
});

const mrrData = [
  { m: "Mar", v: 24.8 },
  { m: "Abr", v: 26.2 },
  { m: "Mai", v: 27.5 },
  { m: "Jun", v: 29.1 },
  { m: "Jul", v: 30.6 },
  { m: "Ago", v: 32.4 },
];

const alertas = [
  {
    empresa: "Empresa X",
    descricao: "Não pagou a mensalidade há 15 dias.",
  },
  {
    empresa: "Empresa Y",
    descricao: "Cancelou o contrato neste mês.",
  },
  {
    empresa: "Empresa Z",
    descricao: "Não acessa a plataforma há 45 dias.",
  },
];

function DashboardMate4() {
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
            Esta área é exclusiva para administradores do escritório MATE4.
            Entre com uma conta de administrador para continuar.
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
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em]">
              Visão do Escritório
            </h1>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              Métricas de agosto/2026
            </p>
          </div>
          <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90">
            Exportar Relatório
          </button>
        </header>

        {/* Linha 1 — Grandes Números */}
        <section className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Receita Recorrente (MRR)
              </p>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="metric-value mt-5 text-bronze">R$ 32.400</p>
            <p className="mt-1 text-xs text-muted-foreground">Assinaturas ativas</p>
            <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +12% vs mês anterior
            </p>
          </article>

          <article className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Clientes Ativos
              </p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="metric-value mt-5">42</p>
            <p className="mt-1 text-xs text-muted-foreground">Empresas na carteira</p>
          </article>

          <article className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Ticket Médio
              </p>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="metric-value mt-5">R$ 771</p>
            <p className="mt-1 text-xs text-muted-foreground">Média por cliente</p>
          </article>

          <article className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Margem de Lucro
              </p>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="metric-value mt-5 text-primary">68%</p>
            <p className="mt-1 text-xs text-muted-foreground">Sobre a receita</p>
          </article>
        </section>

        {/* Linha 2 — Saúde e Operação */}
        <section className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Churn (Cancelamentos)
              </p>
              <UserMinus className="h-4 w-4 text-destructive" />
            </div>
            <p className="metric-value mt-5 text-destructive">2,1%</p>
            <p className="mt-1 text-xs text-muted-foreground">Clientes perdidos no mês</p>
          </article>

          <article className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Adesão à Plataforma
              </p>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <p className="metric-value mt-5 text-primary">85%</p>
            <p className="mt-1 text-xs text-muted-foreground">Clientes que logaram no mês</p>
          </article>

          <article className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Inadimplência
              </p>
              <AlertCircle className="h-4 w-4 text-warning" />
            </div>
            <p className="metric-value mt-5 text-warning">R$ 1.800</p>
            <p className="mt-1 text-xs text-muted-foreground">Atrasados na mensalidade</p>
          </article>
        </section>

        {/* Linha 3 — Gráfico e Ações */}
        <section className="mt-6 grid gap-6 xl:grid-cols-3">
          <article className="rounded-xl border border-border bg-card p-7 xl:col-span-2">
            <div className="mb-6">
              <h2 className="text-lg font-bold">Evolução do MRR</h2>
              <p className="text-sm text-muted-foreground">
                Receita recorrente mensal · em milhares (R$)
              </p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mrrData} margin={{ left: -18, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="mrrMoss" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="var(--primary)"
                        stopOpacity={0.85}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--primary)"
                        stopOpacity={0.45}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="m"
                    stroke="var(--muted-foreground)"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      color: "var(--popover-foreground)",
                      fontSize: 12,
                    }}
                    formatter={(v: number) => [`R$ ${v}k`, "MRR"]}
                  />
                  <Bar
                    dataKey="v"
                    fill="url(#mrrMoss)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-xl border border-border bg-card p-7">
            <h2 className="text-lg font-bold">Alertas Críticos</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ações que precisam da sua atenção
            </p>
            <ul className="mt-6 space-y-4">
              {alertas.map((alerta, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Circle className="mt-1 h-2.5 w-2.5 shrink-0 fill-destructive text-destructive" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {alerta.empresa}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {alerta.descricao}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="mt-6 w-full border-border text-foreground hover:bg-primary/20 hover:text-foreground"
            >
              Ver todos os alertas
            </Button>
          </article>
        </section>
      </main>
    </div>
  );
}
