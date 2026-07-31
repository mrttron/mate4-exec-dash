import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, FileText, Download, UploadCloud } from "lucide-react";
import { Sidebar } from "@/components/mate4/sidebar";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "MATE4 · Compliance e Cofre de Documentos" },
      {
        name: "description",
        content:
          "Saúde fiscal, guias a vencer e cofre de documentos: baixe entregas do contador e envie pendências no painel MATE4.",
      },
      { property: "og:title", content: "MATE4 · Compliance e Cofre de Documentos" },
      {
        property: "og:description",
        content:
          "Acompanhe adimplência, impacto no caixa e organize todos os documentos fiscais da sua empresa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Compliance,
});

const documentos = [
  { nome: "Guia DAS — Julho/2026", data: "05 Ago 2026" },
  { nome: "Holerites — Equipe", data: "01 Ago 2026" },
  { nome: "Relatório de Créditos IBS", data: "28 Jul 2026" },
  { nome: "FGTS Digital — Julho/2026", data: "18 Jul 2026" },
  { nome: "Balancete Consolidado — 2º Trim.", data: "10 Jul 2026" },
];

const solicitacoes = [
  "Aguardando Comprovante de Aluguel de Julho",
  "Enviar Nota Fiscal de Compra de Computador",
  "Extrato bancário consolidado de Julho",
];

function Compliance() {
  const [dragging, setDragging] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-6 py-10 md:px-12">
        <header>
          <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em]">
            Compliance
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Exercício fiscal 2026 · Regime Simples Nacional
          </p>
        </header>

        <section className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-xl border border-primary/70 bg-card p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <p className="text-sm font-medium text-muted-foreground">
                Saúde Fiscal
              </p>
            </div>
            <p className="metric-value mt-5 text-primary">100% Adimplente</p>
          </article>

          <article className="rounded-xl border-2 border-bronze bg-card p-6 shadow-[var(--shadow-premium)]">
            <p className="text-sm font-medium text-muted-foreground">
              Saindo do Caixa (30 dias)
            </p>
            <p className="metric-value mt-5 text-bronze">R$ 4.200,00</p>
            <p className="mt-3 text-xs text-muted-foreground">
              DAS: R$ 2.800 &nbsp;|&nbsp; FGTS: R$ 1.400
            </p>
          </article>

          <article className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm font-medium text-muted-foreground">
              Alíquota Efetiva
            </p>
            <p className="metric-value mt-5 text-foreground">5,8%</p>
            <p className="mt-3 text-xs text-muted-foreground">
              sobre o faturamento
            </p>
          </article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Entregas MATE4 */}
          <div className="rounded-xl border border-border bg-card p-7">
            <h2 className="text-lg font-bold">Documentos Prontos</h2>
            <p className="text-sm text-muted-foreground">
              Entregas da MATE4 disponíveis para download
            </p>

            <ul className="mt-6 flex flex-col gap-2">
              {documentos.map((doc) => (
                <li
                  key={doc.nome}
                  className="flex items-center gap-4 rounded-lg border border-transparent px-3 py-3 transition-colors hover:border-border hover:bg-background/40"
                >
                  <FileText className="h-5 w-5 shrink-0 text-destructive" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{doc.nome}</p>
                    <p className="text-xs text-muted-foreground">{doc.data}</p>
                  </div>
                  <button className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/15">
                    <Download className="h-3.5 w-3.5" />
                    Baixar
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Solicitações */}
          <div className="rounded-xl border border-border bg-card p-7">
            <h2 className="text-lg font-bold">Envie seus Documentos</h2>
            <p className="text-sm text-muted-foreground">
              Área segura para anexar comprovantes solicitados
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
              }}
              className={
                "mt-6 flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 transition-colors hover:border-primary " +
                (dragging
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground bg-background/30")
              }
            >
              <UploadCloud className="h-9 w-9 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Arraste arquivos aqui ou clique para enviar
              </span>
            </button>
            <input ref={inputRef} type="file" multiple className="hidden" />

            <h3 className="mt-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Solicitações Pendentes
            </h3>

            <ul className="mt-4 flex flex-col gap-3">
              {solicitacoes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background/40 px-4 py-3"
                >
                  <Checkbox
                    checked={!!checked[item]}
                    onCheckedChange={(v) =>
                      setChecked((s) => ({ ...s, [item]: v === true }))
                    }
                    className="mt-0.5 border-muted-foreground"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item}</p>
                    <span className="mt-2 inline-block rounded-md bg-warning/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-warning">
                      Pendente
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
