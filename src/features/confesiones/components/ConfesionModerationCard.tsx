import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Confesion } from "@/src/features/confesiones/types";

type ConfesionModerationCardProps = {
  item: Confesion;
  onPress: () => void;
  categoryColor: string;
  categoryIcon: any;
  timeAgoText: string;
  onApprove?: () => void;
  onReject?: () => void;
  showActions: boolean;
  colors: {
    surface: string;
    border: string;
    text: string;
    subtle: string;
  };
};

export function ConfesionModerationCard({
  item,
  onPress,
  categoryColor,
  categoryIcon,
  timeAgoText,
  onApprove,
  onReject,
  showActions,
  colors,
}: ConfesionModerationCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
      android_ripple={{ color: colors.border }}
    >
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: categoryColor + "15" },
          ]}
        >
          <Ionicons name={categoryIcon} size={14} color={categoryColor} />
          <Text style={[styles.categoryText, { color: categoryColor }]}>
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </Text>
        </View>
        <Text style={[styles.timeText, { color: colors.subtle }]}>
          {timeAgoText}
        </Text>
      </View>

      <Text numberOfLines={3} style={[styles.content, { color: colors.text }]}>
        {item.content}
      </Text>

      {item.image && (
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      )}

      <View style={styles.cardFooter}>
        <View style={styles.metaInfo}>
          <Ionicons name="school" size={14} color={colors.subtle} />
          <Text style={[styles.metaText, { color: colors.subtle }]}>
            {item.carrera}
          </Text>
        </View>

        {showActions && (
          <View style={styles.actionButtons}>
            <Pressable
              style={[
                styles.actionBtn,
                {
                  backgroundColor: "#27ae60" + "15",
                  borderColor: "#27ae60",
                },
              ]}
              onPress={(e) => {
                e.stopPropagation();
                onApprove?.();
              }}
            >
              <Ionicons name="checkmark" size={16} color="#27ae60" />
            </Pressable>

            <Pressable
              style={[
                styles.actionBtn,
                {
                  backgroundColor: "#e74c3c" + "15",
                  borderColor: "#e74c3c",
                },
              ]}
              onPress={(e) => {
                e.stopPropagation();
                onReject?.();
              }}
            >
              <Ionicons name="close" size={16} color="#e74c3c" />
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 12 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  timeText: { fontSize: 12 },
  content: { fontSize: 15, lineHeight: 22 },
  image: { width: "100%", height: 180, borderRadius: 12 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaInfo: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 12, fontWeight: "500" },
  actionButtons: { flexDirection: "row", gap: 8 },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
