"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import {
  ICustomer,
  ICustomerResponseWithPagiation,
} from "@/interfaces/Customers";
import { useStore } from "@/stores";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/pagination";
import CardCustomer from "@/components/ui/cardCustomer";

export default function Dashboard() {
  const router = useRouter();
  const [customers, setCustomers] = useState<ICustomerResponseWithPagiation>();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [customerToDelete, setCustomerToDelete] = useState<number>();
  const store = useStore();

  function handleOpenDialog(idCustomer: number) {
    setCustomerToDelete(idCustomer);
    setIsOpen(true);
  }

  function handleUpdateCustomer(customer: ICustomer) {
    store.setCustomerToUpdate(customer);
    router.push("/dashboard/customers/add");
  }

  async function handleDeleteCustomer() {
    try {
      setIsDeleting(true);
      await axios.delete(`http://localhost:4000/customers/${customerToDelete}`);
      await fetchAllCustomers();
      setIsOpen(false);
      setIsDeleting(false);
    } catch (error) {
      toast.error("Problemas de conexão com a API. Tente mais tarde!");
      setIsOpen(false);
    }
  }

  const fetchAllCustomers = useCallback(async () => {
    try {
      // Simula um atraso de 2 segundos (2000 milissegundos)
      // await new Promise((resolve) => setTimeout(resolve, 4000));
      const response = await axios.get(
        `http://localhost:4000/customers?_page=${page}&_per_page=4`
      );
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {}
  }, [page]);

  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  // Função para montar a paginação
  // function montPagination() {
  //   // const pages = customers?.last_page || 0;
  //   const pageItems = [];
  //   if (customers?.pages !== undefined) {
  //     for (let i = 1; i <= customers?.pages; i++) {
  //       pageItems.push(
  //         <PaginationItem key={i}>
  //           <PaginationLink href="#">{i}</PaginationLink>
  //         </PaginationItem>
  //       );
  //     }
  //   }
  //   return pageItems;
  // }

  function handlePage(page: number) {
    setPage(page);
  }

  return (
    <main className="flex flex-col items-center justify-start p-8 gap-10 flex-1">
      <Transition
        show={isOpen}
        enter="duration-500 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-500 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
              <DialogTitle className="font-bold text-2xl">
                Excluir registro?
              </DialogTitle>
              <p>
                Você irá excluir este registro para sempre do banco de dados!
              </p>
              <div className="flex gap-4 justify-end">
                <Button
                  variant="outline"
                  disabled={isDeleting}
                  onClick={() => setIsOpen(false)}
                  className="w-20">
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteCustomer}
                  className={isDeleting ? "w-20 opacity-50" : "w-20"}
                  disabled={isDeleting}>
                  {isDeleting ? <Spinner size="w-4 h-4" /> : "Excluir"}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
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
              onClick={() => {
                router.push("/dashboard/customers/add");
                store.setCustomerToUpdate(null);
              }}
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
            <section id="CARDS-CUSTOMERS">
              {customers?.data.map((customer) => (
                <CardCustomer customer={customer} key={customer.id} />
              ))}
            </section>
            <section
              id="TABLE-CUSTOMERS"
              className="hidden sm:flex mt-6 overflow-x-auto">
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
                  {customers?.data.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        {customer.id}
                      </TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.city}</TableCell>
                      <TableCell className="text-right ">
                        <button
                          className="text-blue-500"
                          onClick={() => handleUpdateCustomer(customer)}>
                          Editar
                        </button>
                        <button
                          className="text-red-500 ml-4"
                          onClick={() => handleOpenDialog(customer.id)}>
                          Excluir
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
            {/* <section className="mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      disabled={customers?.prev === null ? true : false}
                      onClick={() => {
                        customers?.prev !== null
                          ? setPage(customers?.prev ?? 1)
                          : page;
                      }}>
                      Anterior
                    </Button>
                  </PaginationItem>
                  {montPagination()}
                  {
                    <>
                      {customers?.pages !== undefined && (
                        <>
                          {Array.from({ length: customers?.pages }, (_, i) => (
                            <PaginationItem key={i + 1}>
                              <PaginationLink
                                onClick={() => setPage(i + 1)}
                                className="cursor-pointer"
                                isActive={i + 1 === page}>
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                        </>
                      )}
                    </>
                  }

                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      disabled={customers?.next === null ? true : false}
                      onClick={() => {
                        customers?.next !== null
                          ? setPage(customers?.next ?? 1)
                          : page;
                      }}>
                      Próximo
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </section> */}
            <section className="hidden sm:flex mt-10 justify-center">
              <Pagination
                total={10}
                initialPage={1}
                showControls
                onChange={handlePage}
              />
            </section>
          </>
        ) : (
          <section className="mt-20 flex flex-col gap-4 font-semibold justify-center items-center">
            <Spinner size="w-20 h-20" />
            Carregando dados
          </section>
        )}
      </section>
      <ToastContainer />
    </main>
  );
}
