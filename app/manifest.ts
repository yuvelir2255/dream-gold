import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dream Gold — авторські ювелірні прикраси",
    short_name: "Dream Gold",
    description:
      "Авторські ювелірні вироби ручної роботи. Власне виробництво в Україні.",
    lang: "uk",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f0e6",
    theme_color: "#f6f0e6",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
