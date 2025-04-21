import { View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { getAllShelters } from "@/services/shelter";
import { getAllNews } from "@/services/news";

interface Shelter {
  ciudad: string;
  codigo: string;
  edificio: string;
  coordinador: string;
  telefono: string;
  capacidad: string;
  lat: string;
  lng: string;
}

export default function Map() {
  const { width, height } = Dimensions.get("window");
  const [shelters, setShelters] = useState<Shelter[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const all = await getAllShelters();

        // Filter out shelters with invalid coordinates and convert strings to numbers
        console.log("Raw data:", all.datos);
        const validShelters = all.datos.filter((shelter: any) => {
          const lat = parseFloat(shelter.lat);
          const lng = parseFloat(shelter.lng);
          return !isNaN(lat) && !isNaN(lng);
        });

        setShelters(validShelters);
      } catch (error) {
        console.error("Error loading shelters:", error);
      }
    };
    run();
  }, []);

  return (
    <BaseLayout>
      <View className="flex-1">
        <MapView
          style={{ flex: 1, width: "100%", height: "100%" }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 18.47893,
            longitude: -69.89178,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {shelters.map((shelter) => {
            const lat = parseFloat(shelter.lat);
            const lng = parseFloat(shelter.lng);
            return (
              <Marker
                key={shelter.codigo}
                coordinate={{
                  latitude: lng,
                  longitude: lat,
                }}
                title={shelter.edificio}
                description={`Capacidad: ${shelter.capacidad}`}
              />
            );
          })}
        </MapView>
      </View>
    </BaseLayout>
  );
}
