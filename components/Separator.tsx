import { View, Text } from "react-native";
import React from "react";

interface Props {
  className?: string;
}

export default function Separator({ ...props }: Props) {
  return (
    <View
      className={
        "h-[2px] bg-dark/60 my-10 rounded-full shadow-sm shadow-white/40" +
        props.className
      }
    />
  );
}
