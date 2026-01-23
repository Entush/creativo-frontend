// ==========================================
// PROGRAM DETAIL PAGE
// FILE: /app/programs/[slug]/page.tsx
// FIX: Next.js async params handling
// ==========================================

import ProgramDetailTemplate from "@/components/program/ProgramDetailTemplate";

// ==========================================
// FETCH PROGRAM BY SLUG
// ==========================================
async function getProgramBySlug(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not defined");
  }

  const res = await fetch(
    `${baseUrl}/api/programs?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch program detail");
  }

  const json = await res.json();
  return json.data?.[0] || null;
}

// ==========================================
// PAGE COMPONENT (IMPORTANT FIX HERE)
// ==========================================
export default async function ProgramDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ UNWRAP params (WAJIB di Next terbaru)
  const { slug } = await props.params;

  const program = await getProgramBySlug(slug);

  if (!program) {
    return (
      <div style={{ padding: "120px", textAlign: "center" }}>
        <h1>Program tidak ditemukan</h1>
      </div>
    );
  }

  return <ProgramDetailTemplate program={program} />;
}
