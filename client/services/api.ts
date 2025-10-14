import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

export interface UsuarioDTO {
  id: string;
  dni: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  condicion: string;
  correo: string;
  cargo: string;
  area: string;
}

export interface BienDTO {
  id: string;
  codigo_patrimonial: string;
  codigo_interno: string;
  descripcion_activo: string;
  marca: string;
  modelo: string;
  serie: string;
  placa: string;
  tipo: string;
  sede: string;
  area: string;
  oficina: string;
}

export interface FichaDTO {
  id: string;
  numeroHoja: string;
  dni: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  condicion: string;
  obs?: string;
  cargo: string;
  inventariador: string;
  inventariadorC?: string;
  fecha: string; // ISO date
  unidadOrganica: string;
  area: string;
  oficina: string;
  versionPdf?: string;
  observacion?: string;
  impreso?: boolean;
  status?: string;
}

export interface InventarioDetalleDTO {
  id: string;
  idDetalle: string;
  numeroFicha: string; // relates to Fichas.numeroHoja
  status?: string;
  codigo_patrimonial: string; // relates to Bienes.codigo_patrimonial
  codigo_interno: string;
  denominacion: string;
  marca: string;
  modelo: string;
  serie: string;
  placa: string;
  tipo: string;
  color?: string;
  dimension?: string;
  estado?: string;
  situacion?: string;
  codInt2023?: string;
  observacion?: string;
  cantidad: number;
  dni: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  unidadOrganica: string;
  area: string;
  oficina: string;
  cargo: string;
  inventario?: string;
  fecha: string; // ISO date
  sede?: string;
}

// Example API calls: these endpoints are placeholders to integrate with your backend.
export const UsuariosAPI = {
  async list(params?: { page?: number; pageSize?: number; q?: string }) {
    const res = await api.get<UsuarioDTO[]>("/usuarios", { params });
    return res.data;
  },
  async remove(id: string) {
    await api.delete(`/usuarios/${id}`);
  },
  async update(id: string, payload: Partial<UsuarioDTO>) {
    const res = await api.put<UsuarioDTO>(`/usuarios/${id}`, payload);
    return res.data;
  },
};

export const BienesAPI = {
  async list(params?: {
    page?: number;
    pageSize?: number;
    q?: string;
    sede?: string;
    area?: string;
    oficina?: string;
  }) {
    const res = await api.get<BienDTO[]>("/bienes", { params });
    return res.data;
  },
  async create(payload: Omit<BienDTO, "id">) {
    const res = await api.post<BienDTO>("/bienes", payload);
    return res.data;
  },
  async update(id: string, payload: Partial<BienDTO>) {
    const res = await api.put<BienDTO>(`/bienes/${id}`, payload);
    return res.data;
  },
  async remove(id: string) {
    await api.delete(`/bienes/${id}`);
  },
};

export const FichasAPI = {
  async list(params?: { page?: number; pageSize?: number; from?: string; to?: string; unidadOrganica?: string; area?: string; oficina?: string; q?: string }) {
    const res = await api.get<FichaDTO[]>("/fichas", { params });
    return res.data;
  },
};

export const InventarioAPI = {
  async listDetalle(params?: { numeroFicha?: string; sede?: string; area?: string; oficina?: string; q?: string }) {
    const res = await api.get<InventarioDetalleDTO[]>("/inventario-detalle", {
      params,
    });
    return res.data;
  },
};
