import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

export interface UsuarioDTO {
  id: string;
  dni: string;
  nombreCompleto: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface BienDTO {
  id: string;
  codigo_patrimonial: string;
  descripcion: string;
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
  numero: string;
  codigo: string;
}

export interface InventarioDetalleDTO {
  id: string;
  fichaId: string;
  ubicacion?: string;
  bien: BienDTO;
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
  async list(params?: { page?: number; pageSize?: number }) {
    const res = await api.get<FichaDTO[]>("/fichas", { params });
    return res.data;
  },
};

export const InventarioAPI = {
  async listDetalle(params?: { fichaId?: string; ubicacion?: string }) {
    const res = await api.get<InventarioDetalleDTO[]>("/inventario-detalle", {
      params,
    });
    return res.data;
  },
};
