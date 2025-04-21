import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import ShelterListItem from "../../components/ShelterListItem"; // Componente para la lista de albergues
import { getAllShelters } from "../../services/shelter"; // Asegúrate de que esta función devuelva los datos correctamente

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

export default function Albergues() {
  const [shelters, setShelters] = useState<Shelter[]>([]);

  useEffect(() => {
    const fetchShelters = async () => {
      const res = await getAllShelters(); // Asegúrate de que esta función devuelva el JSON que mostrabas
      if (res.exito) {
        setShelters(res.datos);
      }
    };
    fetchShelters();
  }, []);

  return (
    <BaseLayout className="px-5 py-6">
      <Text className="text-xl font-bold text-white text-center mb-6">
        Lista de Albergues
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {shelters.map((item, index) => (
          <View key={index} className="mb-4">
            <ShelterListItem shelter={item} />
          </View>
        ))}
      </ScrollView>
    </BaseLayout>
  );
}
