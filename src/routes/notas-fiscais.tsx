import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Eye, Download } from "lucide-react";
import { Sidebar } from "@/components/mate4/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/notas-fiscais")({
  head: () => ({
    meta: [
      { title: "MATE4 · Notas Fiscais de Serviço" },
      {
        name: "description",
        content:
          "Emita e acompanhe NFS-e, impostos retidos e split payment automatizado no painel MATE4.",
      },
      { property: "og:title", content: "MATE4 · Notas Fiscais de Serviço" },
      {
        property: "og:description",
        content:
          "Controle de NFS-e com status de pagamento, imposto retido e emissão automatizada.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotasFiscais,
});

const filters = ["Todas", "Pendentes", "Pagas"] as const;

type Nota = {
  numero: string;
  cliente: string;
  nota?: string;
  servico: string;
  valor: string;
  status: "Paga" | "Pendente";
};

const notas: Nota[] = [
  {
    numero: "NFS-e 001248",
    cliente: "Vector Log Ltda.",
    nota: "Split Payment realizado",
    servico: "Consultoria tributária mensal",
    valor: "R$ 12.400,00",
    status: "Paga",
  },
  {
    numero: "NFS-e 001247",
    cliente: "Aurora Participações S.A.",
    nota: "Imposto retido na fonte",
    servico: "Assessoria contábil corporativa",
    valor: "R$ 9.850,00",
    status: "Paga",
  },
  {
    numero: "NFS-e 001246",
    cliente: "Studio Meridiano ME",
    servico: "Implantação de rotina fiscal",
    valor: "R$ 7.320,00",
    status: "Pendente",
  },
  {
    numero: "NFS-e 001245",
    cliente: "Nordeste Alimentos Ltda.",
    nota: "Split Payment realizado",
    servico: "Apuração IBS/CBS e obrigações acessórias",
    valor: "R$ 10.100,00",
    status: "Paga",
  },
  {
    numero: "NFS-e 001244",
    cliente: "Praia Nova Turismo",
    nota: "Imposto retido na fonte",
    servico: "Planejamento tributário anual",
    valor: "R$ 8.453,00",
    status: "Pendente",
  },
];

function NotasFiscais() {
  const [active, setActive] = useState<(typeof filters)[number]>("Todas");
  const [open, setOpen] = useState(false);
  const [prefilledValor, setPrefilledValor] = useState("");


  const visible = notas.filter((n) =>
    active === "Todas"
      ? true
      : active === "Pagas"
        ? n.status === "Paga"
        : n.status === "Pendente",
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-6 py-10 md:px-12">
        <header className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-5">
            <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em]">
              Notas Fiscais de Serviço
            </h1>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={
                    "rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-colors " +
                    (active === f
                      ? "border-primary bg-primary/20 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground")
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => {
              setPrefilledValor("");
              setOpen(true);
            }}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Emitir NFS-e
          </Button>
        </header>

        <section className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Total Emitidas
            </p>
            <p className="metric-value mt-5 text-foreground">R$ 48.123,00</p>
          </article>

          <article className="rounded-xl border border-primary/70 bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Total Recebido
            </p>
            <p className="metric-value mt-5 text-primary">R$ 38.500,00</p>
          </article>

          <article className="rounded-xl border-2 border-bronze bg-card p-6 shadow-[var(--shadow-premium)]">
            <p className="text-sm font-medium text-muted-foreground">
              Imposto Retido
            </p>
            <p className="metric-value mt-5 text-bronze">R$ 4.812,00</p>
          </article>
        </section>

        <div className="mt-8 flex items-center justify-between gap-4 rounded-xl border border-warning bg-warning/10 p-5">
          <p className="text-sm text-foreground">
            💰 Recebimento de R$ 5.000,00 identificado no fluxo de caixa, mas sem nota fiscal vinculada.
          </p>
          <Button
            onClick={() => {
              setPrefilledValor("5000.00");
              setOpen(true);
            }}
            className="shrink-0 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90"
          >
            Pré-preencher Nota
          </Button>
        </div>

        <section className="mt-6 rounded-xl border border-border bg-card p-7">
          <h2 className="text-lg font-bold">Notas emitidas</h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe status de recebimento e retenções automatizadas
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  {["Nº da Nota", "Cliente", "Descrição do Serviço"].map((h) => (
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
                  <th className="px-3 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Status
                  </th>
                  <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((n) => (
                  <tr
                    key={n.numero}
                    className="border-b border-border/60 last:border-0"
                  >
                    <td className="whitespace-nowrap px-3 py-4 font-semibold tabular-nums text-muted-foreground">
                      {n.numero}
                    </td>
                    <td className="px-3 py-4">
                      <span className="font-semibold">{n.cliente}</span>
                      {n.nota && (
                        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-bronze">
                          {n.nota}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-muted-foreground">
                      {n.servico}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-right font-bold tabular-nums">
                      {n.valor}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={
                          "inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold " +
                          (n.status === "Paga"
                            ? "bg-primary/25 text-foreground"
                            : "bg-warning/15 text-warning")
                        }
                      >
                        {n.status}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center justify-end gap-3 text-muted-foreground">
                        <button
                          aria-label={`Visualizar ${n.numero}`}
                          className="transition-colors hover:text-foreground"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          aria-label={`Baixar PDF da ${n.numero}`}
                          className="transition-colors hover:text-foreground"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-border bg-card sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold">
              Emitir NFS-e
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Preencha os dados da nota fiscal de serviço.
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
              <Label htmlFor="cliente">Cliente (CPF/CNPJ)</Label>
              <Input id="cliente" placeholder="00.000.000/0001-00" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="servico">Descrição Detalhada do Serviço</Label>
              <Textarea
                id="servico"
                rows={3}
                placeholder="Ex.: Consultoria tributária referente à competência 07/2026"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor-nota">Valor da Nota</Label>
              <Input id="valor-nota" placeholder="0,00" inputMode="decimal" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="natureza">Natureza da Operação</Label>
              <Select>
                <SelectTrigger id="natureza" className="w-full">
                  <SelectValue placeholder="Selecione a natureza" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tributacao-municipio">
                    Tributação no município
                  </SelectItem>
                  <SelectItem value="tributacao-fora">
                    Tributação fora do município
                  </SelectItem>
                  <SelectItem value="isenta">Isenta</SelectItem>
                  <SelectItem value="imune">Imune</SelectItem>
                  <SelectItem value="exportacao">Exportação de serviço</SelectItem>
                </SelectContent>
              </Select>
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
                Emitir e Enviar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
