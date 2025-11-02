import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type StepHeaderProps = {
  step: number;
  title: string;
  subtitle?: string;
  onBack: () => void;
  colors: {
    text: string;
    subtle: string;
    primary: string;
    border: string;
  };
};

export function StepHeader({
  step,
  title,
  subtitle,
  onBack,
  colors,
}: StepHeaderProps) {
  return (
    <>
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressDot,
              { backgroundColor: step >= 1 ? colors.primary : colors.border },
            ]}
          />
          <View
            style={[
              styles.progressDot,
              { backgroundColor: step >= 2 ? colors.primary : colors.border },
            ]}
          />
          <View
            style={[
              styles.progressDot,
              { backgroundColor: step >= 3 ? colors.primary : colors.border },
            ]}
          />
        </View>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.subtle }]}>
            {subtitle}
          </Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressContainer: {
    flexDirection: "row",
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
});
