import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

import { EllipsisVertical } from "lucide-react-native";

interface Props {
  fine: New;
  grid?: boolean;
}

export default function FineCard({ fine, grid = false }: Props) {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const handlePress = () => {
    router.push(`/fines/${fine.id}`);
  };

  // Calculate width for grid card (with margin/gap)
  const cardWidth = grid ? (width - 40) / 2 : width - 40;

  return (
    <Pressable
      onPress={handlePress}
      className="gap-5 justify-start items-start bg-light px-7 pt-7 pb-5 rounded-3xl flex-1 shadow-lg shadow-white/20"
    >
      <View className="gap-10 flex-wrap">
        <Image className="w-36 h-32 rounded-3xl" src={fine.foto} />
        <Text className="text-white font-semibold text-xl flex-wrap flex-1">
          {fine.titulo}
        </Text>
        <EllipsisVertical color="white" size={20} />
      </View>

      <View className="gap-0">
        <View className="flex-row gap-32 items-center">
          <Text className="text-gray font-semibold  text-xs">Amount</Text>
          <Text className="text-white font-semibold rounded-2xl pb-1 pt-2 px-5 bg-background shadow-lg shadow-black/20">
            RD$ 500
          </Text>
        </View>

        <View className="flex-row gap-32 items-center">
          <Text className="text-gray font-semibold text-xs">Reason</Text>
          <Text className="text-gray font-semibold p-5 text-xs">Speeding</Text>
        </View>
      </View>
    </Pressable>
  );
}
