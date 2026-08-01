import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle, FileText, UploadCloud, Landmark } from "lucide-react";
import { Sidebar } from "@/components/mate4/sidebar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/central-de-acoes")({
  head: () => ({
    meta: [
      { title: "MATE4 · Central de Ações" },
      {
        name: "description",
        content:
          "Acompanhe pendências e ações prioritárias para manter sua empresa em dia no painel MATE4.",
      },
      { property: "og:title", content: "MATE4 · Central de Ações" },
      {
        property: "og:description",
        content:
          "Central de ações com pendências fiscais, contábeis e financeiras da sua empresa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CentralDeAcoes,
});

const acoes = [
  {
    icone: FileText,
    titulo: "Revisar guia DAS",
    descricao:
      "A guia DAS do período 07/2026 ainda não foi confirmada. Revise para evitar atraso.",
  },
  {
    icone: UploadCloud,
    titulo: "Enviar comprovantes",
    descricao:
      "Faltam 3 documentos pendentes no cofre de compliance. Anexe os arquivos solicitados.",
  },
  {
    icone: Landmark,
    titulo: "Conciliar extrato bancário",
    descricao:
      "Identificamos 2 lançamentos não conciliados na conta corrente. Faça a conferência.",
  },
];

function CentralDeAcoes() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-6 py-10 md:px-12">
        <header>
          <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em]">
            Central de Ações
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ações prioritárias para manter sua empresa em dia
          </p>
        </header>

        <section className="mt-10 flex flex-col items-center">
          <div className="w-full max-w-2xl rounded-xl border border-primary/70 bg-card p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-foreground">
              Nenhuma pendência — sua empresa está em dia.
            </h2>
          </div>
        </section>

        <section className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {acoes.map((acao) => {
            const Icon = acao.icone;
            return (
              <article
                key={acao.titulo}
                className="flex flex-col rounded-xl border border-border bg-card p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">
                  {acao.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {acao.descricao}
                </p>
                <div className="mt-auto pt-5">
                  <Button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90">
                    Resolver
                  </Button>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
