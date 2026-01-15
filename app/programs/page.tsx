// frontend/app/programs/page.tsx
export const metadata = {
  title: "Program Pembelajaran | Creativo School",
  description:
    "Pilihan program pembelajaran desain, ilustrasi, dan kreativitas digital di Creativo School. Program disesuaikan dengan usia dan kebutuhan siswa.",
};

type Program = {
  id: number;
  program_name: string;
  slug: string;
  short_description: string;
  segment: string;
  target_usia: string;
  thumbnail?: {
    url: string;
  };
};

async function getPrograms(): Promise<Program[]> {
  const res = await fetch(
    "http://localhost:1337/api/programs?populate=thumbnail",
    { cache: "no-store" }
  );


  if (!res.ok) {
    throw new Error("Failed to fetch programs");
  }

  const json = await res.json();
  return json.data;
}

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Program Creativo</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white"
          >
            {/* Thumbnail */}
            {program.thumbnail?.url && (
              <img
                src={`http://localhost:1337${program.thumbnail.url}`}
                alt={program.program_name}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4">
              {/* Badge */}
              <div className="flex gap-2 text-xs mb-2">
                <span className="px-2 py-1 bg-pink-100 text-pink-600 rounded">
                  {program.segment}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                  {program.target_usia}
                </span>
              </div>

              {/* Title */}
              <a
                href={`/programs/${program.slug}`}
                className="block text-lg font-semibold hover:text-pink-600"
              >
                {program.program_name}
              </a>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2">
                {program.short_description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
