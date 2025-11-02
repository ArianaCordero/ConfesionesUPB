import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SelectableChipProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  selectedIcon?: any;
  unselectedIcon?: any;
  colors: {
    primary: string;
    surface: string;
    border: string;
    text: string;
  };
};

export function SelectableChip({
  label,
  isSelected,
  onPress,
  selectedIcon = "checkmark-circle",
  unselectedIcon = "school-outline",
  colors,
}: SelectableChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: isSelected ? colors.primary : colors.surface,
          borderColor: isSelected ? colors.primary : colors.border,
        },
      ]}
    >
      <Ionicons
        name={isSelected ? selectedIcon : unselectedIcon}
        size={20}
        color={isSelected ? colors.surface : colors.text}
      />
      <Text
        style={[
          styles.chipText,
          { color: isSelected ? colors.surface : colors.text },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    minWidth: "100%",
  },
  chipText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
