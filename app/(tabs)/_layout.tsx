import React, { useEffect, useState } from "react";
import { Tabs, useRootNavigationState, usePathname } from "expo-router";
import { images } from "../../constants/images";
import { useNavigationState } from "@react-navigation/native";
import { View, Image, ImageBackground, Text, Dimensions } from "react-native";
import { icons } from "@/constants/icons";
import { colors } from "@/constants/colors";
import TabIcon from "@/components/TabIcon";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";
import {
  House,
  Search,
  User,
  Handshake,
  Newspaper,
  Map,
  Ellipsis,
} from "lucide-react-native";

const tabs = [
  {
    id: 1,
    icon: <House size={18} color="#fff" />,
    name: "home",
    title: "Home",
  },
  {
    id: 2,
    icon: <Handshake size={18} color="#fff" />,
    name: "services",
    title: "Services",
  },
  {
    id: 3,
    icon: <Newspaper size={18} color="#fff" />,
    name: "news",
    title: "News",
  },
  {
    id: 4,
    icon: <Map size={18} color="#fff" />,
    name: "map",
    title: "Map",
  },
  {
    id: 5,
    icon: <Ellipsis size={18} color="#fff" />,
    name: "more",
    title: "More",
  },
  {
    id: 6,
    icon: <User size={18} color="#fff" />,
    name: "profile",
    title: "Profile",
  },
];

export default function _layout() {
  const activeTab = useSharedValue(0);
  const pathName = usePathname();
  const tabWidth = 64.2;


  useEffect(() => {
    const viewName = pathName.replace("/", "");
    const currentTab = tabs.findIndex((tab) => tab.name === viewName);
    activeTab.value = currentTab < 0 ? 0 : currentTab;
  }, [pathName]);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#fff",
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          },
          tabBarStyle: {
            backgroundColor: "#343638",
            borderRadius: 50,
            marginHorizontal: 60,
            marginBottom: 36,
            height: 65,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#343638",
            boxShadow: "0px 5px 5px rgba(100, 100, 100, 0.1)",
          },
          tabBarActiveBackgroundColor: "transparent",
          headerPressColor: "transparent",
          headerPressOpacity: 1,
        }}
      >
        {tabs.map((tab, index) => (
          <Tabs.Screen
            key={index}
            name={tab.name}
            options={{
              title: tab.title,
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <TabIcon
                    focused={focused}
                    icon={tab.icon}
                    currentTab={index}
                  />
                );
              },
            }}
          />
        ))}
      </Tabs>
    </>
  );
}
function useAnimatedSyle(arg0: () => never[]) {
  throw new Error("Function not implemented.");
}
