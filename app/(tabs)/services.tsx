import { View, Text, Button, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import FineGrid from "../../components/FineGrid";
import FineCard from "@/components/FineCard";
import { getAllFines, initializeDatabase } from "@/hooks/useDatabase";
import BaseLayout from "@/components/BaseLayout";
import SearchBar from "@/components/SearchBar";
import FineList from "@/components/NewsList";
import { getAllServices } from "@/services/services";
import { Mail, MessageCircle } from "lucide-react-native";

interface Service {
  id: string;
  nombre: string;
  descripcion: string;
  foto: string;
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <View
      key={service.id}
      className="shadow-lg shadow-white/20 gap-10 center w-full justify-center items-center bg-light rounded-3xl py-6 px-8 mb-10"
    >
      <View className="gap-5">
        <View className="gap-4 items-center">
          <Image
            className="w-96 h-44 rounded-lg border-light2 border-3"
            src={service.foto}
          />

          <View className="mt-2 items-center">
            <Text className="text-lg text-white font-semibold">
              {service.nombre}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <Text className="text-white text-center">{service.descripcion}</Text>
      </View>
    </View>
  );
}

export default function Search() {
  const [data, setData] = useState<Service[]>();

  useEffect(() => {
    const run = async () => {
      const all = await getAllServices();
      setData(all.datos);
    };
    run();
  }, []);

  return (
    <BaseLayout>
      <ScrollView
        className="flex-1 px-5 py-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {data &&
          data.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
      </ScrollView>
    </BaseLayout>
  );
}
