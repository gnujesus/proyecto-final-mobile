import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllFines, initializeDatabase } from "@/hooks/useDatabase";
import BaseLayout from "@/components/BaseLayout";
import { RelativePathString, usePathname, useRouter } from "expo-router";
import { useSharedValue } from "react-native-reanimated";

export default function Search() {
  const [data, setData] = useState<Fine[]>();
  const router = useRouter(); // ✅ Add router

  useEffect(() => {
    const run = async () => {
      await initializeDatabase();
      const all = await getAllFines();
      setData(all);
    };
    run();
  }, []);

  const tabs = [
    { id: 1, title: "Historia", route: "../views/history" },
    { id: 2, title: "Videos", route: "../views/videos" },
    { id: 3, title: "Alberges", route: "../views/shelters" },
    { id: 4, title: "Medidas Preventivas", route: "../views/preventiveMesures" },
    { id: 5, title: "Miembros", route: "../views/miembros" },
    { id: 6, title: "Log out", route: "../views/loginScreen" },
  ];

  return (
    <BaseLayout className="px-5 py-6">
      <Text className="text-white text-xl font-bold mb-6 text-center">
        Other Related Views
      </Text>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
          alignItems: "center",
        }}
      >
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            onPress={() =>{
              if (tab.title === "Log out") {
                router.replace(tab.route as RelativePathString);
              } else {
                router.push(tab.route as RelativePathString); 
              } 
            }
          }
            className="bg-white w-64 py-4 rounded-xl mt-4 mb-4 active:opacity-80 shadow-md"
          >
            <Text className="text-gray-900 text-center font-semibold text-lg">
              {tab.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </BaseLayout>
  );
}