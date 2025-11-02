import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type UploadImageButtonProps = {
  onPress: () => void;
  textColor: string;
};

export function UploadImageButton({ onPress, textColor }: UploadImageButtonProps) {
  return (
    <Pressable style={styles.cameraButton} onPress={onPress}>
      <Ionicons name="camera-outline" size={22} color={textColor} />
      <Text style={[styles.cameraText, { color: textColor }]}>Agregar imagen</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  cameraText: {
    fontSize: 13,
    fontWeight: "500",
  },
});
