import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ModerationActionBarProps = {
  onApprove: () => void;
  onReject: () => void;
  disabled?: boolean;
};

export function ModerationActionBar({
  onApprove,
  onReject,
  disabled = false,
}: ModerationActionBarProps) {
  return (
    <View style={styles.modalButtons}>
      <Pressable
        style={[styles.modalBtn, { backgroundColor: "#27ae60" }]}
        onPress={onApprove}
        disabled={disabled}
      >
        <Ionicons name="checkmark-circle" size={20} color="white" />
        <Text style={styles.modalBtnText}>Aprobar</Text>
      </Pressable>

      <Pressable
        style={[styles.modalBtn, { backgroundColor: "#e74c3c" }]}
        onPress={onReject}
        disabled={disabled}
      >
        <Ionicons name="close-circle" size={20} color="white" />
        <Text style={styles.modalBtnText}>Rechazar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 10,
  },
  modalBtnText: {
    color: "white",
    marginLeft: 6,
    fontWeight: "600",
  },
});
