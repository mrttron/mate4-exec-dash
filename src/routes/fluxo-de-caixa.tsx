import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Sidebar } from "@/components/mate4/sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/fluxo-de-caixa")({
  head: () => ({
    meta: [
      { title: "MATE4 · Fluxo de Caixa" },
      {
        name: "description",
        content:
          "Acompanhe entradas, saídas e saldo disponível com a tabela de movimentações do MATE4.",
      },
      { property: "og:title", content: "MATE4 · Fluxo de Caixa" },
      {
        property: "og:description",
        content:
          "Entradas, saídas e saldo disponível em um painel financeiro premium.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FluxoDeCaixa,
});

const periods = ["Mês Atual", "Mês Passado", "Personalizado"];

const rows = [
  {
    date: "12/07/2026",
    desc: "Pagamento Serviço X",
    cat: "Prestação de Serviços",
    type: "Entrada" as const,
    value: "R$ 18.400,00",
  },
  {
    date: "10/07/2026",
    desc: "Assinatura Software",
    cat: "Tecnologia",
    type: "Saída" as const,
    value: "R$ 1.290,00",
  },
  {
    date: "08/07/2026",
    desc: "Compra de Material",
    cat: "Insumos",
    type: "Saída" as const,
    value: "R$ 4.730,00",
  },
  {
    date: "05/07/2026",
    desc: "Consultoria Contábil Mensal",
    cat: "Serviços Recorrentes",
    type: "Entrada" as const,
    value: "R$ 9.850,00",
  },
  {
    date: "02/07/2026",
    desc: "Folha de Pagamento",
    cat: "Pessoal",
    type: "Saída" as const,
    value: "R$ 12.180,00",
  },
];

function FluxoDeCaixa() {
  const [active, setActive] = useState("Mês Atual");
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleProcess = () => {
    setOpen(false);
    toast.success("Extrato importado com sucesso!", {
      duration: 3000,
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-6 py-10 md:px-12">
        <header className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-5">
            <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em]">
              Fluxo de Caixa
            </h1>
            <div className="flex flex-wrap gap-2">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => setActive(p)}
                  className={
                    "rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-colors " +
                    (active === p
                      ? "border-primary bg-primary/20 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground")
                  }
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            <Upload className="h-4 w-4" />
            + Importar OFX/CSV
          </Button>
        </header>

        <section className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-xl border-2 border-bronze bg-card p-6 shadow-[var(--shadow-premium)]">
            <p className="text-sm font-medium text-muted-foreground">
              Saldo Disponível
            </p>
            <p className="metric-value mt-5 text-bronze">R$ 24.530,00</p>
          </article>

          <article className="rounded-xl border border-primary/70 bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Receitas no Mês
            </p>
            <p className="metric-value mt-5 text-primary">R$ 48.123,00</p>
          </article>

          <article className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Despesas no Mês
            </p>
            <p className="metric-value mt-5 text-destructive">R$ 23.593,00</p>
          </article>
        </section>

        <section className="mt-8 rounded-xl border border-border bg-card p-7">
          <h2 className="text-lg font-bold">Movimentações</h2>
          <p className="text-sm text-muted-foreground">
            Lançamentos consolidados do período selecionado
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  {["Data", "Descrição", "Categoria", "Tipo"].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                  <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const isIn = r.type === "Entrada";
                  return (
                    <tr
                      key={r.date + r.desc}
                      className="border-b border-border/60 last:border-0"
                    >
                      <td className="whitespace-nowrap px-3 py-4 text-muted-foreground">
                        {r.date}
                      </td>
                      <td className="px-3 py-4 font-semibold">{r.desc}</td>
                      <td className="px-3 py-4 text-muted-foreground">{r.cat}</td>
                      <td className="px-3 py-4">
                        <span
                          className={
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold " +
                            (isIn
                              ? "bg-primary/20 text-primary-foreground"
                              : "bg-destructive/15 text-destructive")
                          }
                        >
                          {r.type}
                        </span>
                      </td>
                      <td
                        className={
                          "whitespace-nowrap px-3 py-4 text-right font-bold tabular-nums " +
                          (isIn ? "text-primary" : "text-destructive")
                        }
                      >
                        {isIn ? "+ " : "- "}
                        {r.value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-border bg-card sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold">
              Novo Lançamento
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Registre uma entrada ou saída no fluxo de caixa.
            </DialogDescription>
          </DialogHeader>

          <form
            className="mt-2 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input id="valor" placeholder="0,00" inputMode="decimal" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="data">Data</Label>
              <Input id="data" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select>
                <SelectTrigger id="categoria" className="w-full">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="servicos">Prestação de Serviços</SelectItem>
                  <SelectItem value="insumos">Insumos</SelectItem>
                  <SelectItem value="tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="pessoal">Pessoal</SelectItem>
                  <SelectItem value="impostos">Impostos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Input id="descricao" placeholder="Ex.: Pagamento Serviço X" />
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-primary font-bold text-primary-foreground hover:bg-primary/90"
              >
                Salvar Lançamento
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
