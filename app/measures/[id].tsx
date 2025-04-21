import { View, Text, Image, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import { getMesures } from "../../services/preventiveMesures";

type Measure = {
  id: string;
  titulo: string;
  descripcion: string;
  foto: string;
};

export const navigationOptions = {
    title: "Detalles de las medidas preventivas",
  }

export default function MeasureDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [measure, setMeasure] = useState<Measure | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeasure = async () => {
      try {
        const res = await getMesures();
        if (res.exito) {
          const found = res.datos.find((m: Measure) => m.id === id);  
          setMeasure(found || null);
        
        }
      } catch (error) {
        console.error("Error fetching measure:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeasure();
  }, [id]);

  if (loading) {
    return (
      <BaseLayout>
        <Text className="text-white text-center mt-10">Cargando...</Text>
      </BaseLayout>
    );
  }

  if (!measure) {
    return (
      <BaseLayout>
        <Text className="text-white text-center mt-10">Medida no encontrada</Text>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        <Image
          source={{ uri: measure.foto }}
          className="w-full h-60 rounded-2xl mb-6"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold text-white mb-4">{measure.titulo}</Text>
        <Text className="text-base text-white/80">{measure.descripcion}</Text>
      </ScrollView>
    </BaseLayout>
  );
}
