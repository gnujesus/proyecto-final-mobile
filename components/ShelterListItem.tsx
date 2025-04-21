import { View, Text, Pressable } from "react-native";
import React from "react";
import { ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";

interface Shelter {
  coordinador: string;
  ciudad: string;
  telefono: string;
  capacidad: string;
  lat: string;
  lng: string;
  edificio: string;
  codigo: string;
}

interface Props {
  shelter: Shelter;
}

export default function ShelterListItem({ shelter }: Props) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/shelters/${shelter.codigo}`);
  };

  return (
    <Pressable onPress={handlePress} className="w-full bg-white rounded-3xl shadow-lg shadow-white/20 py-4 px-5 mb-5">
      <View className="flex-row gap-4">
        <View className="w-20 h-20 rounded-xl bg-white/10 justify-center items-center">
          <Text className="text-2xl font-bold gray-white">{shelter.codigo}</Text>
        </View>
        <View className="flex-1 justify-center">
          <Text className="text-lg text--bold gray font-semibold" numberOfLines={2}>
            {shelter.edificio}
          </Text>
          <Text className="text-sm text-gray-400 mt-1" numberOfLines={1}>
            {`📍${shelter.ciudad}`}
          </Text>
          <Text className="text-sm text-gray-400 mt-1">{`📞 ${shelter.telefono}`}</Text>
        </View>
        <View className="justify-center">
          <ChevronRight color="white" size={20} />
        </View>
      </View>
    </Pressable>
  );
}
