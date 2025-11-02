import React from "react";
import { Text, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type NextButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: any;
  colors: {
    primary: string;
    surface: string;
    border: string;
    subtle: string;
  };
};

export function NextButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  icon = "arrow-forward",
  colors,
}: NextButtonProps) {
  const isDisabled = disabled || loading;
  const backgroundColor = isDisabled ? colors.border : colors.primary;
  const textColor = isDisabled ? colors.subtle : colors.surface;

  return (
    <Pressable
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.surface} />
      ) : (
        <>
          <Text style={[styles.buttonText, { color: textColor }]}>
            {label}
          </Text>
          <Ionicons name={icon} size={20} color={textColor} />
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
