export interface PokemonItem {
  id: number;
  name: string;
  thumbnail: string;
}

export interface PokemonDetail {
  name: string;
  highResImage: string;
  types: string;
  weight: number;
  height: number;
}