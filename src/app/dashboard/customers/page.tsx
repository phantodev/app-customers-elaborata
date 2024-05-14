"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import axios from "axios";
import { useState, useEffect, useCallback, useRef } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
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
import CardCustomer from "@/components/ui/cardCustomer";
import { Button as Dudu, ButtonGroup } from "@nextui-org/button";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteLoader from "@/components/ui/infiniteLoader";
import { Switch } from "@nextui-org/switch";

export default function ListCustomers() {
  const router = useRouter();
  const [customers, setCustomers] = useState<ICustomerResponseWithPagiation>({
    first: 0,
    prev: 0,
    next: 0,
    last: 0,
    pages: 0,
    items: 0,
    data: [],
  });
  const [customersInfinite, setCustomersInfinite] = useState<ICustomer[]>([]);
  const customersInfiniteRef = useRef(customersInfinite);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const pageRef = useRef(page);
  const [customerToDelete, setCustomerToDelete] = useState<number>(0);
  const [lenghtCustomers, setLenghtCustomers] = useState(-1);
  const [filterByInactive, setFilterByInactive] = useState(false);
  const [firstFilterApplied, setFirstFilterApplied] = useState(false);
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
      let url;
      if (filterByInactive) {
        url = `http://localhost:4000/customers?inactive=${filterByInactive}&_page=${pageRef.current}&_per_page=8`;
      } else {
        url = `http://localhost:4000/customers?_page=${pageRef.current}&_per_page=8`;
      }
      const response = await axios.get(url);
      setLenghtCustomers(response.data.items);
      setPage(pageRef.current + 1);
      if (customersInfiniteRef.current.length !== response.data.items) {
        // setCustomersInfinite([
        //   ...customersInfiniteRef.current,
        //   ...response.data.data,
        // ]);
        if (!firstFilterApplied) {
          setFirstFilterApplied(true);
          setCustomersInfinite(response.data.data);
        } else {
          setCustomersInfinite([
            ...customersInfiniteRef.current,
            ...response.data.data,
          ]);
        }
      }
      setLoading(false);
    } catch (error) {}
  }, [filterByInactive, firstFilterApplied]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    setLoading(true);
    setFirstFilterApplied(false);
    setPage(1);
  }, [filterByInactive]);

  useEffect(() => {
    customersInfiniteRef.current = customersInfinite;
  }, [customersInfinite]);

  useEffect(() => {
    fetchAllCustomers();
  }, [fetchAllCustomers]);

  return (
    <main className="flex flex-col items-center justify-start p-8 gap-10 flex-1">
      <Transition
        show={isOpen}
        enter="duration-500 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-500 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
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
                  className="w-20"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteCustomer}
                  className={isDeleting ? "w-20 opacity-50" : "w-20"}
                  disabled={isDeleting}
                >
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
          <section className="flex gap-2">
            <Button
              onClick={() => {
                router.push("/dashboard/customers/add");
                store.setCustomerToUpdate(null);
              }}
              type="button"
              variant="outline"
              className="text-primary flex gap-2 !pl-2"
            >
              <Plus />
              Adicionar Clientes
            </Button>
            <Dudu
              color="primary"
              className="flex gap-2 !pl-2"
              onClick={() => {
                router.push("/dashboard/customers/add");
                store.setCustomerToUpdate(null);
              }}
            >
              <Plus /> Adicionar Clientes
            </Dudu>
          </section>
        </section>
        <section id="TOOGLE" className="mt-2 mb-6 flex gap-4">
          <section>Somente inativos?</section>
          <Switch
            onValueChange={(isSelected) => setFilterByInactive(isSelected)}
            aria-label="Filtrar Inativos (Cego)"
          />
        </section>
        {!loading ? (
          <>
            <section id="CARDS-CUSTOMERS" className="overflow-hidden">
              <InfiniteScroll
                className="!overflow-hidden"
                dataLength={customersInfinite.length}
                next={fetchAllCustomers}
                hasMore={customersInfinite.length < lenghtCustomers}
                // hasMore={false}
                loader={<InfiniteLoader />}
              >
                {customersInfinite.map((customer) => (
                  <CardCustomer
                    customer={customer}
                    key={customer.id}
                    inactive={customer.inactive}
                    className="mb-6 rounded-none"
                    handleUpdateCustomer={handleUpdateCustomer}
                    handleOpenDialog={handleOpenDialog}
                  />
                ))}
              </InfiniteScroll>
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
