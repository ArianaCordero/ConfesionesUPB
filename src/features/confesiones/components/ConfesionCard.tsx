import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Confesion } from "@/src/features/confesiones/types";
import { CategoryChip } from "./CategoryChip";
import { ImagePreview } from "./ImagePreview";

const cardShadow =
  Platform.OS === "ios"
    ? {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      }
    : { elevation: 2 };

type ConfesionCardProps = {
  confesion: Confesion;
  isFromInterest: boolean;
  liked: boolean;
  facultadColor: string;
  facultadBadge: string;
  catColor: string;
  likedColor: string;
  timeAgoText: string;
  onPress: () => void;
  onToggleLike: () => void;
  onComment: () => void;
  onImagePress?: () => void;
  colors: {
    surface: string;
    border: string;
    subtle: string;
    text: string;
    tabInactive: string;
  };
};

export function ConfesionCard({
  confesion,
  isFromInterest,
  liked,
  facultadColor,
  facultadBadge,
  catColor,
  likedColor,
  timeAgoText,
  onPress,
  onToggleLike,
  onComment,
  onImagePress,
  colors,
}: ConfesionCardProps) {
  return (
    <Pressable
      style={[
        styles.card,
        {
          borderColor: isFromInterest ? facultadColor : colors.border,
          backgroundColor: colors.surface,
          borderWidth: isFromInterest ? 2 : 1,
        },
        cardShadow,
      ]}
      onPress={onPress}
    >
      <View style={styles.rowBetween}>
        <View style={{ flex: 1 }}>
          <View style={styles.row}>
            <Ionicons name="eye-off-outline" size={14} color={colors.subtle} />
            <Text style={[styles.nexo, { color: colors.subtle }]}>
              {confesion.nexo}
            </Text>
            {isFromInterest && (
              <Ionicons name="star" size={12} color={facultadColor} />
            )}
          </View>
          <Text style={[styles.time, { color: colors.subtle }]}>
            {timeAgoText}
          </Text>
        </View>
        <CategoryChip category={confesion.category} color={catColor} />
      </View>

      <Text style={[styles.content, { color: colors.text }]} numberOfLines={3}>
        {confesion.content}
      </Text>

      {confesion.image && (
        <ImagePreview imageSource={confesion.image} onPress={onImagePress} />
      )}

      <View style={styles.rowBetween}>
        <View style={styles.carreraContainer}>
          <Ionicons
            name="school-outline"
            size={14}
            color={isFromInterest ? facultadColor : colors.subtle}
          />
          <Text
            style={[
              styles.carrera,
              {
                color: isFromInterest ? facultadColor : colors.subtle,
              },
            ]}
          >
            {confesion.carrera}
          </Text>
        </View>
        <View
          style={[
            styles.facultadBadge,
            {
              backgroundColor: facultadColor,
            },
          ]}
        >
          <Text style={[styles.facultadBadgeText, { color: colors.surface }]}>
            {facultadBadge}
          </Text>
        </View>
      </View>

      <View style={styles.rowBetween}>
        <Text style={[styles.meta, { color: colors.subtle }]}>
          {confesion.likes} {confesion.likes === 1 ? "like" : "likes"}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            hitSlop={8}
            style={[
              styles.likeBtn,
              {
                borderColor: colors.border,
                backgroundColor: colors.surface,
              },
            ]}
            onPress={onToggleLike}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={18}
              color={liked ? likedColor : colors.tabInactive}
            />
            <Text
              style={[
                styles.likeText,
                {
                  color: liked ? likedColor : colors.tabInactive,
                },
              ]}
            >
              {liked ? "Te gusta" : "Me gusta"}
            </Text>
          </Pressable>

          <Pressable
            hitSlop={8}
            style={[
              styles.likeBtn,
              {
                marginLeft: 10,
                borderColor: colors.border,
                backgroundColor: colors.surface,
              },
            ]}
            onPress={onComment}
          >
            <Ionicons
              name="chatbubble-outline"
              size={18}
              color={colors.tabInactive}
            />
            <Text style={[styles.likeText, { color: colors.tabInactive }]}>
              Comentar
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, borderWidth: 1, padding: 14, gap: 10 },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 6 },
  nexo: { fontSize: 12, fontWeight: "600" },
  time: { fontSize: 11 },
  content: { fontSize: 16 },
  carreraContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  carrera: {
    fontSize: 12,
    fontWeight: "600",
  },
  facultadBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  facultadBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  meta: { fontSize: 12 },
  likeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  likeText: { fontSize: 12, fontWeight: "700" },
});
