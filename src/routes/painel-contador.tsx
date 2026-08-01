import { createFileRoute } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { Sidebar } from "@/components/mate4/sidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/painel-contador")({
  head: () => ({
    meta: [
      { title: "MATE4 · Painel do Contador" },
      {
        name: "description",
        content:
          "Visão consolidada do contador sobre múltiplas empresas, status fiscais e certificados digitais.",
      },
      { property: "og:title", content: "MATE4 · Painel do Contador" },
      {
        property: "og:description",
        content:
          "Painel gerencial para acompanhamento de empresas, regimes tributários e certificados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PainelContador,
});

type BadgeVariant = "green" | "yellow" | "red";

interface Empresa {
  id: number;
  nome: string;
  regime: string;
  status: { label: string; variant: BadgeVariant };
  certificado: { label: string; variant: BadgeVariant };
}

const empresas: Empresa[] = [
  {
    id: 1,
    nome: "Tech Solutions LTDA",
    regime: "Simples Nacional",
    status: { label: "Adimplente", variant: "green" },
    certificado: { label: "Válido", variant: "green" },
  },
  {
    id: 2,
    nome: "MATE4 Holding",
    regime: "Lucro Presumido",
    status: { label: "Atenção", variant: "yellow" },
    certificado: { label: "A vencer", variant: "yellow" },
  },
  {
    id: 3,
    nome: "Consultoria Beta ME",
    regime: "Simples Nacional",
    status: { label: "Pendente", variant: "red" },
    certificado: { label: "Vencido", variant: "red" },
  },
  {
    id: 4,
    nome: "Distribuidora Gamma EIRELI",
    regime: "Lucro Real",
    status: { label: "Adimplente", variant: "green" },
    certificado: { label: "Válido", variant: "green" },
  },
];

const badgeStyles = {
  green: {
    bg: "bg-[#4A5D23]/15",
    border: "border-[#4A5D23]/30",
    text: "text-[#4A5D23]",
  },
  yellow: {
    bg: "bg-[#F59E0B]/15",
    border: "border-[#F59E0B]/30",
    text: "text-[#F59E0B]",
  },
  red: {
    bg: "bg-[#EF4444]/15",
    border: "border-[#EF4444]/30",
    text: "text-[#EF4444]",
  },
};

function Badge({
  label,
  variant,
}: {
  label: string;
  variant: "green" | "yellow" | "red";
}) {
  const style = badgeStyles[variant];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style.bg} ${style.border} ${style.text}`}
    >
      {label}
    </span>
  );
}

function PainelContador() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-6 py-10 md:px-12">
        <header>
          <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em]">
            Painel do Contador
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Visão consolidada das empresas sob gestão
          </p>
        </header>

        <section className="mt-10 overflow-hidden rounded-xl border border-border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow
                  className="border-b border-border hover:bg-transparent"
                  style={{ backgroundColor: "#25282D" }}
                >
                  <TableHead className="text-[#9CA3AF]">Empresa</TableHead>
                  <TableHead className="text-[#9CA3AF]">Regime</TableHead>
                  <TableHead className="text-[#9CA3AF]">
                    Status Fiscal
                  </TableHead>
                  <TableHead className="text-[#9CA3AF]">Certificado</TableHead>
                  <TableHead className="text-right text-[#9CA3AF]">
                    Ação Rápida
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {empresas.map((empresa, index) => (
                  <TableRow
                    key={empresa.id}
                    className="border-b border-border/50 transition-colors hover:bg-[#4A5D23]/5"
                    style={{
                      backgroundColor: index % 2 === 0 ? "#1A1D21" : "#25282D",
                    }}
                  >
                    <TableCell className="font-medium text-[#F2F0EB]">
                      {empresa.nome}
                    </TableCell>
                    <TableCell className="text-[#9CA3AF]">
                      {empresa.regime}
                    </TableCell>
                    <TableCell>
                      <Badge
                        label={empresa.status.label}
                        variant={empresa.status.variant}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge
                        label={empresa.certificado.label}
                        variant={empresa.certificado.variant}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        className="gap-1.5 rounded-md bg-[#4A5D23] px-3 py-1.5 text-xs font-semibold text-[#F2F0EB] hover:bg-[#4A5D23]/90"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Ver
                      </Button>
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
