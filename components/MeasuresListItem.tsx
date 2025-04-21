import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";

interface Props {
  measure: {
    id: string;
    titulo: string;
    descripcion: string;
    foto: string;
  };
}

export default function MeasuresListItem({ measure }: Props) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/measures/${measure.id}`);
  };

  return (
    <Pressable onPress={handlePress} className="w-full bg-light shadow-lg shadow-white/20 rounded-3xl py-4 px-5 mb-5 active:opacity-80">
      <View className="flex-row gap-4">
        <Image
          source={{ uri: measure.foto }}
          className="w-20 h-20 rounded-xl"
          resizeMode="cover"
        />
        <View className="flex-1 justify-center">
          <Text className="text-lg text-white font-semibold" numberOfLines={2}>
            {measure.titulo}
          </Text>
          {/* Si quieres agregar la descripción pequeña aquí */}
          {/* <Text className="text-sm text-gray-400 mt-1" numberOfLines={2}>{measure.descripcion}</Text> */}
        </View>
        <View className="justify-center">
          <ChevronRight color="white" size={20} />
        </View>
      </View>
    </Pressable>
  );
}
