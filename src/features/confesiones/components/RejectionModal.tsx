import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Confesion } from "@/src/features/confesiones/types";
import { ModerationActionBar } from "./ModerationActionBar";

type RejectionModalProps = {
  visible: boolean;
  selected: Confesion | null;
  reason: string;
  onChangeReason: (txt: string) => void;
  onApprove: () => void;
  onReject: () => void;
  onClose: () => void;
  activeTab: "pending" | "rejected";
  colors: {
    surface: string;
    border: string;
    text: string;
    subtle: string;
    background: string;
  };
  getCategoryColor: (category: string) => string;
  getCategoryIcon: (category: string) => any;
  timeAgo: (ts: number) => string;
};

export function RejectionModal({
  visible,
  selected,
  reason,
  onChangeReason,
  onApprove,
  onReject,
  onClose,
  activeTab,
  colors,
  getCategoryColor,
  getCategoryIcon,
  timeAgo,
}: RejectionModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.modalOverlay,
          { backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
        ]}
      >
        <View
          style={[
            styles.modalBox,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              maxHeight: "85%",
              width: "90%",
              borderRadius: 16,
              padding: 16,
            },
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {selected && (
              <>
                <View style={styles.modalHeader}>
                  <View
                    style={[
                      styles.categoryBadge,
                      {
                        backgroundColor:
                          getCategoryColor(selected.category) + "15",
                      },
                    ]}
                  >
                    <Ionicons
                      name={getCategoryIcon(selected.category)}
                      size={16}
                      color={getCategoryColor(selected.category)}
                    />
                    <Text
                      style={[
                        styles.categoryText,
                        { color: getCategoryColor(selected.category) },
                      ]}
                    >
                      {selected.category.charAt(0).toUpperCase() +
                        selected.category.slice(1)}
                    </Text>
                  </View>
                  <Pressable onPress={onClose}>
                    <Ionicons name="close" size={24} color={colors.text} />
                  </Pressable>
                </View>

                <Text style={[styles.modalContent, { color: colors.text }]}>
                  {selected.content}
                </Text>

                {selected.image && (
                  <Image
                    source={selected.image}
                    style={{
                      width: "100%",
                      height: 200,
                      borderRadius: 12,
                      marginTop: 8,
                    }}
                    resizeMode="cover"
                  />
                )}

                <View style={styles.modalMeta}>
                  <View style={styles.metaRow}>
                    <Ionicons name="school" size={16} color={colors.subtle} />
                    <Text style={[styles.metaText, { color: colors.subtle }]}>
                      {selected.carrera}
                    </Text>
                  </View>

                  <View style={styles.metaRow}>
                    <Ionicons name="time" size={16} color={colors.subtle} />
                    <Text style={[styles.metaText, { color: colors.subtle }]}>
                      {timeAgo(selected.date)}
                    </Text>
                  </View>
                </View>

                {activeTab === "pending" && (
                  <>
                    <Text style={[styles.modalLabel, { color: colors.text }]}>
                      Motivo de rechazo (opcional):
                    </Text>
                    <TextInput
                      value={reason}
                      onChangeText={onChangeReason}
                      placeholder="Ej: Contenido inapropiado, spam, etc."
                      placeholderTextColor={colors.subtle}
                      multiline
                      style={[
                        styles.reasonInput,
                        {
                          backgroundColor: colors.background,
                          color: colors.text,
                          borderColor: colors.border,
                        },
                      ]}
                    />

                    <ModerationActionBar
                      onApprove={onApprove}
                      onReject={onReject}
                    />
                  </>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  categoryText: { fontSize: 12, fontWeight: "700" },
  modalContent: { fontSize: 16, lineHeight: 24, marginBottom: 16 },
  modalMeta: { flexDirection: "row", gap: 20, marginBottom: 20 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 12, fontWeight: "500" },
  modalLabel: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  reasonInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 16,
  },
});
