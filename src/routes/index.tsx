import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, TrendingDown, Wallet, Receipt } from "lucide-react";
import { Sidebar } from "@/components/mate4/sidebar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MATE4 · Dashboard Financeiro e Contábil" },
      {
        name: "description",
        content:
          "Visão executiva de receitas, despesas, lucro líquido e créditos IBS/CBS no dashboard MATE4.",
      },
      { property: "og:title", content: "MATE4 · Dashboard Financeiro" },
      {
        property: "og:description",
        content:
          "Controle financeiro e contábil premium: fluxo de caixa, notas fiscais e compliance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const cards = [
  {
    label: "Receita Bruta",
    value: "R$ 4.812.300",
    delta: "+8,4% vs. mês anterior",
    up: true,
    icon: Wallet,
  },
  {
    label: "Despesas Operacionais",
    value: "R$ 2.938.150",
    delta: "-2,1% vs. mês anterior",
    up: false,
    icon: Receipt,
  },
  {
    label: "Créditos IBS/CBS",
    value: "R$ 386.940",
    delta: "+12,7% apurados",
    up: true,
    icon: TrendingUp,
  },
];

const data = [
  { m: "Jan", v: 1.72 },
  { m: "Fev", v: 1.88 },
  { m: "Mar", v: 1.64 },
  { m: "Abr", v: 2.05 },
  { m: "Mai", v: 2.24 },
  { m: "Jun", v: 2.11 },
  { m: "Jul", v: 2.46 },
  { m: "Ago", v: 2.38 },
  { m: "Set", v: 2.72 },
  { m: "Out", v: 2.9 },
  { m: "Nov", v: 3.14 },
  { m: "Dez", v: 3.42 },
];

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-6 py-8 md:px-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Visão executiva
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
              Dashboard Financeiro
            </h1>
          </div>
          <button className="rounded-lg bg-bronze px-5 py-2.5 text-sm font-bold text-bronze-foreground transition-opacity hover:opacity-90">
            Fechar Competência
          </button>
        </header>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => (
            <article
              key={c.label}
              className="rounded-xl border border-primary/60 bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {c.label}
                </p>
                <c.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="metric-value mt-4">{c.value}</p>
              <p
                className={
                  "mt-3 flex items-center gap-1.5 text-xs font-semibold " +
                  (c.up ? "text-primary" : "text-muted-foreground")
                }
              >
                {c.up ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                {c.delta}
              </p>
            </article>
          ))}

          <article className="rounded-xl border border-bronze bg-card p-5 shadow-[var(--shadow-premium)]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-bronze">Lucro Líquido</p>
              <TrendingUp className="h-4 w-4 text-bronze" />
            </div>
            <p className="metric-value mt-4 text-bronze">R$ 1.261.090</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-bronze">
              <TrendingUp className="h-3.5 w-3.5" />
              +14,9% margem de 26,2%
            </p>
          </article>
        </section>

        <section className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Evolução do Resultado</h2>
              <p className="text-sm text-muted-foreground">
                Receita líquida consolidada · em milhões (R$)
              </p>
            </div>
            <p className="metric-value text-primary">R$ 3,42M</p>
          </div>

          <div className="mt-6 h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: -18, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="mossFill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--primary)"
                      stopOpacity={0.45}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--primary)"
                      stopOpacity={0}
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
                  formatter={(v: number) => [`R$ ${v}M`, "Resultado"]}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fill="url(#mossFill)"
                  dot={false}
                  activeDot={{ r: 5, fill: "var(--primary)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}
