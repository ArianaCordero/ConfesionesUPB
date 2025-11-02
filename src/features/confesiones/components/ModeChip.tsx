import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

type ModeChipProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  chipColor: string;
  textColor: string;
  borderColor: string;
  backgroundColor: string;
  rippleColor: string;
};

export function ModeChip({
  label,
  isSelected,
  onPress,
  chipColor,
  textColor,
  borderColor,
  backgroundColor,
  rippleColor,
}: ModeChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        { borderColor, backgroundColor },
      ]}
      android_ripple={{ color: rippleColor }}
    >
      <Text style={[styles.chipText, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
