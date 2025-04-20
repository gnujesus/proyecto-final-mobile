import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import FineGrid from "../../components/FineGrid";
import FineCard from "@/components/FineCard";
import { getAllFines, initializeDatabase } from "@/hooks/useDatabase";
import BaseLayout from "@/components/BaseLayout";
import SearchBar from "@/components/SearchBar";

export default function Search() {
  const [data, setData] = useState<Fine[]>();

  useEffect(() => {
    const run = async () => {
      await initializeDatabase();
      const all = await getAllFines();
      setData(all);
    };
    run();
  }, []);

  const buttons = Array.from({ length: 6 }, (_, i) => (
    <Pressable
      key={i}
      onPress={() => console.log("hey")}
      className="bg-white w-64 py-4 rounded-xl mt-4 mb-4 active:opacity-80 shadow-md"
    >
      <Text className="text-gray-900 text-center font-semibold text-lg">Hola</Text>
    </Pressable>
  ));

  return (
    <BaseLayout className="px-5 py-6">
      <Text className="text-white text-xl font-bold mb-6 text-center">
        Other Related Views
      </Text>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
          alignItems: "center", // ✅ this aligns children horizontally
        }}
      >
        {buttons}
      </ScrollView>
    </BaseLayout>
  );
}
