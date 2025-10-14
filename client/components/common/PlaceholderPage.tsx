interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="rounded-xl border bg-white/70 p-8 text-center shadow-sm">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {description && <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">{description}</p>}
      <p className="mt-4 text-sm text-muted-foreground">Pídeme que complete este módulo y lo implementaré con tablas, búsqueda, filtros y paginación.</p>
    </div>
  );
}
