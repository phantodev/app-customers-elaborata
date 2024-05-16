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
import axios from "axios";
import { IStatusFetch } from "@/interfaces/Main";
import { Spinner } from "@/components/ui/spinner";

import ResizeFile from "react-image-file-resizer";

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
  const [statusFetch, setStatusFetch] = useState<IStatusFetch>({
    status: "idle",
  });

  // const onDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     acceptedFiles.map(async (file) => {
  //       try {
  //         const base64File = await resizeFile(file);
  //         if (typeof base64File === "string") {
  //           files.push(base64File);
  //         }
  //       } catch (error) {
  //         console.error("Error converting file to base64:", error);
  //       }
  //     });
  //   },
  //   [files]
  // );

  async function onDrop(acceptedFiles: File[]) {
    try {
      const base64File = await resizeFile(acceptedFiles[0]);
      if (typeof base64File === "string") {
        files.push(base64File);
      }
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  }

  async function resizeFile(file: File): Promise<string | unknown> {
    return new Promise((resolve) => {
      ResizeFile.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  }

  // async function resizeFile2(file: File): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();

  //     reader.onload = function (event) {
  //       const img = new Image();

  //       img.onload = function () {
  //         const canvas = document.createElement("canvas");
  //         const ctx = canvas.getContext("2d");

  //         const MAX_WIDTH = 300;
  //         const MAX_HEIGHT = 300;

  //         let width = img.width;
  //         let height = img.height;

  //         if (width > height) {
  //           if (width > MAX_WIDTH) {
  //             height *= MAX_WIDTH / width;
  //             width = MAX_WIDTH;
  //           }
  //         } else {
  //           if (height > MAX_HEIGHT) {
  //             width *= MAX_HEIGHT / height;
  //             height = MAX_HEIGHT;
  //           }
  //         }

  //         canvas.width = width;
  //         canvas.height = height;

  //         if (ctx) {
  //           // Agora podemos usar ctx com segurança
  //           ctx.drawImage(img, 0, 0, width, height);
  //         } else {
  //           // Lidar com o caso em que ctx é nulo
  //           console.error("Contexto do canvas é nulo");
  //         }

  //         const resizedDataURL = canvas.toDataURL("image/jpeg", 0.7); // 0.7 é a qualidade da imagem (de 0 a 1)

  //         resolve(resizedDataURL);
  //       };

  //       img.onerror = function (error: any) {
  //         reject(error);
  //       };

  //       img.src = event.target?.result as string;
  //     };

  //     reader.onerror = function (error) {
  //       reject(error);
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
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

  function deleteItemFromGallery(index: number) {
    const newArray = [...files];
    newArray.splice(index, 1);
    setFiles(newArray);
  }

  async function handleSaveGallery() {
    try {
      setStatusFetch({
        status: "loading",
      });
      const axiosPlayload = {
        photos: files,
      };
      // Simula um atraso de 2 segundos (2000 milissegundos)
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const response = await axios.post(
        "http://localhost:4000/gallery",
        axiosPlayload
      );
      setFiles([]);
      toast.success("Galeria atualizada com sucesso!");
    } catch (error) {
      alert("Deu pau na API");
    } finally {
      setStatusFetch({
        status: "idle",
      });
    }
  }

  // async function convertToBase64(file: File) {
  //   return new Promise((resolve) => {
  //     ResizeFile.imageFileResizer(
  //       file,
  //       300,
  //       300,
  //       "JPEG",
  //       100,
  //       0,
  //       (uri) => {
  //         resolve(uri);
  //       },
  //       "base64"
  //     );
  //   });
  // }

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
                <section className="flex gap-4">
                  <section className="relative w-20 h-20">
                    <Image
                      priority={true}
                      src="/london-01.jpg"
                      alt="Logo NextJS"
                      width={150}
                      height={150}
                      className="w-20 h-20 object-cover"
                    />
                  </section>
                  <section className="relative w-20 h-20">
                    <Image
                      priority={true}
                      src="/london-02.jpg"
                      alt="Logo NextJS"
                      sizes="100vw"
                      fill
                      className="w-full h-auto"
                    />
                  </section>
                  <section className="relative w-20 h-20">
                    <Image
                      priority={true}
                      src="/london-03.jpg"
                      alt="Logo NextJS"
                      fill
                      sizes="100vw"
                      className="w-full h-auto"
                    />
                  </section>
                </section>
                <section style={thumbsContainer}>
                  {files.map((file, fileIdx) => (
                    <section style={thumb} key={file} className="relative">
                      <section
                        onClick={() => deleteItemFromGallery(fileIdx)}
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
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="button" onClick={handleSaveGallery}>
                  {statusFetch.status === "loading" ? (
                    <Spinner size="w-4 h-4" />
                  ) : null}
                  {statusFetch.status === "idle" ? "Salvar" : null}
                  {statusFetch.status === "error" ? "Error" : null}
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
