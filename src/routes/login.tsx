import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { BordaMolettaLogo } from "@/components/mate4/borda-moletta-logo";
import { useUserRole } from "@/components/mate4/user-role";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "MATE4 · Acesso à Plataforma" },
      {
        name: "description",
        content:
          "Entre no MATE4 para acompanhar fluxo de caixa, notas fiscais e créditos IBS/CBS da sua empresa.",
      },
      { property: "og:title", content: "MATE4 · Acesso à Plataforma" },
      {
        property: "og:description",
        content: "Login do painel financeiro e contábil MATE4.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { setUserRole } = useUserRole();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setErro("");

    if (usuario === "admin" && senha === "admin") {
      setUserRole("admin");
      navigate({ to: "/central-do-contador" });
      return;
    }

    if (usuario === "empresa1" && senha === "123") {
      setUserRole("cliente");
      navigate({ to: "/central-de-acoes" });
      return;
    }

    setErro("Usuário ou senha incorretos.");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <BordaMolettaLogo
        iconSize={56}
        textClassName="text-4xl tracking-[0.08em]"
        className="justify-center"
      />

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-sm rounded-2xl border border-border bg-card p-8"
      >
        <h1 className="text-xl font-bold text-foreground">Acesso à Plataforma</h1>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="usuario" className="text-sm font-medium text-foreground">
              Usuário
            </Label>
            <Input
              id="usuario"
              type="text"
              autoComplete="off"
              required
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Digite seu usuário"
              className="h-11 rounded-lg border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha" className="text-sm font-medium text-foreground">
              Senha
            </Label>
            <Input
              id="senha"
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="h-11 rounded-lg border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/60"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="mt-7 h-12 w-full rounded-lg bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90"
        >
          Entrar
        </Button>

        {erro && (
          <p className="mt-4 text-center text-sm font-semibold text-destructive">
            {erro}
          </p>
        )}
      </form>
    </div>
  );
}
