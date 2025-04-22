import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router"; // Obtiene los params de la ruta

interface Shelter {
  ciudad: string;
  codigo: string;
  edificio: string;
  coordinador: string;
  telefono: string;
  capacidad: string;
  lat: string;
  lng: string;
}

export default function ShelterDetail() {
  // Usa useLocalSearchParams para obtener los parámetros pasados por el router
  const { ciudad, codigo, edificio, coordinador, telefono, capacidad, lat, lng } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 p-6 bg-black">
      <Text className="text-2xl font-bold text-orange-500 mb-4">Detalles del Refugio</Text>

      <View className="gap-4">
        <Text className="text-white"><Text className="font-bold text-orange-400">Código:</Text> {codigo}</Text>
        <Text className="text-white"><Text className="font-bold text-orange-400">Edificio:</Text> {edificio}</Text>
        <Text className="text-white"><Text className="font-bold text-orange-400">Ciudad:</Text> {ciudad}</Text>
        <Text className="text-white"><Text className="font-bold text-orange-400">Coordinador:</Text> {coordinador}</Text>
        <Text className="text-white"><Text className="font-bold text-orange-400">Teléfono:</Text> {telefono}</Text>
        <Text className="text-white"><Text className="font-bold text-orange-400">Capacidad:</Text> {capacidad}</Text>
        <Text className="text-white"><Text className="font-bold text-orange-400">Latitud:</Text> {lat}</Text>
        <Text className="text-white"><Text className="font-bold text-orange-400">Longitud:</Text> {lng}</Text>
      </View>
    </ScrollView>
  );
}
