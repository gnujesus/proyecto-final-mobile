import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";

interface Props {
  news: New;
}

export default function NewsListItem({ news }: Props) {
  const router = useRouter();

  const handlePress = () => {
    // TODO: Change to news/
    router.push(`/fines/${news.id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <View className="flex-row w-full bg-light shadow-lg shadow-white/20 rounded-3xl py-4 px-5">
        <View className="flex-row gap-4 flex-1">
          <Image className="w-20 h-20 rounded-xl" src={news.foto} />
          <View className="flex-1 justify-center">
            <Text
              className="text-lg text-white font-semibold"
              numberOfLines={2}
            >
              {news.titulo}
            </Text>
            <Text className="text-sm text-gray mt-1">{news.fecha}</Text>
          </View>
        </View>
        <View className="justify-center">
          <ChevronRight color="white" size={20} />
        </View>
      </View>
    </Pressable>
  );
}
