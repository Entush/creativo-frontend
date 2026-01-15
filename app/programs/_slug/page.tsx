export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Detail Program</h1>
      <p>Slug: {params.slug}</p>
    </div>
  );
}
