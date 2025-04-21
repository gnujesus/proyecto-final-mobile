import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import { getAllShelters } from "../../services/shelter";

type Shelter = {
  coordinador: string;
  ciudad: string;
  telefono: string;
  capacidad: string;
  lat: string;
  lng: string;
  edificio: string;
  codigo: string;
};

export const navigationOptions = {
  title: "Detalles del Albergue",
};

export default function ShelterDetail() {
  const { codigo } = useLocalSearchParams();
  const router = useRouter();
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShelter = async () => {
      try {
        const res = await getAllShelters();
        if (res.exito) {
          const found = res.datos.find((s: Shelter) => s.codigo === codigo);
          setShelter(found || null);
        }
      } catch (error) {
        console.error("Error fetching shelter:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShelter();
  }, [codigo]);

  if (loading) {
    return (
      <BaseLayout>
        <Text className="text-white text-center mt-10">Cargando...</Text>
      </BaseLayout>
    );
  }

  if (!shelter) {
    return (
      <BaseLayout>
        <Text className="text-white text-center mt-10">Albergue no encontrado</Text>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        <View className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
            {shelter.codigo}
          </Text>

          <Text className="text-gray-700 font-semibold mb-1">Coordinador:</Text>
          <Text className="text-gray-600 mb-3">{shelter.coordinador}</Text>

          <Text className="text-gray-700 font-semibold mb-1">📍 Edificio:</Text>
          <Text className="text-gray-600 mb-3">{shelter.edificio}</Text>

          <Text className="text-gray-700 font-semibold mb-1">📞 Teléfono:</Text>
          <Text className="text-gray-600 mb-3">{shelter.telefono}</Text>

          <Text className="text-gray-700 font-semibold mb-1">🏠 Capacidad:</Text>
          <Text className="text-gray-600 mb-3">
            {shelter.capacidad ? shelter.capacidad : "N/A"}
          </Text>

          <Text className="text-gray-700 font-semibold mb-1">🌍 Ciudad:</Text>
          <Text className="text-gray-600 mb-3">{shelter.ciudad}</Text>

          <Text className="text-gray-700 font-semibold mb-1">🌎 Coordenadas:</Text>
          <Text className="text-gray-600">
            Lat: {shelter.lat} | Long: {shelter.lng}
          </Text>
        </View>
      </ScrollView>
    </BaseLayout>
  );
}
