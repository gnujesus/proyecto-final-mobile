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
  const { ciudad, codigo, edificio, coordinador, telefono, capacidad, lat, lng } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-black px-5 pt-8">
      {/* Header */}
      <Text className="text-3xl font-bold text-orange-500 mb-6 text-center">
        Detalles del Refugio
      </Text>

      {/* Card container */}
      <View className="bg-neutral-900 rounded-2xl p-6 mb-3 shadow-lg shadow-orange-500/10">
        {/* Each detail */}
        {[
          { label: "Código", value: codigo },
          { label: "Edificio", value: edificio },
          { label: "Ciudad", value: ciudad },
          { label: "Coordinador", value: coordinador },
          { label: "Teléfono", value: telefono },
          { label: "Capacidad", value: capacidad },
          { label: "Latitud", value: lng },
          { label: "Longitud", value: lat },
        ].map((item, index) => (
          <View key={index} className="mb-4">
            <Text className="text-orange-400 font-semibold text-lg">{item.label}:</Text>
            <Text className="text-white text-base mt-1">{item.value}</Text>
            {/* Divider line */}
            {index !== 7 && <View className="border-b border-neutral-700 my-3" />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
