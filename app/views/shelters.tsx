import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import { getAllShelters } from "../../services/shelter"; // Ajusta esto según tu servicio real

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
      const res = await getAllShelters(); // Debe devolver el JSON que mostraste
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
        {shelters.map((item) => (
          <View className="bg-white rounded-xl shadow-md p-4 mb-4">
             <Text className="text-xl font-bold  text-center mb-6">
        {item.codigo}
      </Text>
            <Text className="text-gray-700 mb-1">Coordinador {item.coordinador}</Text>
            <Text className="text-gray-700 mb-1">📍 {item.edificio}</Text>
            <Text className="text-gray-700 mb-1">📞 {item.telefono}</Text>
            <Text className="text-gray-700 mb-1">🏠 Capacidad: {!item.capacidad ? "N/A": item.capacidad} </Text>
            <Text className="text-gray-700 mb-1">🌍 Provincia: {item.ciudad}</Text>
            <Text className="text-gray-500 text-sm">Lat: {item.lat} | Long: {item.lng}</Text>
          </View>
        ))}
      </ScrollView>
    </BaseLayout>
  );
}