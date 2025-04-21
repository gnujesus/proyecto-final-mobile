import { ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import MeasuresListItem from "../../components/MeasuresListItem";
import { getMesures } from "../../services/preventiveMesures";

type Info = {
  id: string;
  titulo: string;
  descripcion: string;
  foto: string;
};

export default function Informacion() {
  const [info, setInfo] = useState<Info[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await getMesures();
        if (res.exito) {
          setInfo(res.datos);
        } else {
          console.warn("API returned success=false");
        }
      } catch (err) {
        console.error("Error fetching mesures:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  if (loading) {
    return (
      <BaseLayout>
        <Text className="text-white text-center mt-10">Cargando información…</Text>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Text className="text-2xl font-bold text-white text-center my-4">
        Medidas Preventivas
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        {info.map((item) => (
          <MeasuresListItem key={item.id} measure={item} />
        ))}
      </ScrollView>
    </BaseLayout>
  );
}
