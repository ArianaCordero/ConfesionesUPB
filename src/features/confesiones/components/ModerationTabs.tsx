import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TabKey = "pending" | "rejected";

type ModerationTabsProps = {
  active: TabKey;
  counts: { pendientes: number; rechazadas: number };
  onChange: (key: TabKey) => void;
  colors: {
    surface: string;
    primary: string;
    subtle: string;
  };
};

export function ModerationTabs({
  active,
  counts,
  onChange,
  colors,
}: ModerationTabsProps) {
  return (
    <View style={[styles.tabs, { backgroundColor: colors.surface }]}>
      <Pressable
        onPress={() => onChange("pending")}
        style={[
          styles.tab,
          {
            borderBottomColor:
              active === "pending" ? colors.primary : "transparent",
            borderBottomWidth: 3,
          },
        ]}
      >
        <Ionicons
          name="time"
          size={18}
          color={active === "pending" ? colors.primary : colors.subtle}
        />
        <Text
          style={[
            styles.tabText,
            { color: active === "pending" ? colors.primary : colors.subtle },
          ]}
        >
          Pendientes ({counts.pendientes})
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onChange("rejected")}
        style={[
          styles.tab,
          {
            borderBottomColor:
              active === "rejected" ? colors.primary : "transparent",
            borderBottomWidth: 3,
          },
        ]}
      >
        <Ionicons
          name="close-circle"
          size={18}
          color={active === "rejected" ? colors.primary : colors.subtle}
        />
        <Text
          style={[
            styles.tabText,
            { color: active === "rejected" ? colors.primary : colors.subtle },
          ]}
        >
          Rechazadas ({counts.rechazadas})
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: { flexDirection: "row", paddingHorizontal: 16 },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
  },
  tabText: { fontSize: 14, fontWeight: "600" },
});
