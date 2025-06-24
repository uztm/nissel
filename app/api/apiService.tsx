import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000";

// --- 1. Axios instance ---
export const api = axios.create({
  baseURL: BASE_URL,
});

export const crud = {
  loadAll: async (resource: any) => {
    const response = await api.get(`/${resource}`);
    return response.data;
  },

  loadAllById: async (resource: string, id: any) => {
    console.log(`Loading all items for resource: ${resource} with ID: ${id}`);

    const response = await api.get(`/${resource}/${id}`);
    return response.data;
  },

  create: async (resource: string, data: any) => {
    const response = await api.post(`/${resource}`, data);
    return response.data;
  },
};
