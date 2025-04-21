import { Text, View, Image, ScrollView, TouchableOpacity,Dimensions, StyleSheet  } from "react-native";
import { useRouter } from "expo-router";
import BaseLayout from "@/components/BaseLayout";
import Button from "@/components/Button";
import { useRef } from "react";
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
  const images = [
    "https://defensacivil.gob.do/images/slide/PasionDC.png",
    "https://defensacivil.gob.do/media/zoo/images/yyy14_048c403fdae60bbd975a66382ce8b05e.jpeg",
    "https://defensacivil.gob.do/media/zoo/images/yyy16_f5a64698135c45d4462d479db75b9c4c.jpeg",
    "https://src.rdedigital.com/wp-content/uploads/2024/03/defensa-civil.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSfCzKxzNnwJ_XUzWdEQAIgyq7e2yKPtvVIQ&s",
    "https://robertocavada.com/wp-content/uploads/2022/06/E2uVt5pXMAwFQIS.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ87Mwl3er_9FPAmKAGycSEEiY7KJWvwnQ-Bg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_s9AmVFGaND18RfmniZBsWGuEnkedYrfMiA&s"
  ];

  const {width} = Dimensions.get("window")  
  
  const styles = StyleSheet.create({
    scrollView: {
      height: 250,
    },
    image: {
      width: width,
      height: 250,
      resizeMode: "cover",
    },
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };
  return (
    <BaseLayout>
 <ScrollView>


  <View className="items-center pt-10">
        <Text className="text-3xl font-bold text-center text-orange-600">
          Bienvenido
        </Text>
        <Text className="text-lg font-medium text-center text-orange-700 mt-1">
          a la Defensa Civil Dominicana
        </Text>
      </View>

      <View className="mt-6">
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ref={scrollRef}
          style={styles.scrollView}
        >
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
        </ScrollView>

        {/* Dots Indicator */}
        <View className="flex-row justify-center mt-5 space-x-2">
          {images.map((_, i) => (
            <View
              key={i}
              className={`w-3 h-3 rounded-full ${
                activeIndex === i ? "bg-orange-600" : "bg-gray-300"
              }`}
            />
          ))}
        </View>
      </View>

      <View className="px-8 mt-10">
        <TouchableOpacity
         // onPress={handleLogin}
          className="bg-orange-600 py-3 rounded-2xl shadow-md"
        >
          <Text className="text-center text-white text-lg font-semibold">
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
      <View>
<Text className="text-3xl font-bold text-center text-orange-600 mt-4">
  Mision
</Text>
<Text className="text-lg font-medium text-center text-orange-600 mt-1">
Dirigir las acciones de coordinación, preparación y operación de todas las funciones de emergencias ante la ocurrencia de un evento natural o antrópico,
 en una forma eficiente y eficaz, garantizando un control adecuado de las operaciones, para resguardar la vida y la propiedad de los habitantes de la República Dominicana.
</Text>
</View>

<View>
<Text className="text-3xl font-bold text-center text-orange-600 mt-4">
Visión
</Text>
<Text className="text-lg font-medium text-center text-orange-600 mt-1">
Perdurar a través del tiempo como una Institución de servicio y socorro, con una correcta distribución de ayudas humanitarias y priorizar las  necesidades ante cualquier evento nacional, 
garantizando la responsabilidad, esfuerzo y compromiso de las instituciones involucradas para una respuesta eficaz y eficiente,
</Text>
</View> 
<View>
<Text className="text-3xl font-bold text-center text-orange-600 mt-4">
Valores
</Text>
<Text className="text-lg font-medium text-center text-orange-600 mt-1">
Voluntad -
Compromiso -
Integridad - 
Altruismo -
Solidaridad -
Transparencia 
</Text>

<Text className="text-5xl font-medium text-center text-orange-600 mt-1">
  
</Text>
<Text className="text-5xl font-medium text-center text-orange-600 mt-1">
  
</Text>
</View> 
</ScrollView>
        {/* <View className="flex-1 flex-row self-center w-full items-center justify-between rounded-xl py-6 px-5">
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
        </View> */}
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
      {/* </ScrollView> */}

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
