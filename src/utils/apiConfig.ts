// src/utils/apiConfig.ts
export const API_CONFIG = {
  BASE_URL: 'https://pokeapi.co/api/v2/',
  API_KEY: import.meta.env.VITE_API_KEY || 'default-id', // Cambia API_ID por API_KEY
  TIMEOUT: 5000,
};