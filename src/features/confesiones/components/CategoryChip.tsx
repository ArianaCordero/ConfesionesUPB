import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { Category } from "@/src/features/confesiones/types";

type CategoryChipProps = {
  category: Category;
  color: string;
};

export function CategoryChip({ category, color }: CategoryChipProps) {
  return (
    <View style={[styles.pill, { borderColor: color }]}>
      <Text style={[styles.pillText, { color }]}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pillText: {
    fontSize: 11,
    fontWeight: "600",
  },
});
