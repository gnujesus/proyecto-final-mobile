import { View, Text, ScrollView, Image, Linking } from "react-native";
import Button from "@/components/Button";
import React, { useCallback, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout";
import amadis from "@/assets/images/amadis.png";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
import { MessageCircle, Mail, GitFork, Phone } from "lucide-react-native";

export default function Profile() {
  const titleStyle = "text-light font-bold text-xl";
  const textStyle = "text-light font-bold text-md";

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  // Animations
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

  const data = [
    {
      id: "2023-0299",
      name: "Jesús Martínez",
      role: "Full Stack Digital Craftsman",
      description:
        "I'm a full stack digital craftsman. Everything I do, I do with passion. My motto is 'elegant, efficient and effective'. I use nvim btw.",
      TelegramUrl: "https://t.me/gnujesus", // Se agregó el campo TelegramUrl
    },
    {
      id: "2",
      name: "Alan Tubert Perez",
      role: "Full Stack Digital Craftsman",
      description:
        "I'm a full stack digital craftsman with a passion for building scalable and efficient web applications. I'm a quick learner and I'm always looking for new challenges.",
      TelegramUrl: "https://t.me/alanTubert", // Se agregó el campo TelegramUrl
    },
    {
      id: "3",
      name: "Nestor Parra",
      role: "Full Stack Digital Craftsman",
      description:
        "I'm a full stack digital craftsman with a passion for building scalable and efficient web applications. I'm a quick learner and I'm always looking for new challenges.",
      TelegramUrl: "https://t.me/NestorParra", // Se agregó el campo TelegramUrl
    },
    {
      id: "2023-0233",
      name: "Joseph Herrera Nina",
      role: "Full Stack Developer",
      description:
        "I'm a full-stack digital creator with a focus on building scalable and efficient web applications, particularly using Express. I'm a fast learner and always on the lookout for new challenges to sharpen my skills and expand my expertise.",
      TelegramUrl: "https://t.me/JosephHerreraNina", // Se agregó el campo TelegramUrl
    },
    {
      id: "2023-0191",
      name: "Alejandro Moscoso",
      role: "Backend developer",
      description:
        "I'm a full-stack digital craftsman with a strong focus on backend development, especially using C#. I’m passionate about building scalable and efficient web applications. I'm a quick learner and always eager to tackle new challenges.",
      TelegramUrl: "https://t.me/alejandroMoscoso", // Se agregó el campo TelegramUrl
    },
    {
      id: "2023-0191",
      name: "Joshua Fermin",
      role: "Backend developer",
      description:
        "I'm a full-stack digital craftsman with a strong focus on backend development, especially using C#. I’m passionate about building scalable and efficient web applications. I'm a quick learner and always eager to tackle new challenges.",
      TelegramUrl: "https://t.me/ramen_josh", // Se agregó el campo TelegramUrl
    },
  ];

  // Handler for each button to open a URL
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Error opening URL:", err));
  };

  return (
    <BaseLayout>
      <Animated.ScrollView
        style={[animatedFadeIn]}
        className="flex-1 px-5"
        contentContainerStyle={{ paddingTop: 80, paddingBottom: 80 }}
      >
        {data.map((developer) => (
          <View
            key={developer.id}
            className="shadow-lg shadow-white/20 gap-10 center w-full justify-center items-center bg-light rounded-3xl py-6 px-8 mb-10"
          >
            <View className="gap-5">
              <View className="gap-4 items-center">
                <Image
                  className="w-32 h-32 rounded-full border-light2 border-3"
                  src="https://avatars.githubusercontent.com/u/107089453?v=4"
                />

                <View className="mt-2 items-center">
                  <Text className="text-lg text-white font-semibold">
                    {developer.name}
                  </Text>
                  <Text className="text-sm text-gray">{developer.id}</Text>
                </View>
              </View>

              <View className="gap-10">
                <Text className="text-sm py-1 px-3 bg-primary/20 text-white rounded-full">
                  {developer.role}
                </Text>
              </View>
            </View>

            <View>
              <Text className="text-white text-center">
                {developer.description}
              </Text>
            </View>

            <View className="w-1/2 flex-row justify-between gap-4">
              <Button
                textClassName="text-sm !text-background"
                className="py-1 !bg-white shadow-white/40"
                onPress={() => openLink("https://t.me/yourTelegramUsername")} // Reemplaza con el enlace correcto de Telegram
              >
                <MessageCircle size={16} color="#000" />
              </Button>
              <Button
                textClassName="text-sm !text-background"
                className="py-1 !bg-white shadow-white/40"
                onPress={() => openLink(developer.TelegramUrl)} // Usamos el campo TelegramUrl
              >
                <Mail size={16} color="#000" />
              </Button>
              <Button
                textClassName="text-sm !text-background"
                className="py-1 !bg-white shadow-white/40"
                onPress={() => openLink("https://github.com/yourUsername")} // Reemplaza con tu enlace de GitHub
              >
                <GitFork size={16} color="#000" />
              </Button>
              <Button
                textClassName="text-sm !text-background"
                className="py-1 !bg-white shadow-white/40"
                onPress={() => openLink("tel:+1234567890")} // Reemplaza con un número de teléfono válido
              >
                <Phone size={16} color="#000" />
              </Button>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </BaseLayout>
  );
}
