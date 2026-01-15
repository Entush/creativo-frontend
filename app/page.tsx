import HeroSlider from "@/components/HeroSlider";
import InstagramGallery from "@/components/InstagramGallery";
import GoogleReviews from "@/components/GoogleReviews";

import SectionAccent from "@/components/ui/SectionAccent";
import Button from "@/components/ui/Button";
import FunShape from "@/components/ui/FunShape";


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creativo School | Kursus Desain & Kreatif di Surabaya",
  description:
    "Creativo School adalah ruang belajar kreatif untuk anak, remaja, dan dewasa muda. Program desain grafis, ilustrasi, dan digital kreatif dengan pendekatan personal.",
  keywords: [
    "kursus desain surabaya",
    "sekolah desain surabaya",
    "kursus ilustrasi",
    "kursus kreatif anak",
    "kelas desain grafis",
    "creativo school",
  ],
  openGraph: {
    title: "Creativo School | Ruang Belajar Kreatif",
    description:
      "Pendampingan belajar kreatif untuk anak dan remaja melalui proses yang personal, fleksibel, dan terarah.",
    url: "https://event.creativo-school.com",
    siteName: "Creativo School",
    type: "website",
  },
};

export default function HomePage() {
  return (  
    <main className="bg-white text-neutral-800">
    <HeroSlider />


      {/* HOME HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Ruang Belajar Kreatif <br className="hidden sm:block" />
              untuk Anak dan Remaja
            </h1>

            <p className="text-neutral-600 text-lg leading-relaxed max-w-xl">
              Creativo School adalah ruang belajar kreatif berbasis digital
              yang membantu anak dan remaja mengembangkan potensi desain,
              ilustrasi, dan keterampilan kreatif sesuai minatnya.
            </p>

            <div className="flex gap-4">
              <Button href="/programs">
                Lihat Program Pembelajaran
              </Button>
              <Button href="/contact" variant="outline">
                Konsultasi Awal
              </Button>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/images/home-hero.jpg"
              alt="Kegiatan belajar kreatif digital di Creativo School"
              className="w-full max-w-lg rounded-xl shadow-md"
            />
          </div>

        </div>
      </section>

      <InstagramGallery />

      <GoogleReviews />

      {/* POSITIONING */}
      <section className="bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 py-24 space-y-14">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Pendampingan Belajar yang Disesuaikan dengan Setiap Individu
            </h2>

            <SectionAccent />

            <p className="text-neutral-600 leading-relaxed">
              Setiap proses belajar dirancang dengan mempertimbangkan
              kebutuhan, minat, dan ritme masing-masing siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-3">
              <h3 className="font-semibold">Personal</h3>
              <p className="text-sm text-neutral-600">
                Pendekatan individual untuk setiap siswa.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Terarah</h3>
              <p className="text-sm text-neutral-600">
                Tujuan belajar jelas dan terstruktur.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Bertanggung Jawab</h3>
              <p className="text-sm text-neutral-600">
                Proses yang dapat dipertanggungjawabkan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM HIGHLIGHT */}
      <section className="relative max-w-6xl mx-auto px-6 py-24">
        <FunShape position="bottom-right" />

        <div className="text-center max-w-3xl mx-auto space-y-6 relative">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Program Pembelajaran Creativo
          </h2>

          <SectionAccent align="center" />

          <p className="text-neutral-600 leading-relaxed">
            Program disusun berdasarkan usia dan kebutuhan belajar.
          </p>
        </div>

        <div className="mt-14 text-center">
          <Button href="/programs">
            Pelajari Semua Program
          </Button>
        </div>
      </section>

    </main>
  );
}