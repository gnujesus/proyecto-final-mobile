import { useEffect } from "react";
import { Image } from "react-native";
import { Text, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

interface Props {
  focused: boolean;
  title?: string;
  icon: React.ReactNode;
  currentTab: number;
}

const WIDTH = 60;

export default function TabIcon({ focused, title, icon, currentTab }: Props) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (focused) {
      translateX.value = withSpring(translateX.value + WIDTH * currentTab);
    }
  }, [focused]);

  return (
    <>
      {focused ? (
        <View className="bg-transparent flex flex-row w-full flex-2 min-w-[60px] min-h-[60px] mt-7 justify-center items-center rounded-full overflow-hidden z-100">
          {icon}
        </View>
      ) : (
        <View className="size-full justify-center items-center mt-7 rounded-full">
          {icon}
        </View>
      )}
    </>
  );
}
