"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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
import { getGalleryPhotosActions } from "@/actions/customers/getGalleryPhotosActions";
import { Button } from "@/components/ui/button";

interface IGallery {
  id: string;
  photos: [
    {
      id: string;
      src: string;
      title: string;
    }
  ];
}

interface IGalleryAxiosResponse extends Array<IGallery> {}

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [gallery, setGallery] = useState<IGalleryAxiosResponse | null>(null);
  const [htmlGallery, setHtmlGallery] = useState<JSX.Element[]>([]);
  const [statusFetch, setStatusFetch] = useState<IStatusFetch>({
    status: "idle",
  });

  useEffect(() => {
    async function getGalleryPhotos() {
      try {
        const response = await getGalleryPhotosActions();
        setGallery(response);
      } catch (error) {
        console.log(error);
      }
    }
    getGalleryPhotos();
  }, []);

  useEffect(() => {
    function montHtmlGallery() {
      if (gallery?.length !== undefined) {
        if (gallery?.length > 0) {
          const images = gallery.flatMap((item) =>
            item.photos.map((photo, index) => (
              <Image
                key={index}
                src={photo.src}
                alt={photo.title}
                width="0"
                height="0"
                sizes="100vw"
                className="w-40 h-40"
              />
            ))
          );
          setHtmlGallery(images);
        }
      }
    }
    montHtmlGallery();
  }, [gallery]);

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
                      Lista de fotos
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </section>
            <section className="text-2xl font-semibold">Galeria</section>
            <section className="mt-10 flex gap-4">{htmlGallery}</section>
            <section className="mt-10 flex gap-4">
              {gallery?.map((item) =>
                item.photos.map((photo, index) => (
                  <Image
                    key={index}
                    src={photo.src}
                    alt={photo.title}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-40 h-40"
                  />
                ))
              )}
            </section>
            <section className="mt-10">
              <Button type="button" onClick={() => setOpen(true)}>
                Open Lightbox
              </Button>
              {gallery !== null && (
                <Lightbox
                  open={open}
                  close={() => setOpen(false)}
                  slides={gallery[0].photos}
                />
              )}
            </section>
          </section>
        </section>
        <section></section>
      </section>
      <ToastContainer />
    </main>
  );
}
