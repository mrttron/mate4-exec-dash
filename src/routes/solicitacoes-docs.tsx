import { createFileRoute } from "@tanstack/react-router";
import { Inbox } from "lucide-react";
import { Sidebar } from "@/components/mate4/sidebar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/solicitacoes-docs")({
  head: () => ({
    meta: [
      { title: "MATE4 · Solicitações de Docs" },
      {
        name: "description",
        content:
          "Solicite e acompanhe documentos pendentes dos clientes da sua carteira contábil.",
      },
      { property: "og:title", content: "MATE4 · Solicitações de Docs" },
      {
        property: "og:description",
        content: "Central de solicitações de documentos entre contador e clientes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SolicitacoesDocs,
});

const solicitacoes = [
  { empresa: "Tech Solutions LTDA", doc: "Comprovante de aluguel", data: "10/07/2026", status: "Pendente" },
  { empresa: "MATE4 Holding", doc: "Contrato social atualizado", data: "22/07/2026", status: "Recebido" },
  { empresa: "Consultoria Beta ME", doc: "Extrato bancário Julho", data: "01/08/2026", status: "Pendente" },
];

function SolicitacoesDocs() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-6 py-10 md:px-12">
        <header className="flex items-center gap-3">
          <Inbox className="h-7 w-7 text-primary" />
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em]">
              Solicitações de Docs
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Documentos solicitados aos clientes e seus status
            </p>
          </div>
        </header>

        <section className="mt-8 flex flex-col gap-4">
          {solicitacoes.map((s) => (
            <article
              key={s.empresa + s.doc}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold text-foreground">{s.doc}</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {s.empresa} · solicitado em {s.data}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  s.status === "Recebido"
                    ? "bg-primary/20 text-primary"
                    : "bg-warning/15 text-warning"
                }`}
              >
                {s.status}
              </span>

              <Button className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90">
                Cobrar
              </Button>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
