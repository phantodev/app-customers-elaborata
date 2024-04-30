import { Button } from "@/components/ui/button";
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

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-10">
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
              <Label htmlFor="picture">Email</Label>
              <Input id="picture" type="text" placeholder="Digite seu e-mail" />
            </section>
            <section>
              <Label htmlFor="picture">Password</Label>
              <Input
                id="picture"
                type="password"
                placeholder="Digite sua senha"
              />
            </section>
          </section>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Login</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
