export type LatLng = { latitude: number; longitude: number };

export type Poi = {
  id: string;
  title: string;
  description?: string;
  coordinate: LatLng;
  emoji?: string; // opcional para pin "lindo"
  color?: string; // opcional para tint
};
