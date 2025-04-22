import { Text, View, Image, ScrollView, Dimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import BaseLayout from "@/components/BaseLayout";
import { useRef, useState } from "react";

export default function IndexScreen() {
  const router = useRouter();
  const { width } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const images = [
    "https://defensacivil.gob.do/images/slide/PasionDC.png",
    "https://defensacivil.gob.do/media/zoo/images/yyy14_048c403fdae60bbd975a66382ce8b05e.jpeg",
    "https://defensacivil.gob.do/media/zoo/images/yyy16_f5a64698135c45d4462d479db75b9c4c.jpeg",
    "https://src.rdedigital.com/wp-content/uploads/2024/03/defensa-civil.jpeg",
  ];

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  const styles = StyleSheet.create({
    scrollView: {
      height: 220,
    },
    image: {
      width: width,
      height: 220,
      resizeMode: "cover",
    },
    card: {
      backgroundColor: '#1F2937', // Fondo oscuro
      borderRadius: 12,
      padding: 20,
      marginVertical: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2, // Mayor sombra para contraste
      shadowRadius: 3,
      elevation: 4, // Sombra mejorada
      marginHorizontal: 4,
    },
    cardHeader: {
      borderBottomWidth: 2,
      borderBottomColor: '#FF6B00',
      paddingBottom: 8,
      marginBottom: 12
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    // Estilos para texto claro
    textLight: {
      color: '#E5E7EB', // Color de texto claro
    },
    textOrange: {
      color: '#FF6B00', // Color de texto naranjo
    },
    container: {
      backgroundColor: '#111827', // Fondo oscuro para la vista
      flex: 1,
    }
  });

  return (
    <BaseLayout>
      <ScrollView 
        className="bg-gray-800" // Fondo oscuro
        contentContainerStyle={{ paddingBottom: 80 }} // Espacio extra para el tab navigation
      >
        {/* Header */}
        <View className="items-center pt-2 pb-4 bg-black">
          <Image 
            source={{ uri: "https://defensacivil.gob.do/images/plantilla/BANNER_LOGO_DEFENSA_CIVIL_Mesa_de_trabajo_1-removebg-preview.png" }} 
            style={{ width: 300, height: 100 }}
            onError={(e) => console.log('Failed to load image:', e.nativeEvent.error)}
          />
        </View>

        {/* Image Slider */}
        <View className="mt-2">
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
          <View className="flex-row justify-center my-3">
            {images.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, { backgroundColor: activeIndex === i ? "#FF6B00" : "#D1D5DB" }]}
              />
            ))}
          </View>
        </View>

        {/* Cards Section */}
        <View className="px-3 pb-6">
          {/* Misión Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text className="text-xl font-bold text-center text-orange-600">
                Misión
              </Text>
            </View>
            <Text style={styles.textLight} className="text-base text-justify">
              Dirigir las acciones de coordinación, preparación y operación de todas las funciones de emergencias ante la ocurrencia de un evento natural o antrópico, en una forma eficiente y eficaz, garantizando un control adecuado de las operaciones, para resguardar la vida y la propiedad de los habitantes de la República Dominicana.
            </Text>
          </View>

          {/* Visión Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text className="text-xl font-bold text-center text-orange-600">
                Visión
              </Text>
            </View>
            <Text style={styles.textLight} className="text-base text-justify">
              Perdurar a través del tiempo como una Institución de servicio y socorro, con una correcta distribución de ayudas humanitarias y priorizar las necesidades ante cualquier evento nacional, garantizando la responsabilidad, esfuerzo y compromiso de las instituciones involucradas para una respuesta eficaz y eficiente.
            </Text>
          </View>

          {/* Valores Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text className="text-xl font-bold text-center text-orange-600">
                Valores
              </Text>
            </View>
            <View className="flex-row flex-wrap justify-center">
              {['Voluntad', 'Compromiso', 'Integridad', 'Altruismo', 'Solidaridad', 'Transparencia'].map((valor, index) => (
                <View key={index} className="bg-orange-100 px-3 py-1.5 rounded-full m-1">
                  <Text className="text-orange-700 font-medium text-sm">{valor}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Llamado a la acción */}
          <View style={[styles.card, { marginBottom: 20 }]}>
            <Text className="text-lg font-bold text-center text-orange-600 mb-3">
              ¿Quieres ser parte de nuestro equipo?
            </Text>
            <Text style={styles.textLight} className="text-base text-center mb-4">
              Únete como voluntario o conoce más sobre nuestros programas de formación.
            </Text>
          </View>
        </View>
      </ScrollView>
    </BaseLayout>
  );
}
