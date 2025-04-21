import { Text, View, Image, ScrollView, TouchableOpacity,Dimensions, StyleSheet  } from "react-native";
import { useRouter } from "expo-router";
import BaseLayout from "@/components/BaseLayout";
import { useRef } from "react";
import {
  initializeDatabase,
  getAllFines,
  deleteAllFines,
} from "@/hooks/useDatabase";
import { useState, useEffect } from "react";

export default function IndexScreen() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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

  const { width } = Dimensions.get("window");

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

  // Función para manejar la redirección al login
  const handleLoginRedirect = () => {
    router.push("/views/loginScreen"); 
   };

  // Función para manejar el login exitoso
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Cambia el estado a loggedIn
    router.push("/"); // Regresa a la vista principal (Index)
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
                className={`w-3 h-3 rounded-full ${activeIndex === i ? "bg-orange-600" : "bg-gray-300"}`}
              />
            ))}
          </View>
        </View>
        <View>
          <Text className="text-3xl font-bold text-center text-orange-600 mt-4">
            Misión
          </Text>
          <Text className="text-lg font-medium text-center text-orange-600 mt-1">
            Dirigir las acciones de coordinación, preparación y operación de todas las funciones de emergencias ante la ocurrencia de un evento natural o antrópico, en una forma eficiente y eficaz, garantizando un control adecuado de las operaciones, para resguardar la vida y la propiedad de los habitantes de la República Dominicana.
          </Text>
        </View>

        <View>
          <Text className="text-3xl font-bold text-center text-orange-600 mt-4">
            Visión
          </Text>
          <Text className="text-lg font-medium text-center text-orange-600 mt-1">
            Perdurar a través del tiempo como una Institución de servicio y socorro, con una correcta distribución de ayudas humanitarias y priorizar las necesidades ante cualquier evento nacional, garantizando la responsabilidad, esfuerzo y compromiso de las instituciones involucradas para una respuesta eficaz y eficiente.
          </Text>
        </View>

        <View>
          <Text className="text-3xl font-bold text-center text-orange-600 mt-4">
            Valores
          </Text>
          <Text className="text-lg font-medium text-center text-orange-600 mt-1">
            Voluntad - Compromiso - Integridad - Altruismo - Solidaridad - Transparencia
          </Text>
        </View>

      </ScrollView>
    </BaseLayout>
  );
}
