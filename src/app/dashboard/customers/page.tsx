"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchAllCustomers() {
    try {
      // Simula um atraso de 2 segundos (2000 milissegundos)
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const response = await axios.get("http://localhost:4000/customers");
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {}
  }

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  return (
    <main className="flex flex-col items-center justify-start p-8 gap-10 flex-1">
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
                      Lista de Cliente
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </section>
            <section className="text-2xl font-semibold">CLIENTES</section>
          </section>
          <section>
            <Button
              onClick={() => router.push("/dashboard/customers/add")}
              type="button"
              variant="outline"
              className="text-primary flex gap-2 !pl-2">
              <Plus />
              Adicionar Clientes
            </Button>
          </section>
        </section>
        {!loading ? (
          <>
            <section className="mt-6 overflow-x-auto">
              <Table className="w-full min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Cidade/UF</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        {customer.id}
                      </TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.city}</TableCell>
                      <TableCell className="text-right ">
                        <button className="text-blue-500">Editar</button>
                        <button className="text-red-500 ml-4">Excluir</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
            <section className="mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </section>
          </>
        ) : (
          <section className="mt-20 flex flex-col gap-4 font-semibold justify-center items-center">
            <Spinner size="w-20 h-20" />
            Carregando dados
          </section>
        )}
      </section>
    </main>
  );
}
