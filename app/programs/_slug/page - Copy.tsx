import { notFound } from "next/navigation";

const PROGRAMS: Record<string, any> = {
  "creative-drawing-anak": {
    title: "Creative Drawing & Art",
    age: "Anak 6–12 Tahun",
    summary:
      "Program pengenalan seni dan kreativitas untuk anak melalui aktivitas menggambar, mewarnai, dan eksplorasi visual.",
    learn: [
      "Menggambar dan mewarnai dengan berbagai media",
      "Pengenalan bentuk, warna, dan ekspresi visual",
      "Melatih motorik halus dan rasa percaya diri",
    ],
    suitable:
      "Anak yang menyukai aktivitas visual dan membutuhkan ruang eksplorasi kreatif yang menyenangkan.",
  },

  "digital-drawing-remaja": {
    title: "Digital Drawing & Illustration",
    age: "Remaja 13–18 Tahun",
    summary:
      "Pendalaman teknik menggambar digital dan ilustrasi untuk remaja yang ingin mengembangkan skill visual.",
    learn: [
      "Teknik dasar hingga lanjutan digital drawing",
      "Ilustrasi karakter dan objek",
      "Pengembangan gaya visual personal",
    ],
    suitable:
      "Remaja yang tertarik pada ilustrasi digital, desain, atau ingin menyiapkan portofolio.",
  },
};

export default function ProgramDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = PROGRAMS[params.slug];

  if (!program) return notFound();

  const waMsg = encodeURIComponent(
    `Hi, saya ingin berkonsultasi mengenai program ${program.title} di Creativo School.`
  );

  return (
    <main className="bg-white text-neutral-800">
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">

        {/* Header */}
        <header className="space-y-3">
          <span className="text-sm bg-neutral-100 px-3 py-1 rounded inline-block">
            {program.age}
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold">
            {program.title}
          </h1>
          <p className="text-lg text-neutral-600">
            {program.summary}
          </p>
        </header>

        {/* Yang Dipelajari */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Yang Akan Dipelajari
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700">
            {program.learn.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Cocok Untuk */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Program Ini Cocok Untuk
          </h2>
          <p className="text-neutral-700">
            {program.suitable}
          </p>
        </section>

        {/* CTA */}
        <section className="space-y-4 border-t pt-8">
          <p className="text-neutral-600">
            Masih ragu apakah program ini sesuai?
            Kami sarankan untuk memulai dengan konsultasi.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <a
              href={`/registration`}
              className="bg-neutral-900 text-white px-8 py-3 rounded-md hover:bg-neutral-800 transition"
            >
              Daftar Program
            </a>
            <a
              href={`https://wa.me/6285104971118?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-900 text-neutral-900 px-8 py-3 rounded-md hover:bg-neutral-100 transition"
            >
              Konsultasi via WhatsApp
            </a>
          </div>
        </section>

      </section>
    </main>
  );
}
