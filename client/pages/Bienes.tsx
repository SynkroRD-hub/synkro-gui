import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, Column } from "@/components/table/DataTable";
import { FloatingButton } from "@/components/common/FloatingButton";
import { Download, Edit2, Trash2 } from "lucide-react";
import { BienDTO, BienesAPI } from "@/services/api";
import { downloadCSV, CsvColumn } from "@/lib/csv";

// Demo data
const DEMO_BIENES: BienDTO[] = Array.from({ length: 37 }).map((_, i) => ({
  id: String(i + 1),
  codigo_patrimonial: `CP-${String(1000 + i)}`,
  codigo_interno: `CI-${String(500 + i)}`,
  descripcion_activo: `Laptop corporativa ${i + 1}`,
  marca: ["Dell", "HP", "Lenovo"][i % 3],
  modelo: `M-${i + 10}`,
  serie: `SR-${i + 10000}`,
  placa: i % 2 === 0 ? `PL-${i + 200}` : "",
  tipo: i % 2 === 0 ? "Activo" : "Accesorio",
  sede: ["Lima", "Arequipa", "Cusco"][i % 3],
  area: ["TI", "RRHH", "Contabilidad"][i % 3],
  oficina: `Of-${(i % 5) + 1}`,
}));

export default function BienesPage() {
  const [rows, setRows] = useState<BienDTO[]>(DEMO_BIENES);
  const [q, setQ] = useState("");
  const [sede, setSede] = useState<string>("all");
  const [area, setArea] = useState<string>("all");
  const [oficina, setOficina] = useState<string>("all");

  useEffect(() => {
    (async () => {
      try {
        const data = await BienesAPI.list();
        if (Array.isArray(data) && data.length) setRows(data);
      } catch (e) {
        // keep demo
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter((r) => {
      const matchQ = !term
        ? true
        : [
            r.codigo_patrimonial,
            r.codigo_interno,
            r.descripcion_activo,
            r.marca,
            r.modelo,
            r.serie,
            r.placa,
            r.tipo,
            r.sede,
            r.area,
            r.oficina,
          ]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(term));
      const matchSede = sede === "all" || r.sede === sede;
      const matchArea = area === "all" || r.area === area;
      const matchOf = oficina === "all" || r.oficina === oficina;
      return matchQ && matchSede && matchArea && matchOf;
    });
  }, [rows, q, sede, area, oficina]);

  const sedes = useMemo(() => Array.from(new Set(rows.map((r) => r.sede))).sort(), [rows]);
  const areas = useMemo(() => Array.from(new Set(rows.map((r) => r.area))).sort(), [rows]);
  const oficinas = useMemo(() => Array.from(new Set(rows.map((r) => r.oficina))).sort(), [rows]);

  const columns: Column<BienDTO>[] = [
    { key: "codigo_patrimonial", header: "Código Patrimonial", className: "min-w-[140px]" },
    { key: "codigo_interno", header: "Código Interno", className: "hidden md:table-cell" },
    { key: "descripcion_activo", header: "Denominación", className: "min-w-[240px]" },
    { key: "marca", header: "Marca", className: "hidden md:table-cell" },
    { key: "modelo", header: "Modelo", className: "hidden lg:table-cell" },
    { key: "serie", header: "Serie", className: "hidden lg:table-cell" },
    { key: "placa", header: "Placa", className: "hidden xl:table-cell" },
    { key: "tipo", header: "Tipo", className: "hidden xl:table-cell" },
  ];

  const csvCols: CsvColumn<BienDTO>[] = [
    { key: "codigo_patrimonial", label: "Codigo Patrimonial" },
    { key: "codigo_interno", label: "Codigo Interno" },
    { key: "descripcion_activo", label: "Denominacion" },
    { key: "marca", label: "Marca" },
    { key: "modelo", label: "Modelo" },
    { key: "serie", label: "Serie" },
    { key: "placa", label: "Placa" },
    { key: "tipo", label: "Tipo" },
    { key: "sede", label: "Sede" },
    { key: "area", label: "Area" },
    { key: "oficina", label: "Oficina" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Bienes</h1>
          <p className="text-sm text-muted-foreground">Catálogo con filtros por Sede/Área/Oficina y exportación a Excel.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => downloadCSV("bienes", csvCols, filtered)}>
            <Download className="mr-2 h-4 w-4" /> Exportar a Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <Label htmlFor="q" className="sr-only">Buscar</Label>
          <Input id="q" placeholder="Buscar por código, denominación, marca..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div>
          <Label className="mb-1 block">Sede</Label>
          <Select value={sede} onValueChange={setSede}>
            <SelectTrigger><SelectValue placeholder="Todas" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {sedes.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-1 block">Área</Label>
          <Select value={area} onValueChange={setArea}>
            <SelectTrigger><SelectValue placeholder="Todas" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {areas.map((a) => (<SelectItem key={a} value={a}>{a}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-1 block">Oficina</Label>
          <Select value={oficina} onValueChange={setOficina}>
            <SelectTrigger><SelectValue placeholder="Todas" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {oficinas.map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        actions={(row) => (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => alert(`Editar ${row.descripcion_activo}`)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="sm" onClick={() => alert(`Borrar ${row.descripcion_activo}`)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      />

      <FloatingButton onClick={() => alert("Registrar nuevo bien")} label="Nuevo bien" />
    </div>
  );
}
