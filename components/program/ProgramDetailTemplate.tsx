// ==========================================
// PROGRAM DETAIL TEMPLATE (FINAL)
// FILE: /components/program/ProgramDetailTemplate.tsx
// STATUS: LOCKED – jangan ubah struktur tanpa diskusi
// ==========================================

import { badgeBaseStyle, badgeVariants, typography } from "@/styles";

type ProgramDetailTemplateProps = {
  program: any;
};

export default function ProgramDetailTemplate({
  program,
}: ProgramDetailTemplateProps) {
  const {
    program_name,
    description,
    segment,
    age_targets,
    thumbnail,
    showcase_image,
  } = program;

  // ==========================================
  // BASE URL STRAPI (KONSISTEN)
  // ==========================================
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "";

  // ==========================================
  // IMAGE PICKER (AMAN)
  // ==========================================
  const heroImage = thumbnail?.url
    ? `${baseUrl}${thumbnail.url}`
    : null;

  const showcaseImage = showcase_image?.url
    ? `${baseUrl}${showcase_image.url}`
    : heroImage;

  // ==========================================
  // HELPERS
  // ==========================================
  const formatLabel = (text?: string) => {
    if (!text) return "";
    return text
      .split(" ")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  const getBadgeStyle = (bg: string, text: string) => ({
    ...badgeBaseStyle,
    backgroundColor: bg,
    color: text,
    fontFamily: typography.badge.fontFamily,
    fontWeight: typography.badge.weight,
    fontSize: typography.badge.size,
  });

  // ==========================================
  // PROGRAM TYPE MAPPING
  // ==========================================
  const programType =
    segment === "foundation"
      ? "foundation"
      : segment === "custom private"
      ? "customPrivate"
      : "monthly";

  return (
    <div>
      {/* ================= HERO ================= */}
      <section
        style={{
          width: "100%",
          height: "380px",
          backgroundImage: heroImage ? `url(${heroImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* EDGE */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "18px",
            background: "#ffffff",
            zIndex: 2,
          }}
        />

        {/* BLUR SHADOW */}
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "5%",
            width: "90%",
            height: "40px",
            background: "rgba(0,0,0,0.25)",
            filter: "blur(30px)",
            zIndex: 1,
          }}
        />
      </section>

      {/* ================= CONTENT ================= */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "56px 20px",
          textAlign: "center",
        }}
      >
        {/* ================= BACK LINK ================= */}
        <div
          style={{
            textAlign: "left",
            maxWidth: "760px",
            margin: "0 auto 24px",
          }}
        >
          <a
            href="/programs"
            style={{
              fontFamily: typography.body.fontFamily,
              fontSize: "0.95rem",
              color: "#6B7280",
              textDecoration: "none",
            }}
          >
            ← Kembali ke Program
          </a>
        </div>

        {/* JUDUL */}
        <h1
          style={{
            fontFamily: typography.heading.fontFamily,
            fontWeight: typography.heading.weight,
            fontSize: "2.4rem",
            marginBottom: "12px",
          }}
        >
          {program_name}
        </h1>

        {/* PROGRAM TYPE BADGE */}
        <div
          style={{
            ...getBadgeStyle(
              badgeVariants.programType[programType].bg,
              badgeVariants.programType[programType].text
            ),
            display: "inline-block",
            marginBottom: "24px",
          }}
        >
          {formatLabel(segment)}
        </div>

        {/* AGE TARGET BADGES */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "48px",
          }}
        >
          {age_targets?.map((item: any) => {
            const labels: string[] = [];
            if (item.kids) labels.push("kids");
            if (item.junior) labels.push("junior");
            if (item.teen) labels.push("teen");
            if (item.adult) labels.push("adult");

            return labels.map((label) => (
              <span
                key={label}
                style={getBadgeStyle(
                  badgeVariants.audience[
                    label as "kids" | "junior" | "teen" | "adult"
                  ].bg,
                  badgeVariants.audience[
                    label as "kids" | "junior" | "teen" | "adult"
                  ].text
                )}
              >
                {formatLabel(label)}
              </span>
            ));
          })}
        </div>

        {/* PROGRAM DESCRIPTION */}
        <h2
          style={{
            fontFamily: typography.heading.fontFamily,
            fontWeight: typography.heading.weight,
            fontSize: "1.3rem",
            marginBottom: "28px",
          }}
        >
          Program Description
        </h2>

        {/* DESKRIPSI */}
        <div
          style={{
            textAlign: "left",
            maxWidth: "760px",
            margin: "0 auto",
            lineHeight: 1.75,
            fontFamily: typography.body.fontFamily,
            fontWeight: typography.body.weight,
          }}
        >
          {description?.map((block: any, i: number) => {
            if (block.type === "paragraph") {
              return (
                <p key={i} style={{ marginBottom: "20px" }}>
                  {block.children
                    ?.map((child: any) => child.text)
                    .join("")}
                </p>
              );
            }

            if (block.type === "list") {
              return (
                <div key={i} style={{ marginBottom: "20px" }}>
                  {block.children?.map((item: any, j: number) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "10px",
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{">"}</span>
                      <span>
                        {item.children
                          ?.map((child: any) => child.text)
                          .join("")}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* SHOWCASE IMAGE */}
        {showcaseImage && (
          <div
            style={{
              marginTop: "72px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={showcaseImage}
              alt="Program Showcase"
              style={{
                maxWidth: "820px",
                width: "100%",
                borderRadius: "18px",
                boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
              }}
            />
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            marginTop: "88px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://wa.me/6285104971118"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "18px 44px",
              borderRadius: "12px",
              background: "#E11D48",
              color: "#ffffff",
              fontSize: "1.05rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Tanya via WhatsApp
          </a>

          <a
            href="/registration"
            style={{
              padding: "18px 44px",
              borderRadius: "12px",
              border: "2px solid #E11D48",
              color: "#E11D48",
              fontSize: "1.05rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Daftar Sekarang
          </a>
        </div>
      </section>
    </div>
  );
}
