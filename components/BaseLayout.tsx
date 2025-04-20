import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Slot, usePathname } from "expo-router";
import { StatusBar, Text, View } from "react-native";
import { useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

interface Props {
  children: React.ReactNode;
  className?: string;
}

SplashScreen.preventAutoHideAsync().catch((error) => {
  console.log("An error has ocurred: ", error);
});

export default function BaseLayout({ children, className }: Props) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      className={`flex-1 bg-background ${className}`}
      onLayout={onLayoutRootView}
    >
      <StatusBar backgroundColor="#111" />
      {children}
    </SafeAreaView>
  );
}
