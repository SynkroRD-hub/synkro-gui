import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, Column } from "@/components/table/DataTable";
import { Download, Edit2, Trash2 } from "lucide-react";
import { InventarioDetalleDTO, InventarioAPI } from "@/services/api";
import { CsvColumn, downloadCSV } from "@/lib/csv";

function demoInventario(): InventarioDetalleDTO[] {
  const areas = ["TI", "RRHH", "Logística"]; 
  const oficinas = ["Of-1", "Of-2", "Of-3"]; 
  const sedes = ["Lima", "Arequipa"]; 
  return Array.from({ length: 45 }).map((_, i) => ({
    id: String(i + 1),
    idDetalle: `ID-${100 + i}`,
    numeroFicha: `FH-${1000 + (i % 12)}`,
    status: i % 2 === 0 ? "Activo" : "Pendiente",
    codigo_patrimonial: `CP-${1200 + i}`,
    codigo_interno: `CI-${500 + i}`,
    denominacion: `Equipo ${i + 1}`,
    marca: ["Dell", "HP", "Lenovo"][i % 3],
    modelo: `M-${i + 10}`,
    serie: `S-${i + 3000}`,
    placa: i % 2 === 0 ? `PL-${200 + i}` : "",
    tipo: i % 2 === 0 ? "Activo" : "Accesorio",
    color: ["Negro", "Gris"][i % 2],
    dimension: `${13 + (i % 3)}"`,
    estado: ["Bueno", "Regular"][i % 2],
    situacion: ["Operativo", "Mantenimiento"][i % 2],
    codInt2023: `X-${i}`,
    observacion: i % 5 ? "" : "Etiquetar",
    cantidad: 1,
    dni: String(70000000 + i),
    nombres: `Nombre ${i + 1}`,
    apellidoPaterno: `ApellidoP ${i + 1}`,
    apellidoMaterno: `ApellidoM ${i + 1}`,
    unidadOrganica: ["Gerencia", "Operaciones", "Finanzas"][i % 3],
    area: areas[i % areas.length],
    oficina: oficinas[i % oficinas.length],
    cargo: i % 2 ? "Analista" : "Asistente",
    inventario: i % 2 ? "2024" : "2023",
    fecha: new Date(2024, (i % 12), 1 + (i % 28)).toISOString().slice(0, 10),
    sede: sedes[i % sedes.length],
  }));
}

export default function InventarioDetallePage() {
  const [rows, setRows] = useState<InventarioDetalleDTO[]>(demoInventario());
  const [q, setQ] = useState("");
  const [numeroFicha, setNumeroFicha] = useState<string>("all");
  const [sede, setSede] = useState<string>("all");
  const [area, setArea] = useState<string>("all");
  const [oficina, setOficina] = useState<string>("all");

  useEffect(() => {
    (async () => {
      try {
        const data = await InventarioAPI.listDetalle();
        if (Array.isArray(data) && data.length) setRows(data);
      } catch (e) {
        // keep demo
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter((r) => {
      const base = [
        r.idDetalle,
        r.numeroFicha,
        r.status,
        r.codigo_patrimonial,
        r.codigo_interno,
        r.denominacion,
        r.marca,
        r.modelo,
        r.serie,
        r.placa,
        r.tipo,
        r.color,
        r.dimension,
        r.estado,
        r.situacion,
        r.codInt2023,
        r.observacion,
        r.dni,
        r.nombres,
        r.apellidoPaterno,
        r.apellidoMaterno,
        r.unidadOrganica,
        r.area,
        r.oficina,
        r.cargo,
        r.inventario,
        r.fecha,
        r.sede,
      ];
      const matchQ = !term ? true : base.filter(Boolean).some((v) => String(v).toLowerCase().includes(term));
      const matchFicha = numeroFicha === "all" || r.numeroFicha === numeroFicha;
      const matchSede = sede === "all" || r.sede === sede;
      const matchArea = area === "all" || r.area === area;
      const matchOf = oficina === "all" || r.oficina === oficina;
      return matchQ && matchFicha && matchSede && matchArea && matchOf;
    });
  }, [rows, q, numeroFicha, sede, area, oficina]);

  const fichas = useMemo(() => Array.from(new Set(rows.map((r) => r.numeroFicha))).sort(), [rows]);
  const sedes = useMemo(() => Array.from(new Set(rows.map((r) => r.sede).filter(Boolean))).sort(), [rows]);
  const areas = useMemo(() => Array.from(new Set(rows.map((r) => r.area))).sort(), [rows]);
  const oficinas = useMemo(() => Array.from(new Set(rows.map((r) => r.oficina))).sort(), [rows]);

  const columns: Column<InventarioDetalleDTO>[] = [
    { key: "idDetalle", header: "idDetalle", className: "min-w-[120px]" },
    { key: "numeroFicha", header: "N° DE Ficha", className: "hidden sm:table-cell" },
    { key: "status", header: "Status", className: "hidden md:table-cell" },
    { key: "codigo_patrimonial", header: "Código Patrimonial", className: "min-w-[140px]" },
    { key: "codigo_interno", header: "Código Interno", className: "hidden md:table-cell" },
    { key: "denominacion", header: "Denominación", className: "min-w-[220px]" },
    { key: "marca", header: "Marca", className: "hidden md:table-cell" },
    { key: "modelo", header: "Modelo", className: "hidden lg:table-cell" },
    { key: "serie", header: "Serie", className: "hidden xl:table-cell" },
    { key: "placa", header: "Placa", className: "hidden xl:table-cell" },
    { key: "tipo", header: "Tipo", className: "hidden xl:table-cell" },
    { key: "color", header: "Color", className: "hidden 2xl:table-cell" },
    { key: "dimension", header: "Dimensión", className: "hidden 2xl:table-cell" },
    { key: "estado", header: "Estado", className: "hidden 2xl:table-cell" },
    { key: "situacion", header: "Situación", className: "hidden 2xl:table-cell" },
    { key: "codInt2023", header: "Cod Int 2023", className: "hidden 2xl:table-cell" },
    { key: "observacion", header: "Observación", className: "hidden 2xl:table-cell" },
    { key: "cantidad", header: "Cantidad", className: "hidden xl:table-cell" },
    { key: "dni", header: "DNI", className: "hidden md:table-cell" },
    { key: "nombres", header: "NOMBRES", className: "hidden lg:table-cell" },
    { key: "apellidoPaterno", header: "AP. PATERNO", className: "hidden xl:table-cell" },
    { key: "apellidoMaterno", header: "AP. MATERNO", className: "hidden 2xl:table-cell" },
    { key: "unidadOrganica", header: "UNIDAD ORGÁNICA", className: "hidden xl:table-cell" },
    { key: "area", header: "ÁREA", className: "hidden xl:table-cell" },
    { key: "oficina", header: "OFICINA", className: "hidden xl:table-cell" },
    { key: "cargo", header: "CARGO", className: "hidden 2xl:table-cell" },
    { key: "inventario", header: "Inventario", className: "hidden 2xl:table-cell" },
    { key: "fecha", header: "Fecha", className: "hidden sm:table-cell" },
  ];

  const csvCols: CsvColumn<InventarioDetalleDTO>[] = [
    { key: "idDetalle", label: "idDetalle" },
    { key: "numeroFicha", label: "Numero de Ficha" },
    { key: "status", label: "Status" },
    { key: "codigo_patrimonial", label: "Codigo Patrimonial" },
    { key: "codigo_interno", label: "Codigo Interno" },
    { key: "denominacion", label: "Denominacion" },
    { key: "marca", label: "Marca" },
    { key: "modelo", label: "Modelo" },
    { key: "serie", label: "Serie" },
    { key: "placa", label: "Placa" },
    { key: "tipo", label: "Tipo" },
    { key: "color", label: "Color" },
    { key: "dimension", label: "Dimension" },
    { key: "estado", label: "Estado" },
    { key: "situacion", label: "Situacion" },
    { key: "codInt2023", label: "Cod Int 2023" },
    { key: "observacion", label: "Observacion" },
    { key: "cantidad", label: "Cantidad" },
    { key: "dni", label: "DNI" },
    { key: "nombres", label: "Nombres" },
    { key: "apellidoPaterno", label: "Apellido Paterno" },
    { key: "apellidoMaterno", label: "Apellido Materno" },
    { key: "unidadOrganica", label: "Unidad Organica" },
    { key: "area", label: "Area" },
    { key: "oficina", label: "Oficina" },
    { key: "cargo", label: "Cargo" },
    { key: "inventario", label: "Inventario" },
    { key: "fecha", label: "Fecha" },
    { key: "sede", label: "Sede" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Inventario Detalle</h1>
          <p className="text-sm text-muted-foreground">Búsqueda, filtros por ficha/sede/área/oficina, paginación y exportación a Excel.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => downloadCSV("inventario_detalle", csvCols, filtered)}>
            <Download className="mr-2 h-4 w-4" /> Exportar a Excel
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <Label htmlFor="q" className="sr-only">Buscar</Label>
          <Input id="q" placeholder="Buscar por código, denominación, persona..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div>
          <Label className="mb-1 block">N° Ficha</Label>
          <Select value={numeroFicha} onValueChange={setNumeroFicha}>
            <SelectTrigger><SelectValue placeholder="Todas" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {fichas.map((f) => (<SelectItem key={f} value={f}>{f}</SelectItem>))}
            </SelectContent>
          </Select>
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
            <Button variant="outline" size="sm" onClick={() => alert(`Editar ${row.denominacion}`)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="sm" onClick={() => alert(`Borrar ${row.denominacion}`)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}
