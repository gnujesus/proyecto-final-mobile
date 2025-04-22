// components/NewsList.tsx
import { View, Text, StyleProp, ViewStyle } from "react-native";
import React from "react";
import NewsListItem from "./NewsListItem";

interface Props {
  newsList: New[];
}

export default function NewsList({ newsList }: Props) {
  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-white text-xl font-semibold">Noticias</Text>
      </View>
      <View className="flex-1">
        {newsList.map((news, index) => (
          <View key={index} className="mb-4">
            <NewsListItem news={news} />
          </View>
        ))}
      </View>
    </View>
  );
}