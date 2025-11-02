import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import type { Confesion, Category, Carrera } from "@/src/features/confesiones/types";
import * as repo from "@/src/features/confesiones/services/repo";

// Re-export types from repo for backward compatibility
export type {
  ModerationLogEntry,
  ModeratorInfo,
  ConfesionModerada,
} from "@/src/features/confesiones/services/repo";

type ConfesionModerada = repo.ConfesionModerada;
type ModeratorInfo = repo.ModeratorInfo;

type State = {
  pendientes: ConfesionModerada[];
  aprobadas: ConfesionModerada[];
  rechazadas: ConfesionModerada[];
  likedIds: number[];
};

type Actions = {
  addPendiente: (c: { content: string; category: Category; carrera: string; image?: any }) => Promise<boolean>;
  approve: (id: number, moderator?: ModeratorInfo) => Promise<void>;
  reject: (id: number, reason?: string, moderator?: ModeratorInfo) => Promise<void>;
  toggleLike: (id: number) => Promise<void>;
  seed: (aprobadas: ConfesionModerada[], pendientes: ConfesionModerada[], rechazadas?: ConfesionModerada[]) => void;
  clearStorage: () => Promise<void>;
  getAprobadasSorted: (carrerasDeInteres: Carrera[]) => ConfesionModerada[];
  loadConfesiones: () => Promise<void>;
};

export const useConfesionesStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      pendientes: [],
      aprobadas: [],
      rechazadas: [],
      likedIds: [],


      addPendiente: async ({ content, category, carrera, image }) => {
        const result = await repo.createConfesion({ content, category, carrera, image });

        if (result.success && result.confesion) {
          set((s) => ({
            pendientes: [result.confesion!, ...s.pendientes],
          }));
          Alert.alert("Enviado", "Tu confesión está en revisión");
          return true;
        }
        return false;
      },

      approve: async (id, moderator) => {
        const { pendientes } = get();
        const c = pendientes.find((x) => x.id === id);
        if (!c) return;

        const result = await repo.approveConfesion(id, moderator);

        if (result.success) {
          set((s) => {
            const updated = {
              ...c,
              firebaseId: result.firebaseId ?? c.firebaseId,
              status: "approved" as const,
              approvedAt: result.approvedAt,
              approvedBy: result.moderatorName ?? null,
              rejectedAt: null,
              rejectionReason: null,
              date: result.approvedAt!,
              moderationLogs: [...(c.moderationLogs ?? []), result.log!],
            };
            return {
              pendientes: s.pendientes.filter((x) => x.id !== id),
              aprobadas: [updated, ...s.aprobadas.filter((x) => x.id !== id)],
              rechazadas: s.rechazadas.filter((x) => x.id !== id),
            };
          });
        }
      },

      reject: async (id, reason, moderator) => {
        const { pendientes } = get();
        const c = pendientes.find((x) => x.id === id);
        if (!c) return;

        const result = await repo.rejectConfesion(id, reason, moderator);

        if (result.success) {
          set((s) => {
            const updated = {
              ...c,
              firebaseId: result.firebaseId ?? c.firebaseId,
              status: "rejected" as const,
              approvedAt: null,
              approvedBy: null,
              rejectedAt: result.rejectedAt,
              rejectionReason: result.rejectionReason,
              moderationLogs: [...(c.moderationLogs ?? []), result.log!],
            };
            return {
              pendientes: s.pendientes.filter((x) => x.id !== id),
              rechazadas: [updated, ...s.rechazadas.filter((x) => x.id !== id)],
            };
          });
        }
      },


      toggleLike: async (id) => {
        const { likedIds } = get();
        const has = likedIds.includes(id);

        const result = await repo.toggleConfesionLike(id, has);

        if (result.success) {
          set((s) => ({
            likedIds: has
              ? s.likedIds.filter((x) => x !== id)
              : [...s.likedIds, id],
            aprobadas: s.aprobadas.map((c) =>
              c.id === id ? { ...c, likes: result.newLikeCount ?? c.likes } : c
            ),
          }));
        }
      },


      seed: (aprobadas, pendientes, rechazadas) =>
        set({
          aprobadas: aprobadas.map((c) => ({
            ...c,
            status: c.status ?? "approved",
            moderationLogs: c.moderationLogs ?? [],
          })),
          pendientes: pendientes.map((c) => ({
            ...c,
            status: c.status ?? "pending",
            moderationLogs: c.moderationLogs ?? [],
          })),
          rechazadas: (rechazadas ?? []).map((c) => ({
            ...c,
            status: c.status ?? "rejected",
            moderationLogs: c.moderationLogs ?? [],
          })),
        }),

      clearStorage: async () => {
        await AsyncStorage.removeItem("confesiones-storage");
        set({ pendientes: [], aprobadas: [], rechazadas: [], likedIds: [] });
      },

      getAprobadasSorted: (carrerasDeInteres) => {
        const { aprobadas } = get();
        if (carrerasDeInteres.length === 0)
          return [...aprobadas].sort((a, b) => b.date - a.date);

        const confesionesDeInteres: Confesion[] = [];
        const confesionesOtras: Confesion[] = [];

        aprobadas.forEach((conf) => {
          if (carrerasDeInteres.includes(conf.carrera as Carrera))
            confesionesDeInteres.push(conf);
          else confesionesOtras.push(conf);
        });

        confesionesDeInteres.sort((a, b) => b.date - a.date);
        confesionesOtras.sort((a, b) => b.date - a.date);

        return [...confesionesDeInteres, ...confesionesOtras];
      },


      loadConfesiones: async () => {
        const result = await repo.loadConfesionesByStatus();
        set({
          pendientes: result.pendientes,
          aprobadas: result.aprobadas,
          rechazadas: result.rechazadas,
        });
      },
    }),
    {
      name: "confesiones-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
