import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import { getAllServices } from "@/services/services";
import { MessageCircle, Mail } from "lucide-react-native";

interface Service {
  id: string;
  nombre: string;
  descripcion: string;
  foto: string;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginHorizontal: 4,
  },
  cardHeader: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B00',
    paddingBottom: 8,
    marginBottom: 12
  },
  serviceImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  textLight: {
    color: '#E5E7EB',
  },
  textOrange: {
    color: '#FF6B00',
  },
});

function ServiceCard({ service }: { service: Service }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={[styles.textOrange, { fontSize: 20, fontWeight: 'bold', textAlign: 'center' }]}>
          {service.nombre}
        </Text>
      </View>
      
      <Image
        source={{ uri: service.foto }}
        style={styles.serviceImage}
        resizeMode="cover"
        onError={(e) => console.log('Failed to load image:', e.nativeEvent.error)}
      />
      
      <Text style={[styles.textLight, { fontSize: 16, textAlign: 'justify', marginBottom: 10 }]}>
        {service.descripcion}
      </Text>
    </View>
  );
}

export default function ServicesScreen() {
  const [data, setData] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        setData(response.datos || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <BaseLayout>
      <ScrollView
        style={{ backgroundColor: '#111827' }}
        contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ alignItems: 'center', paddingVertical: 15 }}>
          <Text style={[styles.textOrange, { fontSize: 24, fontWeight: 'bold' }]}>
            Nuestros Servicios
          </Text>
          <Text style={[styles.textLight, { fontSize: 16, marginTop: 5 }]}>
            Conoce lo que ofrecemos para tu seguridad
          </Text>
        </View>

        {/* Services List */}
        {data.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </ScrollView>
    </BaseLayout>
  );
}