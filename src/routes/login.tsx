import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { QueenIcon } from "@/components/mate4/queen-icon";
import { useUserRole } from "@/components/mate4/user-role";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "MATE4 · Acesse sua conta" },
      {
        name: "description",
        content:
          "Entre no MATE4 para acompanhar fluxo de caixa, notas fiscais e créditos IBS/CBS da sua empresa.",
      },
      { property: "og:title", content: "MATE4 · Acesse sua conta" },
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
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { setUserRole } = useUserRole();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setUserRole(email.toLowerCase().includes("admin") ? "admin" : "cliente");
    navigate({ to: "/central-de-acoes" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="flex items-center gap-3">
        <QueenIcon className="h-12 w-12 text-primary" />
        <span className="text-5xl font-extrabold tracking-tight text-primary">
          MATE4
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-sm rounded-xl border border-border bg-card p-8"
      >
        <h1 className="text-xl font-bold text-foreground">Acesse sua conta</h1>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@empresa.com"
              className="border-border bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha" className="text-muted-foreground">
              Senha
            </Label>
            <Input
              id="senha"
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="border-border bg-background text-foreground"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="mt-7 h-11 w-full rounded-lg bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90"
        >
          Entrar
        </Button>
      </form>
    </div>
  );
}
