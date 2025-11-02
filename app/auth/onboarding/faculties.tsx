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
import { FACULTADES_DISPONIBLES, type Facultad } from "@/src/features/confesiones/types";
import { StepHeader } from "@/src/features/confesiones/components";

export default function FacultiesScreen() {
  const { colors } = useThemeColors();
  const router = useRouter();

  const facultadesDeInteres = useUserStore((s) => s.facultadesDeInteres);
  const setFacultadesDeInteres = useUserStore((s) => s.setFacultadesDeInteres);

  const [selected, setSelected] = useState<Facultad[]>(facultadesDeInteres);

  const toggleFacultad = (facultad: Facultad) => {
    if (selected.includes(facultad)) {
      setSelected(selected.filter((f) => f !== facultad));
    } else {
      setSelected([...selected, facultad]);
    }
  };

  const handleContinue = () => {
    setFacultadesDeInteres(selected);
    router.push("/auth/onboarding/careers");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StepHeader
        step={1}
        title="Selecciona tus Facultades"
        subtitle="Elige una o más facultades de tu interés"
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

        <View style={styles.chipsContainer}>
          {FACULTADES_DISPONIBLES.map((facultad) => {
            const isSelected = selected.includes(facultad);
            return (
              <Pressable
                key={facultad}
                onPress={() => toggleFacultad(facultad)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected
                      ? colors.primary
                      : colors.surface,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}
              >
                <Ionicons
                  name={isSelected ? "checkmark-circle" : "school-outline"}
                  size={20}
                  color={isSelected ? colors.surface : colors.text}
                />
                <Text
                  style={[
                    styles.chipText,
                    { color: isSelected ? colors.surface : colors.text },
                  ]}
                >
                  {facultad}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {selected.length > 0 && (
          <View
            style={[
              styles.selectedBanner,
              { backgroundColor: colors.primary + "15", borderColor: colors.primary },
            ]}
          >
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            <Text style={[styles.selectedText, { color: colors.primary }]}>
              {selected.length} {selected.length === 1 ? "facultad seleccionada" : "facultades seleccionadas"}
            </Text>
          </View>
        )}

        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: selected.length > 0 ? colors.primary : colors.border,
            },
          ]}
          onPress={handleContinue}
          disabled={selected.length === 0}
        >
          <Text
            style={[
              styles.buttonText,
              { color: selected.length > 0 ? colors.surface : colors.subtle },
            ]}
          >
            Continuar
          </Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color={selected.length > 0 ? colors.surface : colors.subtle}
          />
        </Pressable>
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
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    minWidth: "100%",
  },
  chipText: {
    fontSize: 15,
    fontWeight: "600",
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
  },
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
