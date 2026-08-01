import { createFileRoute } from "@tanstack/react-router";
import { Brain, TrendingUp, TrendingDown } from "lucide-react";
import { Sidebar } from "@/components/mate4/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/inteligencia-ibs-cbs")({
  head: () => ({
    meta: [
      { title: "MATE4 · Inteligência IBS/CBS" },
      {
        name: "description",
        content:
          "Análise inteligente dos créditos e débitos de IBS/CBS ao longo do ano.",
      },
      { property: "og:title", content: "MATE4 · Inteligência IBS/CBS" },
      {
        property: "og:description",
        content:
          "Inteligência tributária para acompanhar créditos, débitos e saldo do regime dual.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InteligenciaIBSCBS,
});

const historico = [
  { mes: "Jan/2026", faturamento: 42000, compras: 28000, saldo: 2000 },
  { mes: "Fev/2026", faturamento: 39000, compras: 31000, saldo: -800 },
  { mes: "Mar/2026", faturamento: 45000, compras: 27000, saldo: 3600 },
  { mes: "Abr/2026", faturamento: 47000, compras: 30000, saldo: 2700 },
  { mes: "Mai/2026", faturamento: 51000, compras: 33000, saldo: 3000 },
  { mes: "Jun/2026", faturamento: 48000, compras: 29500, saldo: 1825 },
  { mes: "Jul/2026", faturamento: 53000, compras: 34000, saldo: 2400 },
  { mes: "Ago/2026", faturamento: 55000, compras: 32000, saldo: 4550 },
  { mes: "Set/2026", faturamento: 52000, compras: 35000, saldo: 1950 },
  { mes: "Out/2026", faturamento: 58000, compras: 36500, saldo: 2750 },
  { mes: "Nov/2026", faturamento: 60000, compras: 38000, saldo: 3000 },
  { mes: "Dez/2026", faturamento: 62000, compras: 41000, saldo: 2500 },
];

const totalCreditos = historico
  .filter((h) => h.saldo > 0)
  .reduce((acc, h) => acc + h.saldo, 0);

const totalDebitos = historico
  .filter((h) => h.saldo < 0)
  .reduce((acc, h) => acc + Math.abs(h.saldo), 0);

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function InteligenciaIBSCBS() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-6 py-10 md:px-12">
        <header>
          <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em]">
            Inteligência IBS/CBS
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Acompanhamento anual de créditos e débitos do regime dual
          </p>
        </header>

        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          <article className="rounded-xl border-2 border-[#CD7F32] bg-card p-6 shadow-[0_0_20px_rgba(205,127,50,0.12)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Créditos Ano
                </p>
                <p className="mt-2 text-3xl font-extrabold text-[#CD7F32]">
                  {formatCurrency(totalCreditos)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#CD7F32]/10">
                <TrendingUp className="h-6 w-6 text-[#CD7F32]" />
              </div>
            </div>
          </article>

          <article className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Débitos Ano
                </p>
                <p className="mt-2 text-3xl font-extrabold text-[#F2F0EB]">
                  {formatCurrency(totalDebitos)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background">
                <TrendingDown className="h-6 w-6 text-[#F2F0EB]" />
              </div>
            </div>
          </article>
        </section>

        <section className="mt-10 rounded-xl border border-border bg-card p-6">
          <div className="mb-5 flex items-center gap-3">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              Histórico Mensal
            </h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Mês</TableHead>
                  <TableHead className="text-right text-muted-foreground">
                    Faturamento
                  </TableHead>
                  <TableHead className="text-right text-muted-foreground">
                    Compras
                  </TableHead>
                  <TableHead className="text-right text-muted-foreground">
                    Saldo
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historico.map((row) => (
                  <TableRow
                    key={row.mes}
                    className="border-border hover:bg-primary/5"
                  >
                    <TableCell className="font-medium text-foreground">
                      {row.mes}
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {formatCurrency(row.faturamento)}
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {formatCurrency(row.compras)}
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${
                        row.saldo >= 0 ? "text-[#4A5D23]" : "text-[#F2F0EB]"
                      }`}
                    >
                      {formatCurrency(row.saldo)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </div>
  );
}
