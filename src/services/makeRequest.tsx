import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function makeRequest(url: string, options?: {}) {
  const response = await api(url, options).catch(function (error) {
    return Promise.reject(error);
  });

  return response;
}
