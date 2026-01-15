/**
 * Program Detail Page
 * --------------------------------------------------
 * Halaman ini DINONAKTIFKAN sementara untuk static export.
 * Akan diaktifkan kembali setelah Strapi live.
 */

export const dynamic = "error";

// Wajib ada untuk output: "export"
export async function generateStaticParams() {
  return [];
}

export default function ProgramDetailPage() {
  return (
    <main className="px-6 py-20">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-2xl font-semibold">
          Detail Program
        </h1>
        <p className="text-neutral-600">
          Detail program akan segera tersedia.
        </p>
      </div>
    </main>
  );
}
