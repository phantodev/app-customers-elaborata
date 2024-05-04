"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <main className="flex flex-col h-screen">
      <section className="bg-black h-20 w-fulll p-4 flex justify-between">
        <section id="LOGO" className="h-full flex items-center w-fit">
          <Image
            src="/next-white.svg"
            alt="Logo NextJS"
            width={150}
            height={50}
            className=""
          />
        </section>
        <section
          id="MENU"
          className="hidden lg:flex flex-1 items-center justify-center">
          <ul className="text-white text-sm font-semibold flex gap-10">
            <li onClick={() => router.push("/dashboard/")}>Dashboard</li>
            <li onClick={() => router.push("/dashboard/customers")}>
              Clientes
            </li>
            <li onClick={() => router.push("/dashboard/users")}>Usuários</li>
            <li onClick={() => router.push("/dashboard/my-profile")}>
              Meu Perfil
            </li>
          </ul>
        </section>
        <section
          id="MENU-MOBILE"
          className="flex lg:hidden text-white h-full items-center">
          <Menu />
        </section>
        <section id="LOGOUT" className="hidden items-center lg:flex">
          <Button>
            <LogOut /> Sair
          </Button>
        </section>
      </section>
      {children}
    </main>
  );
}