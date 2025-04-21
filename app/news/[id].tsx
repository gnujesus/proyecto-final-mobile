import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import { useLocalSearchParams } from "expo-router";
import { getAllNews } from "@/services/news";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useFocusEffect } from "expo-router";

interface News {
  id: string;
  fecha: string;
  titulo: string;
  contenido: string;
  foto: string;
}

export default function NewsDetail() {
  const { id } = useLocalSearchParams();
  const [news, setNews] = useState<News | null>(null);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  const animatedFadeIn = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useFocusEffect(
    useCallback(() => {
      opacity.value = 0;
      translateY.value = 50;

      opacity.value = withSpring(1);
      translateY.value = withSpring(0);
    }, [])
  );

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const allNews = await getAllNews();
        const newsItem = allNews.datos.find((item: News) => item.id === id);
        setNews(newsItem || null);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id]);

  if (!news) {
    return (
      <BaseLayout>
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg">Loading...</Text>
        </View>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Animated.ScrollView
        style={[animatedFadeIn]}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View className="shadow-lg shadow-white/20">
          <Image
            source={{ uri: news.foto }}
            className="w-full h-64"
            resizeMode="cover"
          />
        </View>

        <View className="px-5 mt-6">
          <Text className="text-white/50 text-sm font-semibold">
            {new Date(news.fecha).toLocaleDateString()}
          </Text>
          <Text className="text-white text-2xl font-bold mt-2">
            {news.titulo}
          </Text>

          <View className="mt-6">
            <Text className="text-white text-base leading-6">
              {news.contenido}
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </BaseLayout>
  );
}
