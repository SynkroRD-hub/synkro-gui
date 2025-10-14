import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, Column } from "@/components/table/DataTable";
import { Edit2, Trash2 } from "lucide-react";
import { FichaDTO, FichasAPI } from "@/services/api";

function demoFichas(): FichaDTO[] {
  const unidades = ["Gerencia", "Operaciones", "Finanzas"]; 
  const areas = ["TI", "RRHH", "Logística"]; 
  const oficinas = ["Of-1", "Of-2", "Of-3"]; 
  return Array.from({ length: 30 }).map((_, i) => ({
    id: String(i + 1),
    numeroHoja: `FH-${1000 + i}`,
    dni: String(70000000 + i),
    nombres: `Nombre ${i + 1}`,
    apellidoPaterno: `ApellidoP ${i + 1}`,
    apellidoMaterno: `ApellidoM ${i + 1}`,
    correo: `user${i + 1}@empresa.com`,
    condicion: i % 2 ? "Activo" : "Contrato",
    obs: i % 3 ? "" : "Obs",
    cargo: i % 2 ? "Analista" : "Asistente",
    inventariador: `Inv ${1 + (i % 4)}`,
    inventariadorC: `INV-${i}`,
    fecha: new Date(2024, (i % 12), 1 + (i % 28)).toISOString().slice(0, 10),
    unidadOrganica: unidades[i % unidades.length],
    area: areas[i % areas.length],
    oficina: oficinas[i % oficinas.length],
    versionPdf: `v${1 + (i % 3)}`,
    observacion: i % 5 ? "" : "Revisar",
    impreso: i % 2 === 0,
    status: i % 2 === 0 ? "Completado" : "Pendiente",
  }));
}

export default function FichasPage() {
  const [rows, setRows] = useState<FichaDTO[]>(demoFichas());
  const [q, setQ] = useState("");
  const [unidad, setUnidad] = useState<string>("all");
  const [area, setArea] = useState<string>("all");
  const [oficina, setOficina] = useState<string>("all");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const data = await FichasAPI.list();
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
            r.numeroHoja,
            r.dni,
            r.nombres,
            r.apellidoPaterno,
            r.apellidoMaterno,
            r.correo,
            r.condicion,
            r.obs,
            r.cargo,
            r.inventariador,
            r.inventariadorC,
            r.unidadOrganica,
            r.area,
            r.oficina,
            r.versionPdf,
            r.observacion,
            r.status,
          ]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(term));
      const matchUnidad = unidad === "all" || r.unidadOrganica === unidad;
      const matchArea = area === "all" || r.area === area;
      const matchOf = oficina === "all" || r.oficina === oficina;
      const matchFrom = !from || r.fecha >= from;
      const matchTo = !to || r.fecha <= to;
      return matchQ && matchUnidad && matchArea && matchOf && matchFrom && matchTo;
    });
  }, [rows, q, unidad, area, oficina, from, to]);

  const unidades = useMemo(() => Array.from(new Set(rows.map((r) => r.unidadOrganica))).sort(), [rows]);
  const areas = useMemo(() => Array.from(new Set(rows.map((r) => r.area))).sort(), [rows]);
  const oficinas = useMemo(() => Array.from(new Set(rows.map((r) => r.oficina))).sort(), [rows]);

  const columns: Column<FichaDTO>[] = [
    { key: "numeroHoja", header: "N° De Hoja", className: "min-w-[120px]" },
    { key: "dni", header: "DNI", className: "hidden sm:table-cell" },
    { key: "nombres", header: "NOMBRES", className: "min-w-[160px]" },
    { key: "apellidoPaterno", header: "AP. PATERNO", className: "hidden md:table-cell" },
    { key: "apellidoMaterno", header: "AP. MATERNO", className: "hidden lg:table-cell" },
    { key: "correo", header: "CORREO", className: "hidden xl:table-cell" },
    { key: "condicion", header: "CONDICIÓN", className: "hidden xl:table-cell" },
    { key: "obs", header: "OBS.", className: "hidden 2xl:table-cell" },
    { key: "cargo", header: "CARGO", className: "hidden 2xl:table-cell" },
    { key: "inventariador", header: "INVENTARIADOR", className: "hidden 2xl:table-cell" },
    { key: "inventariadorC", header: "Inventariador(c)", className: "hidden 2xl:table-cell" },
    { key: "fecha", header: "FECHA", className: "hidden sm:table-cell" },
    { key: "unidadOrganica", header: "UNIDAD ORGÁNICA", className: "hidden md:table-cell" },
    { key: "area", header: "ÁREA", className: "hidden lg:table-cell" },
    { key: "oficina", header: "OFICINA", className: "hidden xl:table-cell" },
    { key: "versionPdf", header: "VersiónPdf", className: "hidden 2xl:table-cell" },
    { key: "observacion", header: "OBSERVACIÓN", className: "hidden 2xl:table-cell" },
    { key: "impreso", header: "¿Impreso?", className: "hidden 2xl:table-cell", render: (r) => (r.impreso ? "Sí" : "No") },
    { key: "status", header: "Status", className: "hidden xl:table-cell" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Fichas</h1>
        <p className="text-sm text-muted-foreground">Búsqueda, paginación y filtros por fecha, unidad orgánica, área y oficina.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2">
          <Label htmlFor="q" className="sr-only">Buscar</Label>
          <Input id="q" placeholder="Buscar por persona, unidad u observación" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div>
          <Label className="mb-1 block">Desde</Label>
          <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <Label className="mb-1 block">Hasta</Label>
          <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div>
          <Label className="mb-1 block">Unidad Orgánica</Label>
          <Select value={unidad} onValueChange={setUnidad}>
            <SelectTrigger><SelectValue placeholder="Todas" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {unidades.map((u) => (<SelectItem key={u} value={u}>{u}</SelectItem>))}
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
            <Button variant="outline" size="sm" onClick={() => alert(`Editar ${row.numeroHoja}`)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="sm" onClick={() => alert(`Borrar ${row.numeroHoja}`)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}
