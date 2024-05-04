"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = z.infer<typeof CustomerZodSchema>;

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CustomerZodSchema } from "@/schemas/CustomerZodSchema";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(CustomerZodSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      // Simula um atraso de 2 segundos (2000 milissegundos)
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const response = await axios.post(
        "http://localhost:4000/customers",
        data
      );
      reset();
      toast.success("Cadastro efetuado com sucesso!");
      setLoading(false);
    } catch (error) {}
  };

  return (
    <main className="flex flex-col items-center justify-center p-8 gap-10">
      <section className="w-full max-w-7xl flex flex-col">
        <section className="flex justify-between">
          <section className="mb-4">
            <section>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">
                      Adicionar Cliente
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </section>
            <section className="text-2xl font-semibold">CLIENTES</section>
          </section>
          <section>
            <Button
              onClick={() => router.push("/dashboard/customers")}
              type="button"
              variant="outline"
              className="text-primary flex gap-2 !pl-2">
              <ChevronLeft />
              Lista de Clientes
            </Button>
          </section>
        </section>
        <section>
          <form onSubmit={handleSubmit(processForm)}>
            <Card className="w-full mt-10">
              <CardContent>
                <section className="grid grid-cols-1 lg:grid-cols-3 w-full items-center gap-4 mt-6 ">
                  <section>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Digite o nome"
                      className={errors.name?.message ? "border-red-500" : ""}
                      {...register("name")}
                    />
                    <p className="text-red-600 text-xs mt-2">
                      {errors.name?.message}
                    </p>
                  </section>
                  <section>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="text"
                      placeholder="Digite o e-mail"
                      className={errors.name?.message ? "border-red-500" : ""}
                      {...register("email")}
                    />
                    <p className="text-red-600 text-xs mt-2">
                      {errors.email?.message}
                    </p>
                  </section>
                  <section>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="Digite o telefone"
                      className={errors.name?.message ? "border-red-500" : ""}
                      {...register("phone")}
                    />
                    <p className="text-red-600 text-xs mt-2">
                      {errors.phone?.message}
                    </p>
                  </section>
                  <section>
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Digite o endereço"
                      className={errors.name?.message ? "border-red-500" : ""}
                      {...register("address")}
                    />
                    <p className="text-red-600 text-xs mt-2">
                      {errors.address?.message}
                    </p>
                  </section>
                  <section>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Digite a cidade"
                      className={errors.name?.message ? "border-red-500" : ""}
                      {...register("city")}
                    />
                    <p className="text-red-600 text-xs mt-2">
                      {errors.city?.message}
                    </p>
                  </section>
                  <section>
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      type="text"
                      placeholder="Digite o estado"
                      className={errors.name?.message ? "border-red-500" : ""}
                      {...register("state")}
                    />
                    <p className="text-red-600 text-xs mt-2">
                      {errors.state?.message}
                    </p>
                  </section>
                  <section>
                    <Label htmlFor="postal_code">Código Postal</Label>
                    <Input
                      id="postal_code"
                      type="text"
                      placeholder="Digite o código postal"
                      className={errors.name?.message ? "border-red-500" : ""}
                      {...register("postal_code")}
                    />
                    <p className="text-red-600 text-xs mt-2">
                      {errors.postal_code?.message}
                    </p>
                  </section>
                  <section>
                    <Label htmlFor="country">País</Label>
                    <Input
                      id="country"
                      type="text"
                      placeholder="Digite o país"
                      className={errors.name?.message ? "border-red-500" : ""}
                      {...register("country")}
                    />
                    <p className="text-red-600 text-xs mt-2">
                      {errors.country?.message}
                    </p>
                  </section>
                </section>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  type="submit"
                  className={loading ? "w-40 opacity-50" : "w-40"}
                  disabled={loading}>
                  {loading ? <Spinner size="w-4 h-4" /> : "Salvar"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </section>
      </section>
      <ToastContainer />
    </main>
  );
}
