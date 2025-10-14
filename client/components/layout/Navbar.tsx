import { NavLink } from "react-router-dom";
import { PackageSearch, Users2, FileSpreadsheet, Boxes } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Inicio", icon: PackageSearch },
  { to: "/usuarios", label: "Usuarios", icon: Users2 },
  { to: "/fichas", label: "Fichas", icon: FileSpreadsheet },
  { to: "/inventario", label: "Inventario_Detalle", icon: PackageSearch },
  { to: "/bienes", label: "Bienes", icon: Boxes },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-primary text-primary-foreground grid place-items-center font-bold">IP</div>
          <span className="font-semibold tracking-tight">Inventario Patrimonial</span>
        </div>
        <nav className="hidden md:flex items-center gap-2">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent",
                  isActive && "bg-primary/10 text-primary hover:text-primary",
                )
              }
            >
              <Icon className="h-4 w-4" /> {label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="md:hidden border-t">
        <nav className="container flex gap-1 py-2 overflow-x-auto">
          {items.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent",
                  isActive && "bg-primary/10 text-primary hover:text-primary",
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
