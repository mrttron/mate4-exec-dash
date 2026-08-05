import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { Sidebar } from "@/components/mate4/sidebar";

export const Route = createFileRoute("/gestao-guias")({
  head: () => ({
    meta: [
      { title: "MATE4 · Gestão de Guias e Boletos" },
      {
        name: "description",
        content:
          "Controle de guias, DAS e boletos das empresas da carteira do contador no MATE4.",
      },
      { property: "og:title", content: "MATE4 · Gestão de Guias e Boletos" },
      {
        property: "og:description",
        content: "Emita, acompanhe e envie guias e boletos para seus clientes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GestaoGuias,
});

const guias = [
  { empresa: "Tech Solutions LTDA", tipo: "DAS", venc: "20/08/2026", valor: "R$ 2.800,00", status: "Pendente" },
  { empresa: "MATE4 Holding", tipo: "ISS", venc: "15/08/2026", valor: "R$ 1.240,00", status: "Pago" },
  { empresa: "Consultoria Beta ME", tipo: "DAS", venc: "20/08/2026", valor: "R$ 960,00", status: "Pendente" },
  { empresa: "Alfa Comércio EIRELI", tipo: "FGTS", venc: "07/08/2026", valor: "R$ 3.410,00", status: "Pago" },
];

function GestaoGuias() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-6 py-10 md:px-12">
        <header className="flex items-center gap-3">
          <Receipt className="h-7 w-7 text-primary" />
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em]">
              Gestão de Guias e Boletos
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Acompanhe as obrigações financeiras de toda a carteira
            </p>
          </div>
        </header>

        <section className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-4 font-semibold">Empresa</th>
                <th className="px-5 py-4 font-semibold">Tipo</th>
                <th className="px-5 py-4 font-semibold">Vencimento</th>
                <th className="px-5 py-4 font-semibold">Valor</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {guias.map((g, i) => (
                <tr
                  key={g.empresa + g.tipo}
                  className={i % 2 === 0 ? "bg-background/40" : ""}
                >
                  <td className="px-5 py-4 font-medium text-foreground">{g.empresa}</td>
                  <td className="px-5 py-4 text-muted-foreground">{g.tipo}</td>
                  <td className="px-5 py-4 text-muted-foreground">{g.venc}</td>
                  <td className="px-5 py-4 font-bold text-foreground">{g.valor}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        g.status === "Pago"
                          ? "bg-primary/20 text-primary"
                          : "bg-warning/15 text-warning"
                      }`}
                    >
                      {g.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
