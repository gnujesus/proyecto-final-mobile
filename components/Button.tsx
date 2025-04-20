import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  animationClassName?: string;
  textClassName?: string;
  onPress?: () => void;
}

export default function Button({ children, ...props }: Props) {
  return (
    <TouchableOpacity
      className={`flex-1 ${props.animationClassName}`} // Moved flex-1 here
      onPress={props.onPress}
    >
      <View
        className={`bg-primary w-full justify-center items-center flex-row gap-3 py-3 rounded-full shadow-lg shadow-green-500/40 ${props.className}`}
      >
        <Text className={`text-white text-lg ${props.textClassName}`}>
          {children}
        </Text>
        {props.icon && <View>{props.icon}</View>}
      </View>
    </TouchableOpacity>
  );
}
