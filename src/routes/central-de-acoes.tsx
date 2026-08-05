import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Shield,
  FileSpreadsheet,
  FileText,
  Building2,
  Check,
  DollarSign,
  Clock,
  Upload,
  HelpCircle,
} from "lucide-react";
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

interface AcaoPrioritaria {
  id: string;
  icone: React.ComponentType<{ className?: string }>;
  titulo: string;
  descricao: string;
  botao: string;
  botaoClass: string;
  iconeClass: string;
  containerClass: string;
}

const acoes: AcaoPrioritaria[] = [
  {
    id: "receita",
    icone: DollarSign,
    titulo: "Recebimento de R$ 3.500 sem nota",
    descricao: "Identificado no extrato bancário ontem.",
    botao: "Pré-preencher Nota",
    botaoClass: "bg-primary text-primary-foreground hover:bg-primary/90",
    iconeClass: "text-warning",
    containerClass: "bg-card border-warning",
  },
  {
    id: "imposto",
    icone: Clock,
    titulo: "DAS vence em 2 dias",
    descricao: "Guia no valor de R$ 2.800 gerada e pronta para pagamento.",
    botao: "Baixar DAS",
    botaoClass: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    iconeClass: "text-destructive",
    containerClass: "bg-card border-destructive",
  },
  {
    id: "documento",
    icone: Upload,
    titulo: "Comprovante de Aluguel em atraso",
    descricao: "Solicitado em 10/07. Necessário para a prova de despesa.",
    botao: "Enviar Agora",
    botaoClass: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    iconeClass: "text-destructive",
    containerClass: "bg-destructive/10 border-destructive/20",
  },
  {
    id: "fluxo",
    icone: HelpCircle,
    titulo: "2 transações não categorizadas",
    descricao: "Transações do extrato importado que precisam de ajuste.",
    botao: "Categorizar",
    botaoClass: "",
    iconeClass: "text-muted-foreground",
    containerClass: "bg-card border-muted-foreground",
  },
];

function CentralDeAcoes() {
  const [concluidas, setConcluidas] = useState<Set<TaskId>>(new Set());
  const [mostrarOnboarding, setMostrarOnboarding] = useState(false);

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

  const mostrarAcoes = finalizado && !mostrarOnboarding;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 px-6 py-10 md:px-12">
        <header>
          <h1 className="text-3xl font-extrabold uppercase tracking-[0.14em]">
            {mostrarAcoes ? "Ações Prioritárias de Hoje" : "Central de Ações"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mostrarAcoes
              ? "Tarefas que precisam da sua atenção imediata"
              : "Onboarding de configuração inicial da sua empresa"}
          </p>
        </header>

        {!mostrarAcoes && (
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
        )}

        <section className="mt-8 flex flex-col gap-4">
          {mostrarAcoes
            ? acoes.map((acao) => {
                const Icon = acao.icone;
                return (
                  <article
                    key={acao.id}
                    className={`flex items-center gap-4 rounded-xl border p-5 ${acao.containerClass}`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className={`h-6 w-6 ${acao.iconeClass}`} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-foreground">
                        {acao.titulo}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {acao.descricao}
                      </p>
                    </div>

                    <Button
                      className={`shrink-0 rounded-lg px-5 py-2.5 text-sm font-bold transition-colors ${
                        acao.botaoClass || "border border-border bg-transparent text-foreground hover:bg-primary/10 hover:text-foreground"
                      }`}
                    >
                      {acao.botao}
                    </Button>
                  </article>
                );
              })
            : tarefas.map((tarefa) => {
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

        {mostrarAcoes && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setMostrarOnboarding(true)}
              className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Ver tarefas de configuração inicial
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

