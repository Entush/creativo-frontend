// frontend/app/programs/[slug]/page.tsx

type Program = {
  id: number;
  program_name: string;
  slug: string;
  short_description: string;
  description: any;
  segment: string;
  target_usia: string;
  thumbnail?: {
    url: string;
    alternativeText?: string | null;
  };
};

/**
 * WAJIB untuk output: "export"
 * Generate semua slug saat build
 */
export async function generateStaticParams() {
  const res = await fetch("http://localhost:1337/api/programs", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch programs for static params");
  }

  const json = await res.json();

  return json.data.map((item: Program) => ({
    slug: item.slug,
  }));
}

async function getProgram(slug: string): Promise<Program | null> {
  const res = await fetch(
    `http://localhost:1337/api/programs?filters[slug][$eq]=${slug}&populate=thumbnail`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch program");
  }

  const json = await res.json();

  if (!json.data || json.data.length === 0) {
    return null;
  }

  return json.data[0];
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    return <div className="p-6">Program tidak ditemukan.</div>;
  }

  return (
    <main className="px-6 py-10">
      {/* CONTAINER TENGAH */}
      <div className="max-w-3xl mx-auto">
        {/* THUMBNAIL */}
        {program.thumbnail?.url && (
          <img
            src={`http://localhost:1337${program.thumbnail.url}`}
            alt={program.thumbnail.alternativeText || program.program_name}
            className="w-full h-auto rounded-lg mb-8"
          />
        )}

        {/* JUDUL */}
        <h1 className="text-3xl font-bold mb-3 text-center">
          {program.program_name}
        </h1>

        {/* BADGE */}
        <div className="flex justify-center gap-2 text-xs mb-6">
          <span className="px-2 py-1 bg-pink-100 text-pink-600 rounded">
            {program.segment}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
            {program.target_usia}
          </span>
        </div>

        {/* SHORT DESCRIPTION */}
        <p className="text-gray-600 text-center mb-8">
          {program.short_description}
        </p>

        {/* RICH TEXT DESCRIPTION */}
        <div className="prose max-w-none">
          {program.description?.map((block: any, i: number) => {
            if (block.type === "paragraph") {
              const text = block.children?.[0]?.text ?? "";

              // Bullet manual "- "
              if (text.startsWith("- ")) {
                return (
                  <ul key={i} className="list-disc pl-6">
                    <li>{text.replace("- ", "")}</li>
                  </ul>
                );
              }

              // Spasi paragraf
              if (text.trim() === "") {
                return <br key={i} />;
              }

              return <p key={i}>{text}</p>;
            }

            return null;
          })}
        </div>
      </div>
    </main>
  );
}
