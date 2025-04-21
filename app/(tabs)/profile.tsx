import { View, Text, ScrollView, Image, Linking } from "react-native";
import Button from "@/components/Button";
import React, { useCallback, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
import { MessageCircle, Mail, GitFork, Phone } from "lucide-react-native";

export default function Profile() {
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
      TelegramUrl: "https://t.me/gnujesus",
      imageUrl: "https://avatars.githubusercontent.com/u/107089453?v=4",
      githubUrl: "https://github.com/gnujesus"
    },
    {
      id: "2",
      name: "Alan Tubert Perez",
      role: "Full Stack Digital Craftsman",
      description:
        "I'm a full stack digital craftsman with a passion for building scalable and efficient web applications. I'm a quick learner and I'm always looking for new challenges.",
      TelegramUrl: "https://t.me/alanTubert",
      imageUrl: "https://www.linkedin.com/in/alan-tubert-aa319a1b2?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAADGBTpsBPbFmW1_F8ifQlFeOQfFMZZeQjC0&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BsrkX59jdTiKVVvwleB0WvQ%3D%3D",
      githubUrl: "https://github.com/alanTubert"
    },
    {
      id: "3",
      name: "Nestor Parra",
      role: "Full Stack Digital Craftsman",
      description:
        "I'm a full stack digital craftsman with a passion for building scalable and efficient web applications. I'm a quick learner and I'm always looking for new challenges.",
      TelegramUrl: "https://t.me/NestorParra",
      imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQGPrM_e4FPpRA/profile-displayphoto-shrink_200_200/B4EZY10N3jHUAc-/0/1744659603322?e=1750896000&v=beta&t=fQSQvwYhE5wvdPETUpUX-_JbyYh8T0ApzEsCXsIg0po",
      githubUrl: "https://github.com/NestorParra"
    },
    {
      id: "2023-0233",
      name: "Joseph Herrera Nina",
      role: "Full Stack Developer",
      description:
        "I'm a full-stack digital creator with a focus on building scalable and efficient web applications, particularly using Express. I'm a fast learner and always on the lookout for new challenges to sharpen my skills and expand my expertise.",
      TelegramUrl: "https://t.me/JosephHerreraNina",
      imageUrl: "https://avatars.githubusercontent.com/u/141087482?s=400&u=ea1a9dacbd7565dc4cd046b10518a396e1b40566&v=4",
      githubUrl: "https://github.com/JosephHerrera"
    },
    {
      id: "2023-0191",
      name: "Alejandro Moscoso",
      role: "Backend developer",
      description:
        "I'm a full-stack digital craftsman with a strong focus on backend development, especially using C#. I'm passionate about building scalable and efficient web applications. I'm a quick learner and always eager to tackle new challenges.",
      TelegramUrl: "https://t.me/alejandroMoscoso",
      imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQF8aBnPoC4Uxw/profile-displayphoto-shrink_800_800/B4EZZajprhHcAc-/0/1745276018197?e=1750896000&v=beta&t=2qparkn2ntosDZCh8rKlw1JuHpUW_OpjkgnHL17Rx1A",
      githubUrl: "https://github.com/alejandroMoscoso"
    },
    {
      id: "2022-2085",
      name: "Joshua Fermin",
      role: "Backend developer",
      description:
        "I'm a full-stack digital craftsman with a strong focus on backend development, especially using C#. I'm passionate about building scalable and efficient web applications. I'm a quick learner and always eager to tackle new challenges.",
      TelegramUrl: "https://t.me/ramen_josh",
      imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQHDTsWfh3eK_Q/profile-displayphoto-shrink_200_200/B4EZYlWyInHMAY-/0/1744383451963?e=1750896000&v=beta&t=JlbVIowvgaHMWaPhZ4CiMteTqQlLPEn-ReAxiOwCg7Q",
      githubUrl: "https://github.com/joshuaFermin"
    },
    {
      id: "2023-0676",
      name: "Juan Manuel de los Santos",
      role: "Backend developer",
      description:
        "I'm a full-stack digital craftsman with a strong focus on backend development, especially using C#. I'm passionate about building scalable and efficient web applications. I'm a quick learner and always eager to tackle new challenges.",
      TelegramUrl: "https://t.me/ramen_josh",
      imageUrl: "https://www.linkedin.com/in/juan-manuel-de-los-santos-069755250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      githubUrl: "https://github.com/joshuaFermin"
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
            className="shadow-lg shadow-orange-500/20 gap-10 center w-full justify-center items-center bg-black rounded-3xl py-6 px-8 mb-10 border border-orange-500"
          >
            <View className="gap-5">
              <View className="gap-4 items-center">
                <Image
                  className="w-32 h-32 rounded-full border-2 border-orange-500"
                  source={{ uri: developer.imageUrl }}
                />

                <View className="mt-2 items-center">
                  <Text className="text-lg text-orange-500 font-semibold">
                    {developer.name}
                  </Text>
                  <Text className="text-sm text-gray-300">{developer.id}</Text>
                </View>
              </View>

              <View className="gap-10">
                <Text className="text-sm py-1 px-3 bg-orange-500/20 text-orange-500 rounded-full text-center">
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
                textClassName="text-sm !text-white"
                className="py-1 !bg-orange-500 shadow-orange-500/40"
                onPress={() => openLink(developer.TelegramUrl)}
              >
                <MessageCircle size={16} color="#FFF" />
              </Button>
              <Button
                textClassName="text-sm !text-white"
                className="py-1 !bg-orange-500 shadow-orange-500/40"
                onPress={() => openLink(`mailto:${developer.name.replace(/\s+/g, '')}@example.com`)}
              >
                <Mail size={16} color="#FFF" />
              </Button>
              <Button
                textClassName="text-sm !text-white"
                className="py-1 !bg-orange-500 shadow-orange-500/40"
                onPress={() => openLink(developer.githubUrl)}
              >
                <GitFork size={16} color="#FFF" />
              </Button>
              <Button
                textClassName="text-sm !text-white"
                className="py-1 !bg-orange-500 shadow-orange-500/40"
                onPress={() => openLink("tel:+1234567890")}
              >
                <Phone size={16} color="#FFF" />
              </Button>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </BaseLayout>
  );
}