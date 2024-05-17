import axios from "axios";

export async function getGalleryPhotosActions() {
  try {
    // Simula um atraso de 2 segundos (2000 milissegundos)
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    const response = await axios.get("http://localhost:4000/gallery");
    return response.data;
  } catch (error) {
    return error;
  }
}
