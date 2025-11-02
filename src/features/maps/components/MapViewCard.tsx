import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import type { Poi, LatLng } from "@/src/features/maps/types";

type Props = {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  userLocation?: LatLng;
  pois: Poi[];
  onMarkerPress?: (poi: Poi) => void;
};

export function MapViewCard({
  initialRegion,
  userLocation,
  pois,
  onMarkerPress,
}: Props) {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {/* Marcador de ubicación del usuario */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Tu ubicación"
            pinColor="blue"
          />
        )}

        {/* Marcadores de POIs */}
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            coordinate={poi.coordinate}
            title={poi.title}
            description={poi.description}
            pinColor={poi.color || "red"}
            onPress={() => onMarkerPress?.(poi)}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
