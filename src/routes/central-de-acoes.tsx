import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shield, FileSpreadsheet, FileText, Building2, Check } from "lucide-react";
import { Sidebar } from "@/components/mate4/sidebar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/central-de-acoes")({
  head: () => ({
    meta: [
      { title: "MATE4 · Central de Ações" },
      {
        name: "description",
        content:
          "Onboarding de configuração inicial para novos clientes do MATE4.",
      },
      { property: "og:title", content: "MATE4 · Central de Ações" },
      {
        property: "og:description",
        content:
          "Configure sua empresa conectando certificado, importando extratos e emitindo notas de teste.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CentralDeAcoes,
});

type TaskId = "certificado" | "extrato" | "nota" | "perfil";

interface Task {
  id: TaskId;
  icone: React.ComponentType<{ className?: string }>;
  titulo: string;
  descricao: string;
  botao: string;
}

const tarefas: Task[] = [
  {
    id: "certificado",
    icone: Shield,
    titulo: "Conectar Certificado Digital",
    descricao: "Necessário para assinar notas e guias.",
    botao: "Fazer Upload",
  },
  {
    id: "extrato",
    icone: FileSpreadsheet,
    titulo: "Importar Primeiro Extrato",
    descricao: "Envie o arquivo OFX/CSV para ativar o Fluxo de Caixa.",
    botao: "Importar CSV",
  },
  {
    id: "nota",
    icone: FileText,
    titulo: "Emitir Primeira Nota de Teste",
    descricao: "Valide o cadastro da sua empresa no município.",
    botao: "Emitir NFS-e",
  },
  {
    id: "perfil",
    icone: Building2,
    titulo: "Completar Dados do Perfil",
    descricao: "Insira seu e-mail de cobrança e telefone.",
    botao: "Preencher",
  },
];

function CentralDeAcoes() {
  const [concluidas, setConcluidas] = useState<Set<TaskId>>(new Set());

  const total = tarefas.length;
  const concluidasCount = concluidas.size;
  const progresso = (concluidasCount / total) * 100;
  const finalizado = concluidasCount === total;

  const toggleTask = (id: TaskId) => {
    setConcluidas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-6 py-10 md:px-12">
        <header>
          <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em]">
            Central de Ações
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Onboarding de configuração inicial da sua empresa
          </p>
        </header>

        <section className="mt-8 rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">
            Configuração Inicial da Empresa
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-4 flex-1 overflow-hidden rounded-full bg-[#25282D]">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  finalizado ? "bg-[#CD7F32]" : "bg-[#4A5D23]"
                }`}
                style={{ width: `${progresso}%` }}
              />
            </div>
            <p className="whitespace-nowrap text-sm font-medium text-foreground">
              {finalizado
                ? "✔ Configuração Finalizada! Sua empresa está pronta."
                : `${concluidasCount} de ${total} tarefas concluídas`}
            </p>
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-4">
          {tarefas.map((tarefa) => {
            const Icon = tarefa.icone;
            const isConcluida = concluidas.has(tarefa.id);

            return (
              <article
                key={tarefa.id}
                className={`flex items-center gap-4 rounded-xl border p-5 transition-colors duration-300 ${
                  isConcluida
                    ? "border-border bg-[#1A1D21]/80"
                    : "border-border bg-card"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleTask(tarefa.id)}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isConcluida
                      ? "border-[#4A5D23] bg-[#4A5D23]"
                      : "border-muted-foreground bg-transparent"
                  }`}
                  aria-label={`Marcar ${tarefa.titulo} como concluída`}
                >
                  {isConcluida && (
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  )}
                </button>

                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                    isConcluida ? "bg-primary/10" : "bg-primary/10"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      isConcluida ? "text-primary/70" : "text-primary"
                    }`}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3
                    className={`text-base font-bold ${
                      isConcluida ? "text-foreground/60" : "text-foreground"
                    }`}
                  >
                    {tarefa.titulo}
                  </h3>
                  <p
                    className={`mt-0.5 text-sm ${
                      isConcluida
                        ? "text-muted-foreground/60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {tarefa.descricao}
                  </p>
                </div>

                <Button
                  onClick={() => toggleTask(tarefa.id)}
                  className={`shrink-0 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors ${
                    isConcluida
                      ? "border border-border bg-transparent text-foreground/60 hover:bg-primary/10 hover:text-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isConcluida ? "Concluído" : tarefa.botao}
                </Button>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
