// ! IMPORTANT TO BE FIRST
import "@/app/utils/OverrideFonts";

import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import { Suspense } from "react";
import { SQLiteProvider } from "expo-sqlite";

export const DATABASE_NAME = "fines_app";

export default function RootLayout() {
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <Stack initialRouteName="views/loginScreen">
          <Stack.Screen name="views/loginScreen" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="fines/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="news/[id]" options={{ headerShown: false }} />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
