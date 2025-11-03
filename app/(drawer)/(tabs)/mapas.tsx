import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useThemeColors } from "@/app/hooks/useThemeColors";
import React from "react";
import { MapViewCard } from "@/src/features/maps/components/MapViewCard";
import { LocateButton } from "@/src/features/maps/components/LocateButton";
import {
  requestForegroundPermissions,
  getCurrentPosition,
} from "@/src/features/maps/services/location";
import { loadCampusPois } from "@/src/features/maps/services/pois";
import type { LatLng, Poi } from "@/src/features/maps/types";

// Región por defecto: El Prado (Centro de La Paz)
const DEFAULT_REGION = {
  latitude: -16.49965,
  longitude: -68.13429,
  latitudeDelta: 0.06,
  longitudeDelta: 0.06,
};

export default function MapasScreen() {
  const { colors } = useThemeColors();
  const [userLocation, setUserLocation] = useState<LatLng | undefined>();
  const [pois, setPois] = useState<Poi[]>([]);
  const [isLocating, setIsLocating] = useState(false);

  // Efecto inicial: pedir permisos y cargar datos
  useEffect(() => {
    async function initialize() {
      // Cargar POIs
      const campusPois = await loadCampusPois();
      setPois(campusPois);

      // Pedir permiso de ubicación
      const granted = await requestForegroundPermissions();
      if (granted) {
        try {
          const position = await getCurrentPosition();
          setUserLocation(position);
        } catch (error) {
          console.warn("No se pudo obtener la ubicación inicial:", error);
        }
      } else {
        Alert.alert(
          "Ubicación no disponible",
          "No se pudo acceder a tu ubicación. El mapa se mostrará en el centro del campus."
        );
      }
    }

    initialize();
  }, []);

  // Handler para recentrar en la ubicación del usuario
  const handleLocateUser = async () => {
    setIsLocating(true);
    try {
      const position = await getCurrentPosition();
      setUserLocation(position);
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo obtener tu ubicación. Verifica que los permisos estén habilitados."
      );
    } finally {
      setIsLocating(false);
    }
  };

  // Determinar la región inicial
  const initialRegion = userLocation
    ? {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : DEFAULT_REGION;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MapViewCard
        key={userLocation ? `${userLocation.latitude.toFixed(5)},${userLocation.longitude.toFixed(5)}` : "default"}
        initialRegion={initialRegion}
        userLocation={userLocation}
        pois={pois}
        onMarkerPress={(poi) => {
          Alert.alert(poi.title, poi.description || "Punto de interés");
        }}
      />
      <LocateButton onPress={handleLocateUser} disabled={isLocating} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
