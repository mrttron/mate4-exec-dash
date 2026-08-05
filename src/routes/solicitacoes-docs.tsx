import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Inbox, ShieldAlert, Building2 } from "lucide-react";
import { toast } from "sonner";
import { Sidebar } from "@/components/mate4/sidebar";
import { useUserRole } from "@/components/mate4/user-role";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const empresas = [
  { id: "tech-solutions", nome: "Tech Solutions LTDA" },
  { id: "mate-holding", nome: "MATE4 Holding" },
  { id: "consultoria-beta", nome: "Consultoria Beta ME" },
  { id: "alfa-comercio", nome: "Alfa Comércio EIRELI" },
];

type Solicitacao = {
  empresa: string;
  doc: string;
  prazo: string;
  status: "Aguardando Cliente" | "Recebido";
};

const solicitacoesIniciais: Solicitacao[] = [
  {
    empresa: "Tech Solutions LTDA",
    doc: "Comprovante de aluguel",
    prazo: "15/08/2026",
    status: "Aguardando Cliente",
  },
  {
    empresa: "MATE4 Holding",
    doc: "Contrato social atualizado",
    prazo: "22/08/2026",
    status: "Recebido",
  },
  {
    empresa: "Consultoria Beta ME",
    doc: "Extrato bancário Julho",
    prazo: "01/08/2026",
    status: "Aguardando Cliente",
  },
  {
    empresa: "Alfa Comércio EIRELI",
    doc: "Nota fiscal de serviço de energia",
    prazo: "10/08/2026",
    status: "Aguardando Cliente",
  },
];

function SolicitacoesDocs() {
  const { userRole } = useUserRole();
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>(solicitacoesIniciais);
  const [empresa, setEmpresa] = useState(empresas[0].nome);
  const [titulo, setTitulo] = useState("");
  const [prazo, setPrazo] = useState("");

  if (userRole !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <ShieldAlert className="mx-auto h-8 w-8 text-muted-foreground" />
          <h1 className="mt-4 text-lg font-bold text-foreground">Acesso restrito</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Esta área é exclusiva para contadores. Entre com uma conta de administrador para continuar.
          </p>
          <Button asChild className="mt-6 bg-primary hover:bg-primary/90">
            <Link to="/login">Ir para o login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleEnviar = () => {
    if (!titulo.trim() || !prazo.trim()) {
      toast.error("Preencha o título do documento e o prazo.");
      return;
    }

    setSolicitacoes((prev) => [
      ...prev,
      { empresa, doc: titulo, prazo, status: "Aguardando Cliente" },
    ]);

    setTitulo("");
    setPrazo("");
    toast.success("Solicitação enviada ao cliente!");
  };

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
              Peça e acompanhe documentos pendentes dos clientes
            </p>
          </div>
        </header>

        <section className="mt-8 rounded-xl border border-border bg-card p-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                Para qual Empresa
              </Label>
              <Select value={empresa} onValueChange={setEmpresa}>
                <SelectTrigger
                  className="h-11 border-border bg-background/40 text-sm font-medium text-foreground focus:ring-0 focus:ring-offset-0 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:truncate"
                  aria-label="Selecionar empresa"
                >
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Selecionar empresa" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-foreground">
                  {empresas.map((e) => (
                    <SelectItem
                      key={e.id}
                      value={e.nome}
                      className="cursor-pointer focus:bg-primary/20 focus:text-foreground"
                    >
                      {e.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                Título do Documento
              </Label>
              <Input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Comprovante de Aluguel"
                className="h-11 border-border bg-background/40 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                Prazo
              </Label>
              <Input
                value={prazo}
                onChange={(e) => setPrazo(e.target.value)}
                placeholder="Ex: 15/08/2026"
                className="h-11 border-border bg-background/40 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleEnviar}
                className="h-11 w-full bg-primary text-sm font-bold text-primary-foreground hover:bg-primary/90"
              >
                Enviar Solicitação
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-4 font-semibold">Empresa</th>
                <th className="px-5 py-4 font-semibold">Documento Solicitado</th>
                <th className="px-5 py-4 font-semibold">Prazo</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {solicitacoes.map((s, i) => (
                <tr
                  key={s.empresa + s.doc + s.prazo}
                  className={i % 2 === 0 ? "bg-background/40" : ""}
                >
                  <td className="px-5 py-4 font-medium text-foreground">{s.empresa}</td>
                  <td className="px-5 py-4 text-muted-foreground">{s.doc}</td>
                  <td className="px-5 py-4 text-muted-foreground">{s.prazo}</td>
                  <td className="px-5 py-4">
                    {s.status === "Recebido" ? (
                      <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                        Recebido
                      </span>
                    ) : (
                      <span className="rounded-full bg-warning/15 px-3 py-1 text-xs font-semibold text-warning">
                        Aguardando Cliente
                      </span>
                    )}
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
