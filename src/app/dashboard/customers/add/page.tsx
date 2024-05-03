"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Dashboard() {
  return (
    <main className="flex flex-col items-center justify-center p-8 gap-10">
      <section className="w-full max-w-7xl flex flex-col">
        <section>
          <section className="mb-4">
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
        <section>Formulário</section>
      </section>
    </main>
  );
}
