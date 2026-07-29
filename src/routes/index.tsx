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
import { TrendingUp, TrendingDown, Wallet, Receipt, Coins } from "lucide-react";
import { Sidebar } from "@/components/mate4/sidebar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MATE4 · Dashboard Financeiro e Contábil" },
      {
        name: "description",
        content:
          "Visão executiva de receitas, despesas, lucro líquido e saldo IBS/CBS no dashboard MATE4.",
      },
      { property: "og:title", content: "MATE4 · Dashboard Financeiro" },
      {
        property: "og:description",
        content:
          "Controle financeiro e contábil premium: fluxo de caixa, notas fiscais e economia tributária IBS/CBS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

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

      <main className="flex-1 px-6 py-10 md:px-12">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em]">
              Visão Executiva
            </h1>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              Exercício fiscal 2026 · Regime Simples Nacional
            </p>
          </div>
          <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90">
            Fechar Competência
          </button>
        </header>

        <section className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {/* Receita Bruta */}
          <article className="rounded-xl border border-primary/70 bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Receita Bruta
              </p>
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <p className="metric-value mt-5">R$ 48.123,00</p>
            <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary">
              <TrendingUp className="h-3.5 w-3.5" />
              +8,4% vs. mês anterior
            </p>
          </article>

          {/* Despesas Operacionais */}
          <article className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Despesas Operacionais
              </p>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="metric-value mt-5">R$ 29.381,00</p>
            <p className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <TrendingDown className="h-3.5 w-3.5" />
              -2,1% vs. mês anterior
            </p>
          </article>

          {/* Saldo IBS/CBS — carro-chefe */}
          <article className="rounded-xl border-2 border-bronze bg-card p-6 shadow-[var(--shadow-premium)]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-wider text-bronze">
                Saldo IBS/CBS
              </p>
              <Coins className="h-4 w-4 text-bronze" />
            </div>

            <div className="mt-6 space-y-4">
              {/* Linha 1 — Obrigação */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Débitos ( sobre Vendas )</span>
                <span className="font-semibold text-foreground">R$ 5.200</span>
              </div>

              {/* Linha 2 — Economia/Ativo */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Créditos ( sobre Compras )</span>
                <span className="font-bold text-bronze">R$ 7.500</span>
              </div>
            </div>

            {/* Linha 3 — Resultado */}
            <div className="mt-5 border-t border-border pt-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Saldo Credor a Compensar</span>
                <span className="metric-value text-primary">R$ 2.300</span>
              </div>
            </div>
          </article>

          {/* Lucro Líquido */}
          <article className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Lucro Líquido
              </p>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="metric-value mt-5">R$ 12.610,00</p>
            <p className="mt-4 text-xs font-semibold text-muted-foreground">
              Margem: 26,2%
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-xl border border-border bg-card p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Evolução do Resultado</h2>
              <p className="text-sm text-muted-foreground">
                Faturamento consolidado · em milhões (R$)
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Acumulado
              </p>
              <p className="metric-value mt-1 text-primary">R$ 3,42M</p>
            </div>
          </div>

          <div className="mt-8 h-[340px] w-full">
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
                  formatter={(v: number) => [`R$ ${v}M`, "Faturamento"]}
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
