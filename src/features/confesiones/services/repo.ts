import { db, auth } from "@/src/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import type { Category, Confesion } from "@/src/features/confesiones/types";

export type ModerationLogEntry = {
  id?: string;
  action: "approved" | "rejected";
  timestamp: number;
  user: { id?: string; name?: string | null };
  reason?: string | null;
};

export type ModeratorInfo = { id?: string; name?: string | null };

export type ConfesionModerada = Confesion & {
  firebaseId?: string;
  status?: "pending" | "approved" | "rejected";
  approvedAt?: number | null;
  approvedBy?: string | null;
  rejectedAt?: number | null;
  rejectionReason?: string | null;
  moderationLogs?: ModerationLogEntry[];
};

/**
 * Crea una nueva confesión en estado "pending"
 */
export async function createConfesion(params: {
  content: string;
  category: Category;
  carrera: string;
  image?: any;
}): Promise<{ success: boolean; confesion?: ConfesionModerada; docId?: string }> {
  const { content, category, carrera, image } = params;
  const id = Math.floor(Math.random() * 1_000_000) + 1000;
  const nueva: ConfesionModerada = {
    id,
    content,
    category,
    carrera,
    date: Date.now(),
    likes: 0,
    image: image || null,
    nexo: "Anónimo",
    status: "pending",
    moderationLogs: [],
  };

  try {
    const ref = await addDoc(collection(db, "confesiones"), nueva);
    return {
      success: true,
      confesion: { ...nueva, firebaseId: ref.id },
      docId: ref.id,
    };
  } catch (err) {
    console.error("Error al agregar confesión:", err);
    return { success: false };
  }
}

/**
 * Aprueba una confesión (cambia status a "approved")
 */
export async function approveConfesion(
  id: number,
  moderator?: ModeratorInfo
): Promise<{
  success: boolean;
  approvedAt?: number;
  moderatorName?: string | null;
  log?: ModerationLogEntry;
  firebaseId?: string;
}> {
  const approvedAt = Date.now();
  const moderatorInfo = moderator ?? {
    id: auth.currentUser?.uid ?? "unknown",
    name: auth.currentUser?.displayName ?? "Moderador",
  };
  const userPayload = {
    id: moderatorInfo.id ?? "unknown",
    name: moderatorInfo.name ?? "Moderador",
  };

  let logForState: ModerationLogEntry = {
    action: "approved",
    timestamp: approvedAt,
    user: userPayload,
    reason: null,
  };

  try {
    const q = query(collection(db, "confesiones"), where("id", "==", id));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return { success: false };

    await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const confRef = doc(db, "confesiones", docSnap.id);
        const logRef = await addDoc(collection(confRef, "moderationLogs"), logForState);
        logForState = { ...logForState, id: logRef.id };
        await updateDoc(confRef, {
          status: "approved",
          approvedAt,
          approvedBy: userPayload.name,
          rejectedAt: null,
          rejectionReason: null,
          date: approvedAt,
        });
      })
    );

    return {
      success: true,
      approvedAt,
      moderatorName: userPayload.name,
      log: logForState,
      firebaseId: snapshot.docs[0]?.id,
    };
  } catch (err) {
    console.error("Error al aprobar:", err);
    return { success: false };
  }
}

/**
 * Rechaza una confesión (cambia status a "rejected")
 */
export async function rejectConfesion(
  id: number,
  reason?: string,
  moderator?: ModeratorInfo
): Promise<{
  success: boolean;
  rejectedAt?: number;
  rejectionReason?: string | null;
  log?: ModerationLogEntry;
  firebaseId?: string;
}> {
  const rejectedAt = Date.now();
  const cleanedReason = reason?.trim() || null;
  const moderatorInfo = moderator ?? {
    id: auth.currentUser?.uid ?? "unknown",
    name: auth.currentUser?.displayName ?? "Moderador",
  };
  const userPayload = {
    id: moderatorInfo.id ?? "unknown",
    name: moderatorInfo.name ?? "Moderador",
  };

  let logForState: ModerationLogEntry = {
    action: "rejected",
    timestamp: rejectedAt,
    user: userPayload,
    reason: cleanedReason,
  };

  try {
    const q = query(collection(db, "confesiones"), where("id", "==", id));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return { success: false };

    await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const confRef = doc(db, "confesiones", docSnap.id);
        const logRef = await addDoc(collection(confRef, "moderationLogs"), logForState);
        logForState = { ...logForState, id: logRef.id };

        await updateDoc(confRef, {
          status: "rejected",
          rejectedAt,
          rejectionReason: cleanedReason,
        });
      })
    );

    return {
      success: true,
      rejectedAt,
      rejectionReason: cleanedReason,
      log: logForState,
      firebaseId: snapshot.docs[0]?.id,
    };
  } catch (err) {
    console.error(" Error al rechazar:", err);
    return { success: false };
  }
}

/**
 * Alterna el estado de "like" para una confesión
 */
export async function toggleConfesionLike(
  id: number,
  currentlyLiked: boolean
): Promise<{ success: boolean; newLikeCount?: number }> {
  const user = auth.currentUser;
  if (!user) {
    console.warn("Usuario no autenticado");
    return { success: false };
  }

  try {
    const q = query(collection(db, "confesiones"), where("id", "==", id));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return { success: false };

    let newLikeCount = 0;

    await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const confRef = doc(db, "confesiones", docSnap.id);
        const likeRef = doc(collection(confRef, "likes"), user.uid);
        const currentLikes = docSnap.data().likes || 0;

        if (currentlyLiked) {
          await deleteDoc(likeRef);
          newLikeCount = currentLikes - 1;
          await updateDoc(confRef, { likes: newLikeCount });
        } else {
          await setDoc(likeRef, { likedAt: Date.now() });
          newLikeCount = currentLikes + 1;
          await updateDoc(confRef, { likes: newLikeCount });
        }
      })
    );

    return { success: true, newLikeCount };
  } catch (err) {
    console.error("❌ Error al cambiar like:", err);
    return { success: false };
  }
}

/**
 * Carga todas las confesiones desde Firestore agrupadas por estado
 */
export async function loadConfesionesByStatus(): Promise<{
  pendientes: ConfesionModerada[];
  aprobadas: ConfesionModerada[];
  rechazadas: ConfesionModerada[];
}> {
  try {
    const confesionesRef = collection(db, "confesiones");
    const [pendingSnap, approvedSnap, rejectedSnap] = await Promise.all([
      getDocs(query(confesionesRef, where("status", "==", "pending"))),
      getDocs(query(confesionesRef, where("status", "==", "approved"))),
      getDocs(query(confesionesRef, where("status", "==", "rejected"))),
    ]);

    const mapDocs = (snap: typeof pendingSnap) =>
      snap.docs.map((docSnap) => {
        const data = docSnap.data() as ConfesionModerada;
        return {
          ...data,
          firebaseId: docSnap.id,
          moderationLogs: data.moderationLogs ?? [],
        };
      });

    return {
      pendientes: mapDocs(pendingSnap),
      aprobadas: mapDocs(approvedSnap).sort((a, b) => (b.date ?? 0) - (a.date ?? 0)),
      rechazadas: mapDocs(rejectedSnap).sort(
        (a, b) => (b.rejectedAt ?? 0) - (a.rejectedAt ?? 0)
      ),
    };
  } catch (err) {
    console.error("❌ Error al cargar confesiones:", err);
    return { pendientes: [], aprobadas: [], rechazadas: [] };
  }
}
