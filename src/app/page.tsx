"use client";

import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasEmailError, setHasEmailError] = useState<string>("");
  const [hasPasswordError, setHasPasswordError] = useState<string>("");
  const router = useRouter();
  const [renderPage, setRenderPage] = useState<boolean>(false);

  useEffect(() => {
    setHasEmailError("");
    setHasPasswordError("");
  }, [email, password]);

  useEffect(() => {
    if (localStorage.getItem("dataAppCustomers") !== null) {
      router.push("/dashboard/customers");
    } else {
      setRenderPage(true);
    }
  }, [router]);

  function validateForm() {
    if (email.length === 0) {
      setHasEmailError("E-mail inválido ou não preenchido!");
    }
    if (password.length === 0) {
      setHasPasswordError("Senha inválida ou não preenchida!");
    }
    if (password.length > 0 || email.length > 0) {
      return true;
    }
    return false;
  }

  async function handleSubmit() {
    if (validateForm()) {
      try {
        const options = {
          method: "POST",
          url: "http://localhost:4000/login",
          headers: {
            "Content-Type": "application/json",
            "api-key": "74cc79460fmsh3c6d0abcb93703cp140eb4jsn8975796733b1",
          },
          body: JSON.stringify({ email: email, password: password }),
        };
        const response = await fetch("http://localhost:4000/login", options);
        const data = await response.json();
        if (data.token) {
          localStorage.setItem("dataAppCustomers", JSON.stringify(data));
          router.push("/dashboard/customers");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {renderPage && (
        <>
          <section className="mt-40 flex flex-col items-center justify-center gap-10">
            <section className="relative w-[15rem] h-[5rem]">
              <Image src="/next.svg" alt="Logo NextJS" fill className="" />
            </section>
            <Card className="w-full md:w-[30rem]">
              <CardHeader>
                <CardTitle className="text-2xl">Autenticação</CardTitle>
                <CardDescription>Preencha seus dados abaixo.</CardDescription>
              </CardHeader>
              <CardContent>
                <section className="grid w-full items-center gap-4">
                  <section>
                    <Label
                      htmlFor="picture"
                      className={
                        hasEmailError !== "" ? "text-red-500" : "text-zinc-500"
                      }>
                      Email
                    </Label>
                    <Input
                      id="picture"
                      type="text"
                      placeholder="Digite seu e-mail"
                      className={hasEmailError !== "" ? "border-red-500" : ""}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    {hasEmailError !== "" && (
                      <section className="text-xs text-red-500 mt-2">
                        {hasEmailError}
                      </section>
                    )}
                  </section>
                  <section>
                    <Label
                      htmlFor="picture"
                      className={
                        hasPasswordError !== ""
                          ? "text-red-500"
                          : "text-zinc-500"
                      }>
                      Password
                    </Label>
                    <Input
                      id="picture"
                      type="password"
                      placeholder="Digite sua senha"
                      className={
                        hasPasswordError !== "" ? "border-red-500" : ""
                      }
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    {hasPasswordError !== "" && (
                      <section className="text-xs text-red-500 mt-2">
                        {hasPasswordError}
                      </section>
                    )}
                  </section>
                </section>
              </CardContent>
              <CardFooter>
                <Button
                  className={
                    hasEmailError !== "" ? "!bg-red-500 w-full" : "w-full"
                  }
                  onClick={handleSubmit}>
                  {hasEmailError === "" ? "Login" : <ShieldAlert />}
                </Button>
              </CardFooter>
            </Card>
          </section>
          <footer className="bg-zinc-900 h-14 w-full text-white text-sm font-semibold flex items-center justify-center">
            Todos os diretos do Eduardo Burko
          </footer>
        </>
      )}
    </main>
  );
}
