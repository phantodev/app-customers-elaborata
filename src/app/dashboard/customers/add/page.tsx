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
import { useState, useEffect, useCallback } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useStore } from "@/stores";
import { useHookFormMask } from "use-mask-input";
import HowCombobox from "@/components/ui/howCombobox";
import { IHowMeet } from "@/interfaces/Customers";

export default function Dashboard() {
  const store = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCEP, setLoadingCEP] = useState<boolean>(false);
  const [errorCEP, setErrorCEP] = useState<boolean>(false);

  /* The above code is a TypeScript React snippet that is using the `useForm` hook
from a form library (possibly React Hook Form) to manage form state and
validation. It is destructuring several functions and properties from the
`useForm` hook, such as `register`, `handleSubmit`, `watch`, `reset`,
`setValue`, and `formState.errors`. Additionally, it is specifying a resolver
using `zodResolver` with a Zod schema (`CustomerZodSchema`) for form validation. */
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(CustomerZodSchema),
  });

  const registerWithMask = useHookFormMask(register);

  const postalCode = watch("postal_code");

  /* The above code is a TypeScript React function that uses the `useCallback` hook
  to define a function called `getCEP`. This function is an asynchronous
  function that performs the following steps:
  1. Sets the state variable `loadingCEP` to true.
  2. Waits for 4 seconds using `setTimeout`.
  3. Formats the `postalCode` by adding a hyphen in the middle.
  4. Makes a GET request to the ViaCEP API using the formatted postal code.
  5. Updates the form fields "address", "city", and "state" with the response
  data from */
  const getCEP: any = useCallback(async () => {
    try {
      setLoadingCEP(true);
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const postalCodeWithoutHyphen = postalCode.replace(
        /(\d{5})(\d{3})/,
        "$1-$2"
      );
      const response = await axios.get(
        `http://viacep.com.br/ws/${postalCodeWithoutHyphen}/json/`
      );
      setValue("address", response.data.logradouro);
      setValue("city", response.data.localidade);
      setValue("state", response.data.uf);
      setLoadingCEP(false);
    } catch (error) {
      setLoadingCEP(false);
      setErrorCEP(true);
    }
  }, [postalCode, setValue]);

  // const formatCEP: any = useCallback(async () => {
  //   const postalCodeWithoutHyphen = postalCode;
  //   setValue(
  //     "postal_code",
  //     postalCodeWithoutHyphen.replace(/(\d{5})(\d{3})/, "$1-$2")
  //   );
  // }, [postalCode, setValue]);

  useEffect(() => {
    if (postalCode !== undefined && postalCode.length === 9) {
      // formatCEP();
      getCEP();
    }
  }, [postalCode, getCEP]);

  /**
   * The function `processForm` handles form submission by making a POST request to
   * create a new customer or a PUT request to update an existing customer, with a
   * simulated delay of 4 seconds.
   * @param data - The `data` parameter in the `processForm` function represents the
   * form data that is being submitted. It contains the input values entered by the
   * user in the form fields. This data is then used to either create a new customer
   * entry or update an existing customer entry in the database based on the
   * condition
   */
  const processForm: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      // Simula um atraso de 2 segundos (2000 milissegundos)
      await new Promise((resolve) => setTimeout(resolve, 4000));
      if (store.customerToUpdate === null) {
        const response = await axios.post(
          "http://localhost:4000/customers",
          data
        );
      } else {
        const response = await axios.put(
          `http://localhost:4000/customers/${store.customerToUpdate.id}`,
          data
        );
      }

      reset();
      toast.success("Cadastro efetuado com sucesso!");
      setLoading(false);
    } catch (error) {}
  };

  /**
   * The function `handleHowMeet` sets the value of a field to the name property of
   * an object passed as an argument.
   * @param {IHowMeet} item - The `handleHowMeet` function takes an object `item` as
   * a parameter, which is expected to have a property `name` of type string. The
   * function then sets the value of the key "how_meet" to the value of `item.name`.
   */
  function handleHowMeet(item: IHowMeet) {
    setValue("how_meet", item.name);
  }

  useEffect(() => {
    // console.log(store.customerToUpdate);
  }, [store]);

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
          {/* <form onSubmit={handleSubmit(processForm)}>
            <Card className="w-full mt-10">
              <CardContent>
                <section className="grid grid-cols-1 lg:grid-cols-3 w-full items-center gap-4 mt-6 ">
                  <section>
                    <Label htmlFor="name">CPF</Label>
                    <Input
                      {...registerWithMask("cpf", ["999.999.999-99"], {
                        required: true,
                      })}
                      type="text"
                    />
                    <p className="text-red-600 text-xs mt-2">
                      {errors.cpf?.message}
                    </p>
                  </section>
                  <section>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Digite o nome"
                      // readOnly={store.customerToUpdate !== null ? true : false}
                      // defaultValue={store.customerToUpdate?.name}
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
                      defaultValue={store.customerToUpdate?.email}
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
                      defaultValue={store.customerToUpdate?.phone}
                      autoComplete="off"
                      className={errors.name?.message ? "border-red-500" : ""}
                      {...registerWithMask("phone", ["(99) 99999-9999"], {
                        required: true,
                      })}
                    />
                    <p className="text-red-600 text-xs mt-2">
                      {errors.phone?.message}
                    </p>
                  </section>
                  <section>
                    <Label htmlFor="country">País</Label>
                    <Input
                      id="country"
                      type="text"
                      placeholder="Digite o país"
                      defaultValue={store.customerToUpdate?.country}
                      className={errors.name?.message ? "border-red-500" : ""}
                      {...register("country")}
                    />
                    <p className="text-red-600 text-xs mt-2">
                      {errors.country?.message}
                    </p>
                  </section>
                  <section>
                    <Label htmlFor="postal_code">Código Postal</Label>
                    <section className="relative">
                      <Input
                        id="postal_code"
                        type="text"
                        placeholder="Digite o código postal"
                        defaultValue={store.customerToUpdate?.postal_code}
                        className={errors.name?.message ? "border-red-500" : ""}
                        {...registerWithMask("postal_code", ["99999-999"], {
                          required: true,
                        })}
                      />
                      {loadingCEP && (
                        <section className="absolute top-[10px] right-3 text-black">
                          <Spinner size="w-4 h-4" />
                        </section>
                      )}
                    </section>
                    <p className="text-red-600 text-xs mt-2">
                      {errors.postal_code?.message}
                      {errorCEP && "CEP não encontrado"}
                    </p>
                  </section>
                  <section>
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Digite o endereço"
                      readOnly
                      defaultValue={store.customerToUpdate?.address}
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
                      readOnly
                      defaultValue={store.customerToUpdate?.city}
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
                      readOnly
                      defaultValue={store.customerToUpdate?.state}
                      className={errors.name?.message ? "border-red-500" : ""}
                      {...register("state")}
                    />
                    <p className="text-red-600 text-xs mt-2">
                      {errors.state?.message}
                    </p>
                  </section>
                  <section>
                    <Label htmlFor="city">Como você nos conheceu?</Label>
                    <HowCombobox handleHowMeet={handleHowMeet} />
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
          </form> */}
        </section>
      </section>
      <ToastContainer />
    </main>
  );
}
