import axios from "axios";

// Em produção você define NEXT_PUBLIC_API_URL no ambiente/container.
// Em dev, cai no fallback localhost:
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://localhost:3333";

export const api = axios.create({
  baseURL: API_BASE, // ex.: http://api:3333 no Docker
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
});
