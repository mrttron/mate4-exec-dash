import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Receipt, ShieldAlert, Upload, Plus, Building2 } from "lucide-react";
import { toast } from "sonner";
import { Sidebar } from "@/components/mate4/sidebar";
import { useUserRole } from "@/components/mate4/user-role";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/gestao-guias")({
  head: () => ({
    meta: [
      { title: "MATE4 · Gestão de Guias e Boletos" },
      {
        name: "description",
        content:
          "Envie guias, DAS e boletos para as empresas da carteira do contador no MATE4.",
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

const empresas = [
  { id: "tech-solutions", nome: "Tech Solutions LTDA" },
  { id: "mate-holding", nome: "MATE4 Holding" },
  { id: "consultoria-beta", nome: "Consultoria Beta ME" },
  { id: "alfa-comercio", nome: "Alfa Comércio EIRELI" },
];

const meses = [
  "Janeiro/2026",
  "Fevereiro/2026",
  "Março/2026",
  "Abril/2026",
  "Maio/2026",
  "Junho/2026",
  "Julho/2026",
  "Agosto/2026",
];

const guias = [
  { empresa: "Tech Solutions LTDA", tipo: "DAS", mes: "Julho/2026" },
  { empresa: "MATE4 Holding", tipo: "FGTS", mes: "Julho/2026" },
  { empresa: "Consultoria Beta ME", tipo: "DAS", mes: "Junho/2026" },
  { empresa: "Alfa Comércio EIRELI", tipo: "FGTS", mes: "Junho/2026" },
  { empresa: "Tech Solutions LTDA", tipo: "FGTS", mes: "Junho/2026" },
];

function GestaoGuias() {
  const { userRole } = useUserRole();
  const [open, setOpen] = useState(false);
  const [arquivo, setArquivo] = useState<string | null>(null);

  if (userRole !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <ShieldAlert className="mx-auto h-8 w-8 text-muted-foreground" />
          <h1 className="mt-4 text-lg font-bold text-foreground">
            Acesso restrito
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Esta área é exclusiva para contadores. Entre com uma conta de
            administrador para continuar.
          </p>
          <Button asChild className="mt-6 bg-primary hover:bg-primary/90">
            <Link to="/login">Ir para o login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleEnviar = () => {
    setOpen(false);
    setArquivo(null);
    toast.success("Guia enviada e disponibilizada para o cliente!");
  };

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
              Envie guias e boletos para as empresas da sua carteira
            </p>
          </div>
        </header>

        <section className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Select defaultValue={empresas[0].id}>
            <SelectTrigger
              className="h-11 w-full max-w-xs border-border bg-card text-sm font-medium text-foreground transition-colors hover:border-primary/70 focus:ring-0 focus:ring-offset-0 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span]:truncate"
              aria-label="Selecionar empresa de destino"
            >
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Selecionar empresa" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card text-foreground">
              {empresas.map((e) => (
                <SelectItem
                  key={e.id}
                  value={e.id}
                  className="cursor-pointer focus:bg-primary/20 focus:text-foreground"
                >
                  {e.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => setOpen(true)}
            className="h-11 gap-2 bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Enviar Guia/Boleto
          </Button>
        </section>

        <section className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-4 font-semibold">Empresa</th>
                <th className="px-5 py-4 font-semibold">Tipo de Guia</th>
                <th className="px-5 py-4 font-semibold">Mês de Referência</th>
                <th className="px-5 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {guias.map((g, i) => (
                <tr
                  key={g.empresa + g.tipo + g.mes}
                  className={i % 2 === 0 ? "bg-background/40" : ""}
                >
                  <td className="px-5 py-4 font-medium text-foreground">
                    {g.empresa}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{g.tipo}</td>
                  <td className="px-5 py-4 text-muted-foreground">{g.mes}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                      Disponível p/ Cliente
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-border bg-card text-foreground sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Enviar Guia/Boleto
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Anexe o PDF da guia e defina o tipo e o mês de referência.
            </DialogDescription>
          </DialogHeader>

          <button
            type="button"
            onClick={() => setArquivo("guia_das_julho.pdf")}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background/40 px-6 py-10 text-center transition-colors hover:border-primary"
          >
            <Upload className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {arquivo ?? "Arraste o PDF da guia aqui"}
            </span>
            <span className="text-xs text-muted-foreground">
              ou clique para selecionar no computador
            </span>
          </button>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                Tipo de Guia
              </Label>
              <Select defaultValue="DAS">
                <SelectTrigger className="border-border bg-background/40 text-foreground focus:ring-0 focus:ring-offset-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-foreground">
                  <SelectItem value="DAS" className="cursor-pointer focus:bg-primary/20">
                    DAS
                  </SelectItem>
                  <SelectItem value="FGTS" className="cursor-pointer focus:bg-primary/20">
                    FGTS
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                Mês de Referência
              </Label>
              <Select defaultValue={meses[6]}>
                <SelectTrigger className="border-border bg-background/40 text-foreground focus:ring-0 focus:ring-offset-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-foreground">
                  {meses.map((m) => (
                    <SelectItem
                      key={m}
                      value={m}
                      className="cursor-pointer focus:bg-primary/20"
                    >
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleEnviar}
            className="h-11 w-full bg-primary text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            Enviar para o Cliente
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
