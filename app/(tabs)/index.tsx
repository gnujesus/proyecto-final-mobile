import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import BaseLayout from "@/components/BaseLayout";
import Button from "@/components/Button";
import {
  initializeDatabase,
  getAllFines,
  deleteAllFines,
} from "@/hooks/useDatabase";
import { useState, useEffect } from "react";
import FineList from "../../components/NewsList";
import amadis from "@/assets/images/amadis.png";
import { Focus, FilePlus, Bell, Settings } from "lucide-react-native";

export default function Index() {
  const router = useRouter();

  const [data, setData] = useState<Fine[]>();

  useEffect(() => {
    const run = async () => {
      await initializeDatabase();
      const all = await getAllFines();
      setData(all);
    };
    run();
  }, []);

  return (
    <BaseLayout>
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Make space for the button
      >
        <View className="flex-1 flex-row self-center w-full items-center justify-between rounded-xl py-6 px-5">
          <View className="flex-row gap-4">
            <View>
              <Image
                className="w-20 h-20 rounded-full"
                src="https://avatars.githubusercontent.com/u/107089453?v=4"
              />
            </View>

            <View className="gap-3 mt-2">
              <Text className="text-base text-white font-semibold">
                Hello there, GNU
              </Text>
              <Text className="text-gray text-sm font-semibold">DGT-29382</Text>
            </View>
          </View>
          <View className="gap-4 justify-center flex-row">
            <TouchableOpacity>
              <View className="w-16 h-16 bg-light rounded-full items-center justify-center">
                <Settings color="white" size={20} className="mt-2" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="w-16 h-16 bg-light rounded-full items-center justify-center">
                <Bell color="white" size={20} className="mt-2" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-1 justify-between mt-5 mb-5 bg-light shadow-xl shadow-white/20 rounded-3xl p-10 flex gap-16">
          <View className="rounded-3xl">
            <Text className="text-white text-md font-semibold">
              Total Fines
            </Text>
            <Text className="text-white font-bold text-3xl">RD$ 720,000</Text>
          </View>

          <View className="rounded-3xl flex-row justify-between">
            <Text className="text-white text-base font-semibold">
              Shift ends
            </Text>
            <Text className="text-white text-base font-semibold">8:30 PM</Text>
          </View>
        </View>
        {/* <View className="flex-1 mt-5">
          <SearchBar
            placeholder="Search for a fine..."
            onPress={() => router.push("/search")}
          />
        </View> */}

        {/* <View className="flex-1 flex-row justify-between gap-5 mb-3">
          <Button
            icon={<Focus color="white" size={18} className="mt-2" />}
            className="px-[65px]"
            textClassName="text-sm"
          >
            Scan
          </Button>

          <Button
            icon={<FilePlus color="white" size={20} className="mt-2" />}
            className="px-[65px]"
            textClassName="text-sm"
            onPress={() => router.push("/fines/add")}
          >
            Create
          </Button>
        </View> */}
      </ScrollView>

      {/* <TouchableOpacity
        className="absolute bottom-[7em] left-10" // Absolute positioning
        activeOpacity={0.7}
        onPress={() => {
          deleteAllFines();
          setData([]);
        }}
      >
        <View className="bg-red-500 w-16 h-16 rounded-full justify-center items-center shadow-lg">
          <Text className="text-light text-3xl mb-2">-</Text>
        </View>
      </TouchableOpacity> */}
    </BaseLayout>
  );
}
