import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/table/DataTable";
import { Edit2, Trash2 } from "lucide-react";
import { UsuarioDTO, UsuariosAPI } from "@/services/api";

function demoUsuarios(): UsuarioDTO[] {
  const areas = ["TI", "RRHH", "Logística", "Contabilidad"]; 
  const cargos = ["Analista", "Asistente", "Jefe", "Coordinador"]; 
  const condiciones = ["Activo", "Baja", "Contrato"];
  return Array.from({ length: 42 }).map((_, i) => ({
    id: String(i + 1),
    dni: String(70000000 + i),
    nombres: `Nombre ${i + 1}`,
    apellidoPaterno: `ApellidoP ${i + 1}`,
    apellidoMaterno: `ApellidoM ${i + 1}`,
    condicion: condiciones[i % condiciones.length],
    correo: `usuario${i + 1}@empresa.com`,
    cargo: cargos[i % cargos.length],
    area: areas[i % areas.length],
  }));
}

export default function UsuariosPage() {
  const [rows, setRows] = useState<UsuarioDTO[]>(demoUsuarios());

  useEffect(() => {
    (async () => {
      try {
        const data = await UsuariosAPI.list();
        if (Array.isArray(data) && data.length) setRows(data);
      } catch (e) {
        // keep demo
      }
    })();
  }, []);

  const columns: Column<UsuarioDTO>[] = [
    { key: "dni", header: "DNI", className: "min-w-[100px]" },
    { key: "nombres", header: "NOMBRES", className: "min-w-[160px]" },
    { key: "apellidoPaterno", header: "APELLIDO PATERNO", className: "hidden sm:table-cell" },
    { key: "apellidoMaterno", header: "APELLIDO MATERNO", className: "hidden md:table-cell" },
    { key: "condicion", header: "CONDICIÓN", className: "hidden lg:table-cell" },
    { key: "correo", header: "CORREO ELECTRÓNICO", className: "hidden xl:table-cell" },
    { key: "cargo", header: "CARGO", className: "hidden xl:table-cell" },
    { key: "area", header: "ÁREA", className: "hidden 2xl:table-cell" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Usuarios</h1>
        <p className="text-sm text-muted-foreground">Búsqueda y paginación con acciones por fila.</p>
      </div>

      <DataTable
        data={rows}
        columns={columns}
        actions={(row) => (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => alert(`Editar ${row.nombres}`)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="sm" onClick={() => alert(`Borrar ${row.nombres}`)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}
