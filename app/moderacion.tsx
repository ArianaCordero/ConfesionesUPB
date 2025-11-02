import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useConfesionesStore } from "./store/useConfesionesStore";
import { useThemeColors } from "./hooks/useThemeColors";
import type { Confesion } from "@/src/features/confesiones/types";
import { ModerationTabs, ModerationActionBar, RejectionModal, ConfesionModerationCard } from "@/src/features/confesiones/components";

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Ahora";
  if (m < 60) return `Hace ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `Hace ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 2) return "Hace un día";
  return `Hace ${d} días`;
}

export default function Moderacion() {
  const { colors } = useThemeColors();
  const pendientes = useConfesionesStore((s) => s.pendientes);
  const rechazadas = useConfesionesStore((s) => s.rechazadas);
  const approve = useConfesionesStore((s) => s.approve);
  const reject = useConfesionesStore((s) => s.reject);

  const [selected, setSelected] = useState<Confesion | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [activeTab, setActiveTab] = useState<"pending" | "rejected">("pending");

  const handleApprove = async (id: number) => {
    try {
      await approve(id);
      setSelected(null);
      Alert.alert("Aprobada", "La confesión ha sido aprobada correctamente");
    } catch {
      Alert.alert("Error", "No se pudo aprobar la confesión");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await reject(id, rejectionReason || undefined);
      setSelected(null);
      setRejectionReason("");
      Alert.alert("Rechazada", "La confesión ha sido rechazada");
    } catch {
      Alert.alert("Error", "No se pudo rechazar la confesión");
    }
  };

  const currentData = activeTab === "pending" ? pendientes : rechazadas;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "amor":
        return "#e74c3c";
      case "academico":
        return "#3498db";
      case "random":
        return "#9b59b6";
      case "confesion":
        return "#f39c12";
      default:
        return colors.primary;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "amor":
        return "heart";
      case "academico":
        return "book";
      case "random":
        return "chatbubbles";
      case "confesion":
        return "lock-closed";
      default:
        return "document-text";
    }
  };

  return (
    
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
  
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: "#f39c12" + "20" }]}>
            <Ionicons name="time" size={24} color="#f39c12" />
          </View>
          <View>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {pendientes.length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.subtle }]}>
              Pendientes
            </Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: "#e74c3c" + "20" }]}>
            <Ionicons name="close-circle" size={24} color="#e74c3c" />
          </View>
          <View>
            <Text style={[styles.statNumber, { color: colors.text }]}>
              {rechazadas.length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.subtle }]}>
              Rechazadas
            </Text>
          </View>
        </View>
      </View>


      <ModerationTabs
        active={activeTab}
        counts={{ pendientes: pendientes.length, rechazadas: rechazadas.length }}
        onChange={setActiveTab}
        colors={{
          surface: colors.surface,
          primary: colors.primary,
          subtle: colors.subtle,
        }}
      />

 
      <FlatList
        data={currentData}
        keyExtractor={(x) => String(x.id)}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View
              style={[styles.emptyIcon, { backgroundColor: colors.primary + "15" }]}
            >
              <Ionicons
                name={
                  activeTab === "pending"
                    ? "checkmark-done"
                    : "information-circle"
                }
                size={48}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              {activeTab === "pending"
                ? "No hay confesiones pendientes"
                : "No hay confesiones rechazadas"}
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.subtle }]}>
              {activeTab === "pending"
                ? "Todas las confesiones han sido revisadas"
                : "No has rechazado ninguna confesión aún"}
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const categoryColor = getCategoryColor(item.category);
          const categoryIcon = getCategoryIcon(item.category);

          return (
            <ConfesionModerationCard
              item={item}
              onPress={() => setSelected(item)}
              categoryColor={categoryColor}
              categoryIcon={categoryIcon}
              timeAgoText={timeAgo(item.date)}
              onApprove={() => handleApprove(item.id)}
              onReject={() => setSelected(item)}
              showActions={activeTab === "pending"}
              colors={{
                surface: colors.surface,
                border: colors.border,
                text: colors.text,
                subtle: colors.subtle,
              }}
            />
          );
        }}
      />

      <RejectionModal
        visible={!!selected}
        selected={selected}
        reason={rejectionReason}
        onChangeReason={setRejectionReason}
        onApprove={() => selected && handleApprove(selected.id)}
        onReject={() => selected && handleReject(selected.id)}
        onClose={() => {
          setSelected(null);
          setRejectionReason("");
        }}
        activeTab={activeTab}
        colors={{
          surface: colors.surface,
          border: colors.border,
          text: colors.text,
          subtle: colors.subtle,
          background: colors.background,
        }}
        getCategoryColor={getCategoryColor}
        getCategoryIcon={getCategoryIcon}
        timeAgo={timeAgo}
      />

    </View>
    
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  statCard: { flexDirection: "row", alignItems: "center", gap: 12 },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: { fontSize: 20, fontWeight: "bold" },
  statLabel: { fontSize: 12 },
  listContent: { padding: 16, gap: 12 },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  emptySubtitle: { fontSize: 14, textAlign: "center" },
 });
