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
        console.log("Raw data:", all.datos);

        // Filter out shelters with invalid coordinates and convert strings to numbers
        const validShelters = all.datos.filter((shelter: any) => {
          const lat = parseFloat(shelter.lng);
          const lng = parseFloat(shelter.lat);
        });

        console.log("Valid shelters:", validShelters);
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
            latitude: 18.4861,
            longitude: -69.9312,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {shelters.map((shelter) => {
            const lat = parseFloat(shelter.lng);
            const lng = parseFloat(shelter.lat);
            console.log("Rendering marker:", shelter.edificio, "at:", {
              lat,
              lng,
            });
            return (
              <Marker
                key={shelter.codigo}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
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
