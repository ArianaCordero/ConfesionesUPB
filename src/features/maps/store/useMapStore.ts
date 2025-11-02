import { create } from "zustand";
import type { LatLng, Poi } from "@/src/features/maps/types";

type MapState = {
  userLocation?: LatLng;
  pois: Poi[];
};

type MapActions = {
  setUserLocation: (loc?: LatLng) => void;
  setPois: (pois: Poi[]) => void;
};

export const useMapStore = create<MapState & MapActions>((set) => ({
  userLocation: undefined,
  pois: [],
  setUserLocation: (userLocation) => set({ userLocation }),
  setPois: (pois) => set({ pois }),
}));
