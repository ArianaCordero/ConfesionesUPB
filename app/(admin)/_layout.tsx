import React from "react";
import { Stack } from "expo-router";
import RequireAdmin from "../auth/RequireAdmin";
import { useThemeColors } from "../_hooks/useThemeColors";

export default function AdminLayout() {
  const { colors } = useThemeColors();
  return (
    <RequireAdmin>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: "Moderación",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { color: colors.text },
          headerShadowVisible: false,
        }}
      />
    </RequireAdmin>
  );
}

