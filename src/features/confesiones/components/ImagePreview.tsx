import React from "react";
import { Pressable, Image, StyleSheet } from "react-native";

type ImagePreviewProps = {
  imageSource: any;
  onPress?: () => void;
};

export function ImagePreview({ imageSource, onPress }: ImagePreviewProps) {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 8,
  },
});
