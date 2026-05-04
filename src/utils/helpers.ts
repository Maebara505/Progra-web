
export const capitalizeText = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};


export const formatId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};