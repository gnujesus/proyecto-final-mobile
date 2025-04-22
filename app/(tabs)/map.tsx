import { View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { getAllShelters } from "@/services/shelter";
import { RelativePathString, router } from "expo-router";

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

  const handleMarkerPress = (shelter: Shelter) => {
    router.push({
      pathname: `/map/${shelter.codigo}` as RelativePathString,
      params: {
        ciudad: shelter.ciudad,
        codigo: shelter.codigo,
        edificio: shelter.edificio,
        coordinador: shelter.coordinador,
        telefono: shelter.telefono,
        capacidad: shelter.capacidad,
        lat: shelter.lat,
        lng: shelter.lng,
      },
    });
  };

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
                  longitude: lat,
                  latitude: lng, 
                }}
                title={shelter.edificio}
                description={`Capacidad: ${shelter.capacidad}`}
                onPress={() => handleMarkerPress(shelter)} // 🚀 Agregado el onPress
              />
            );
          })}
        </MapView>
      </View>
    </BaseLayout>
  );
}
