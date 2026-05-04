// src/utils/helpers.ts

// Función para poner la primera letra en mayúscula
export const capitalizeText = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Función extra por si quieres formatear el ID del Pokémon (ej: #001)
export const formatId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};