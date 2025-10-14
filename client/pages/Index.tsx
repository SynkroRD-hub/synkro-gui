import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";

export default function Index() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border bg-white/70 p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventario Patrimonial</h1>
            <p className="mt-1 text-muted-foreground">Gestión moderna de usuarios, bienes, fichas e inventarios. Interfaz responsiva con búsqueda, filtros, paginación y exportación.</p>
          </div>
          <div className="flex gap-2">
            <a href="/bienes" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">Ir a Bienes</a>
            <a href="/usuarios" className="inline-flex items-center rounded-md border px-4 py-2 text-sm">Usuarios</a>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-xs text-muted-foreground">Usuarios</p>
          <p className="mt-1 text-2xl font-semibold">Gestión</p>
          <p className="mt-2 text-sm text-muted-foreground">Altas, edición y baja de usuarios con búsqueda y paginación.</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-xs text-muted-foreground">Bienes</p>
          <p className="mt-1 text-2xl font-semibold">Catálogo</p>
          <p className="mt-2 text-sm text-muted-foreground">Filtros por Sede/Área, exportación a Excel y botón flotante "+".</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-xs text-muted-foreground">Fichas</p>
          <p className="mt-1 text-2xl font-semibold">Control</p>
          <p className="mt-2 text-sm text-muted-foreground">Tabla de fichas con edición y eliminación por fila.</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <p className="text-xs text-muted-foreground">Inventario</p>
          <p className="mt-1 text-2xl font-semibold">Detalle</p>
          <p className="mt-2 text-sm text-muted-foreground">Bienes asociados por ficha o ubicación; acciones por fila.</p>
        </div>
      </section>

      <section className="rounded-xl border bg-white/70 p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Comienza por el módulo de Bienes</h2>
        <p className="text-sm text-muted-foreground">Incluye búsqueda, filtros, paginación, exportación y botón flotante para crear bienes. Totalmente responsivo.</p>
        <a href="/bienes" className="mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">Abrir Bienes</a>
      </section>
    </div>
  );
}
