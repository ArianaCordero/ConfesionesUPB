import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

const cardShadow =
  Platform.OS === "ios"
    ? {
        shadowColor: "black",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      }
    : { elevation: 2 };

type SectionCardProps = {
  label?: string;
  children: React.ReactNode;
  colors: {
    surface: string;
    border: string;
    text: string;
  };
};

export function SectionCard({ label, children, colors }: SectionCardProps) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
        cardShadow,
      ]}
    >
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
});
