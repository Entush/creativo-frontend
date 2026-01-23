// ==========================================
// PROGRAMS PAGE – Creativo School
// SAFE VERSION (NO STRAPI = NO CRASH)
// ==========================================

import {
  badgeBaseStyle,
  badgeVariants,
  typography,
} from '@/styles'

// ---------- SEO METADATA ----------
export const metadata = {
  title: 'Program Pembelajaran | Creativo School',
  description:
    'Pilihan program pembelajaran desain, ilustrasi, dan kreativitas digital di Creativo School.',
}

// ---------- TYPES ----------
type Program = {
  id: number
  program_name?: string
  slug?: string
  short_description?: string
  segment?: 'monthly' | 'foundation' | 'custom private'
  target_usia?: 'kids' | 'junior' | 'teen' | 'adult'
  thumbnail?: {
    url?: string
    formats?: {
      small?: { url: string }
      medium?: { url: string }
      large?: { url: string }
    }
  }
}

// ==========================================
// SAFE FETCH (ANTI CRASH)
// ==========================================
async function getPrograms(): Promise<Program[]> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL

  // 🚨 STRAPI BELUM ADA → JANGAN FETCH
  if (!baseUrl) {
    console.log('[Programs] Strapi API not set, fallback empty')
    return []
  }

  try {
    const res = await fetch(
      `${baseUrl}/api/programs?populate=*`,
      { cache: 'no-store' }
    )

    if (!res.ok) {
      console.log('[Programs] Fetch failed:', res.status)
      return []
    }

    const json = await res.json()
    return json?.data || []
  } catch (error) {
    console.log('[Programs] Fetch error:', error)
    return []
  }
}

// ==========================================
// HELPER: BADGE STYLE
// ==========================================
function getBadgeStyle(bg: string, text: string) {
  return {
    ...badgeBaseStyle,
    backgroundColor: bg,
    color: text,
    fontFamily: typography.badge.fontFamily,
    fontWeight: typography.badge.weight,
    fontSize: typography.badge.size,
  }
}

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function ProgramsPage() {
  const programs = await getPrograms()

  return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
      {/* TITLE */}
      <h1
        style={{
          fontFamily: typography.heading.fontFamily,
          fontWeight: typography.heading.weight,
          color: typography.heading.color,
        }}
        className="text-3xl mb-8"
      >
        Program Creativo
      </h1>

      {/* EMPTY STATE */}
      {programs.length === 0 && (
        <p className="text-neutral-500">
          Program sedang dipersiapkan. Silakan cek kembali dalam waktu dekat.
        </p>
      )}

      {/* PROGRAM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => {
          if (!program || !program.slug) return null

          const programType =
            program.segment === 'foundation'
              ? 'foundation'
              : program.segment === 'custom private'
              ? 'customPrivate'
              : 'monthly'

          const audience = program.target_usia || 'teen'

          const imageUrl =
            program.thumbnail?.formats?.medium?.url ||
            program.thumbnail?.url ||
            null

          function formatLabel(text?: string) {
            if (!text) return ''
            return text
              .split(' ')
              .map(
                (word) => word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join(' ')
          }

          return (
            <div
              key={program.id}
              className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition"
            >
              {/* IMAGE */}
              {imageUrl && (
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`}
                  alt={program.program_name || 'Program Creativo'}
                  className="w-full h-40 object-cover"
                />
              )}

              <div className="p-4">
                {/* BADGES */}
                <div className="flex gap-2 flex-wrap mb-2">
                  <span
                    style={getBadgeStyle(
                      badgeVariants.programType[programType].bg,
                      badgeVariants.programType[programType].text
                    )}
                  >
                    {formatLabel(program.segment)}
                  </span>

                  <span
                    style={getBadgeStyle(
                      badgeVariants.audience[audience].bg,
                      badgeVariants.audience[audience].text
                    )}
                  >
                    {formatLabel(audience)}
                  </span>
                </div>

                {/* TITLE */}
                <a
                  href={`/programs/${program.slug}`}
                  style={{
                    fontFamily: typography.heading.fontFamily,
                    fontWeight: typography.heading.weight,
                    color: typography.heading.color,
                  }}
                  className="block text-lg hover:underline"
                >
                  {program.program_name}
                </a>

                {/* DESCRIPTION */}
                {program.short_description && (
                  <p
                    style={{
                      fontFamily: typography.body.fontFamily,
                      fontWeight: typography.body.weight,
                      color: typography.body.color,
                    }}
                    className="text-sm mt-2"
                  >
                    {program.short_description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
