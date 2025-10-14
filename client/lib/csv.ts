export type CsvColumn<T = any> = { key: keyof T | string; label?: string; map?: (row: T) => unknown };

function escapeCSV(val: unknown): string {
  const s = String(val ?? "");
  const needsQuote = /[",\n]/.test(s);
  const escaped = s.replace(/"/g, '""');
  return needsQuote ? `"${escaped}"` : escaped;
}

export function toCSV<T>(columns: CsvColumn<T>[], rows: T[]): string {
  const header = columns.map((c) => escapeCSV(c.label ?? String(c.key))).join(",");
  const lines = rows.map((r) =>
    columns
      .map((c) => escapeCSV(c.map ? c.map(r) : (r as any)[c.key]))
      .join(","),
  );
  return [header, ...lines].join("\n");
}

export function downloadCSV<T>(filename: string, columns: CsvColumn<T>[], rows: T[]) {
  const csv = toCSV(columns, rows);
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
