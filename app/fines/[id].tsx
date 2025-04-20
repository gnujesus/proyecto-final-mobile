import BaseLayout from "@/components/BaseLayout";
import { getFineById, initializeDatabase } from "@/hooks/useDatabase";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

export default function FineDetails() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<Fine | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const run = async () => {
      await initializeDatabase();
      const fine = await getFineById(Number(id));
      setData(fine);
    };
    run();

    return () => {
      // Cleanup sound when component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handlePlayAudio = async () => {
    if (!data?.audio_uri) return;

    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
      return;
    }

    if (sound && !isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
      return;
    }

    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: data.audio_uri,
    });
    setSound(newSound);
    setIsPlaying(true);
    await newSound.playAsync();
  };

  const titleStyle = "text-light font-bold text-xl";
  const textStyle = "text-light font-bold text-md";

  return (
    <BaseLayout>
      <ScrollView>
        {data && (
          <View>
            <Image
              src={data.image_url}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
            <View className="flex-col items-start justify-center mt-5 px-5 gap-5">
              <Text className={titleStyle}>
                {data.brand} {data.model}, {data.year}, {data.color}
              </Text>
              <Text className={textStyle}>
                Emitted on: <Text className="text-text">{data.date}</Text>
              </Text>

              <Text className={textStyle}>
                Label Code:{"\n"}
                <Text className="text-text">{data.label_code}</Text>
              </Text>

              <Text className={textStyle}>
                Infraction type:{" "}
                <Text className="text-text">{data.infraction_type}</Text>
              </Text>
              <Text className={textStyle}>
                Description:{"\n"}
                <Text className="text-text">{data.description}</Text>
              </Text>

              {data.audio_uri && (
                <TouchableOpacity
                  className="bg-blue-500 rounded-md px-4 py-3 mt-2"
                  onPress={handlePlayAudio}
                >
                  <Text className="text-white text-center">
                    {isPlaying ? "Pause Audio" : "Play Audio"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </BaseLayout>
  );
}
