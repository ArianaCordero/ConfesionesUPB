import React from "react";
import { View, TextInput, Pressable, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CommentInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onPickImage: () => void;
  onRemoveImage: () => void;
  imageUri: string | null;
  uploading: boolean;
  colors: {
    text: string;
    inputBg: string;
    inputPlaceholder: string;
    border: string;
    primary: string;
    danger: string;
    buttonBg: string;
    buttonText: string;
  };
};

export function CommentInput({
  value,
  onChangeText,
  onSend,
  onPickImage,
  onRemoveImage,
  imageUri,
  uploading,
  colors,
}: CommentInputProps) {
  return (
    <View style={[styles.inputContainer, { borderTopColor: colors.border }]}>
      <TextInput
        style={[styles.input, { color: colors.text, backgroundColor: colors.inputBg }]}
        placeholder="Escribe un comentario..."
        placeholderTextColor={colors.inputPlaceholder}
        value={value}
        onChangeText={onChangeText}
      />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Pressable style={styles.cameraButton} onPress={onPickImage}>
          <Ionicons name="image-outline" size={20} color={colors.primary} />
        </Pressable>

        {imageUri ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image source={{ uri: imageUri }} style={{ width: 48, height: 48, borderRadius: 8 }} />
            <Pressable onPress={onRemoveImage}>
              <Text style={{ color: colors.danger }}>Eliminar</Text>
            </Pressable>
          </View>
        ) : null}

        <Pressable style={[styles.button, { backgroundColor: colors.buttonBg }]} onPress={onSend}>
          {uploading ? (
            <ActivityIndicator color={colors.buttonText} />
          ) : (
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>Enviar</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderTopWidth: 1,
    paddingTop: 10,
  },
  input: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  cameraButton: {
    padding: 8,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: "bold",
  },
});
