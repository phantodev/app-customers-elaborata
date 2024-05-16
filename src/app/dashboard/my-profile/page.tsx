"use client";

import React, { useCallback, useMemo, CSSProperties, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import Image from "next/image";

export default function Dashboard() {
  const thumbsContainer: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb: CSSProperties = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner: CSSProperties = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img: CSSProperties = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const router = useRouter();
  const [files, setFiles] = useState<string[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.map((file) => {
        files.push(URL.createObjectURL(file));
      });
    },
    [files]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/jpg": [".jpg"],
    },
  });

  const style = useMemo(() => {
    const baseStyle: CSSProperties = {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      borderWidth: 2,
      borderRadius: 2,
      borderColor: "#eeeeee",
      borderStyle: "dashed",
      backgroundColor: "#fafafa",
      color: "#bdbdbd",
      outline: "none",
      transition: "border .24s ease-in-out",
    };

    const focusedStyle: CSSProperties = {
      borderColor: "#2196f3",
    };

    const acceptStyle: CSSProperties = {
      borderColor: "#00e676",
    };

    const rejectStyle: CSSProperties = {
      borderColor: "#ff1744",
    };

    return {
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    };
  }, [isFocused, isDragAccept, isDragReject]);

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
                    <BreadcrumbLink href="/customers">
                      Atualizar Perfil{" "}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </section>
            <section className="text-2xl font-semibold">MEU PERFIL</section>
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
          <form>
            <Card className="w-full mt-10">
              <CardContent>
                <section className="mt-10" {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>
                      Drag &apos;n&apos; drop some files here, or click to
                      select files
                    </p>
                  )}
                </section>
                <section style={thumbsContainer}>
                  {files.map((file) => (
                    <section style={thumb} key={file} className="relative">
                      <section
                        onClick={() => setFiles([])}
                        className="cursor-pointer absolute w-4 h-4 bg-red-500 text-[10px] text-white flex justify-center items-center font-bold rounded-full -top-1 -right-1">
                        X
                      </section>
                      <section style={thumbInner}>
                        <Image
                          src={file}
                          style={img}
                          width={100}
                          height={100}
                          alt="Miniatura"
                          // Revoke data uri after image is loaded
                          onLoad={() => {
                            URL.revokeObjectURL(file);
                          }}
                        />
                      </section>
                    </section>
                  ))}
                </section>
                <section className="grid grid-cols-1 lg:grid-cols-2 w-full items-center gap-4 mt-6 ">
                  <section>
                    <Label htmlFor="name">Nome</Label>
                    <Input type="text" />
                  </section>
                  <section>
                    <Label htmlFor="name">Email</Label>
                    <Input type="text" />
                  </section>
                  <section>
                    <Label htmlFor="name">Senha</Label>
                    <Input type="password" />
                  </section>
                  <section>
                    <Label htmlFor="name">Confirmar Senha</Label>
                    <Input type="password" />
                  </section>
                </section>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Salvar</Button>
              </CardFooter>
            </Card>
          </form>
        </section>
      </section>
      <ToastContainer />
    </main>
  );
}
