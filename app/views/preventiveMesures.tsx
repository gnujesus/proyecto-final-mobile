import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import { getMesures } from "../../services/preventiveMesures";

// If you have a local placeholder image, put it in your assets folder:


type Info = {
  id: string;
  titulo: string;
  descripcion: string;
  foto: string; // mark as optional
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
        console.error("Error fetching members:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);

  if (loading) {
    return (
      <BaseLayout>
        <Text style={styles.loadingText}>Cargando información…</Text>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Text style={styles.header}>Medidas preventivas</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {info.map((item) => {
          // Determine which image URI to use:

          return (
            <View key={item.id} style={styles.card}>
              <Image
                source={{ uri: item.foto} }
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.title}>{item.titulo}</Text>
              <Text style={styles.description}>{item.descripcion}</Text>
            </View>
          );
        })}
      </ScrollView>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 16,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Android elevation
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  loadingText: {
    color: "white",
    textAlign: "center",
    marginTop: 50,
  },
});