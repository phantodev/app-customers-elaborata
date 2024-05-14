"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [renderPage, setRenderPage] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("dataAppCustomers") === null) {
      router.push("/");
    } else {
      setRenderPage(true);
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("dataAppCustomers");
    router.push("/");
  }
  return (
    <main className="flex flex-col h-screen">
      {renderPage && (
        <>
          <section className="bg-black h-20 w-fulll p-4 flex justify-between">
            <section id="LOGO" className="w-40 h-10 flex items-center">
              <Image
                priority={true}
                src="/next-white.svg"
                alt="Logo NextJS"
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto"
              />
            </section>
            <section
              id="MENU"
              className="hidden lg:flex flex-1 items-center justify-center">
              <ul className="text-white text-sm font-semibold flex gap-10">
                <li
                  className="cursor-pointer"
                  onClick={() => router.push("/dashboard/")}>
                  Dashboard
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => router.push("/dashboard/customers")}>
                  Clientes Infinite
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() =>
                    router.push("/dashboard/customers/pagination")
                  }>
                  Clientes Pagination
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => router.push("/dashboard/users")}>
                  Usuários
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => router.push("/dashboard/my-profile")}>
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
              <Button onClick={handleLogout}>
                <LogOut /> Sair
              </Button>
            </section>
          </section>
          {children}
        </>
      )}
    </main>
  );
}
