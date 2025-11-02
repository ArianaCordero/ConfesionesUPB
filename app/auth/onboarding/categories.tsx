import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "../../hooks/useThemeColors";
import { useUserStore } from "../../store/useUserStore";
import type { Category } from "@/src/features/confesiones/types";
import { StepHeader, NextButton } from "@/src/features/confesiones/components";

const CATEGORIES_INFO: Array<{
  id: Category;
  name: string;
  icon: any;
  description: string;
}> = [
  {
    id: "amor",
    name: "Amor",
    icon: "heart",
    description: "Confesiones sobre relaciones y sentimientos",
  },
  {
    id: "academico",
    name: "Académico",
    icon: "book",
    description: "Temas sobre clases, exámenes y estudios",
  },
  {
    id: "random",
    name: "Random",
    icon: "chatbubbles",
    description: "Confesiones variadas y casuales",
  },
  {
    id: "confesion",
    name: "Confesión",
    icon: "lock-closed",
    description: "Confesiones personales y anónimas",
  },
];

export default function CategoriesScreen() {
  const { colors } = useThemeColors();
  const router = useRouter();

  const preferences = useUserStore((s) => s.preferences);
  const setPreferences = useUserStore((s) => s.setPreferences);
  const setHasCompletedOnboarding = useUserStore(
    (s) => s.setHasCompletedOnboarding
  );

  const [selected, setSelected] = useState<Category[]>(
    preferences.categoriesOfInterest
  );
  const [loading, setLoading] = useState(false);

  const toggleCategory = (category: Category) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((c) => c !== category));
    } else {
      setSelected([...selected, category]);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
  
      setPreferences({
        categoriesOfInterest: selected.length > 0 ? selected : [],
      });

    
      setHasCompletedOnboarding(true);

      router.replace("/(drawer)/(tabs)");
    } catch (error) {
      console.error("Error completing onboarding:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StepHeader
        step={3}
        title="Personaliza tus Categorías"
        subtitle="Selecciona los tipos de confesiones que más te interesan (opcional)"
        onBack={handleBack}
        colors={{
          text: colors.text,
          subtle: colors.subtle,
          primary: colors.primary,
          border: colors.border,
        }}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.categoriesContainer}>
          {CATEGORIES_INFO.map((category) => {
            const isSelected = selected.includes(category.id);
            return (
              <Pressable
                key={category.id}
                onPress={() => toggleCategory(category.id)}
                style={[
                  styles.categoryCard,
                  {
                    backgroundColor: isSelected
                      ? colors.primary + "15"
                      : colors.surface,
                    borderColor: isSelected ? colors.primary : colors.border,
                    borderWidth: isSelected ? 2 : 1,
                  },
                ]}
              >
                <View style={styles.categoryHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      {
                        backgroundColor: isSelected
                          ? colors.primary
                          : colors.primary + "20",
                      },
                    ]}
                  >
                    <Ionicons
                      name={category.icon}
                      size={24}
                      color={isSelected ? colors.surface : colors.primary}
                    />
                  </View>
                  <Ionicons
                    name={
                      isSelected
                        ? "checkmark-circle"
                        : "checkmark-circle-outline"
                    }
                    size={24}
                    color={isSelected ? colors.primary : colors.border}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryName,
                    {
                      color: isSelected ? colors.primary : colors.text,
                    },
                  ]}
                >
                  {category.name}
                </Text>
                <Text style={[styles.categoryDescription, { color: colors.subtle }]}>
                  {category.description}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {selected.length > 0 ? (
          <View
            style={[
              styles.selectedBanner,
              { backgroundColor: colors.primary + "15", borderColor: colors.primary },
            ]}
          >
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            <Text style={[styles.selectedText, { color: colors.primary }]}>
              {selected.length}{" "}
              {selected.length === 1
                ? "categoría seleccionada"
                : "categorías seleccionadas"}
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.selectedBanner,
              { backgroundColor: colors.subtle + "15", borderColor: colors.border },
            ]}
          >
            <Ionicons name="information-circle" size={20} color={colors.subtle} />
            <Text style={[styles.selectedText, { color: colors.subtle }]}>
              Puedes omitir este paso o seleccionar después
            </Text>
          </View>
        )}

        <NextButton
          label="Finalizar"
          onPress={handleFinish}
          loading={loading}
          icon="checkmark"
          colors={{
            primary: colors.primary,
            surface: colors.surface,
            border: colors.border,
            subtle: colors.subtle,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "700",
  },
  categoryDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    gap: 12,
  },
  selectedBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
});
