import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import { getVideos } from "../../services/videos";
import {WebView} from "react-native-webview"
type VideoInfo = {
  id: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  link: string;
};

export default function VideosInformativos() {

    const [videos, setVideos] = useState<VideoInfo[]>([]);
  
    useEffect(() => {
      const fetchShelters = async () => {
        const res = await getVideos(); // Debe devolver el JSON que mostraste
        if (res.exito) {
            setVideos(res.datos);
        }
      };
      fetchShelters();
    }, []);

  const openYouTube = (id: string) => {
    const url = `https://www.youtube.com/embed/${id}`;
    return url
  };

  return (
    <BaseLayout className="px-5 py-6">
      <Text className="text-xl font-bold text-white text-center mb-6">
        Videos Informativos
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {videos.map((item, index) => (
          <View key={index} className="bg-white rounded-xl shadow-md p-4 mb-4">
            <Text className="text-xl font-bold text-center mb-4">{item.titulo}</Text>
            <Text className="text-gray-700 mb-1">🗓 Fecha: {item.fecha}</Text>
            <Text className="text-gray-700 mb-3">📝 {item.descripcion}</Text>
              
        <View className="h-64 rounded-lg overflow-hidden mb-10">
        <WebView
            source={{ uri: openYouTube(item.link) }}
            allowsFullscreenVideo
            javaScriptEnabled
          />
        </View>     
          </View>
        ))}
      </ScrollView>
    </BaseLayout>
  );
}