import { View, TextInput, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { colors } from "@/constants/colors";

interface Props {
  placeholder: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  className?: string;
}

export default function SearchBar({
  placeholder,
  onPress,
  onChangeText,
  value,
  className,
}: Props) {
  return (
    <View className="flex-row gap-2 items-center bg-dark-200 rounded-full px-5 py-4 bg-dark">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={colors.text}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value ?? ""}
        onChangeText={onChangeText ?? (() => {})}
        placeholderTextColor={colors.text}
        className="text-white flex-1"
      />
    </View>
  );
}
