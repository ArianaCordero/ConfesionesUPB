import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Category } from "@/src/features/confesiones/types";

type StatusBadgeProps = {
  category: Category;
  categoryColor: string;
  categoryIcon: any;
};

export function StatusBadge({ category, categoryColor, categoryIcon }: StatusBadgeProps) {
  return (
    <View
      style={[
        styles.categoryBadge,
        { backgroundColor: categoryColor + "15" },
      ]}
    >
      <Ionicons name={categoryIcon} size={14} color={categoryColor} />
      <Text style={[styles.categoryText, { color: categoryColor }]}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
