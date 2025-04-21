import { Text } from 'react-native';
import React from 'react';

const defaultFontFamily = 'Poppins_400Regular';

// Cast Text to any to access the hidden `render` method
const oldRender = (Text as any).render;

(Text as any).render = function (...args: any[]) {
  const origin = oldRender.call(this, ...args);

  return React.cloneElement(origin, {
    style: [{ fontFamily: defaultFontFamily }, origin.props.style],
  });
};

export default function OverrideFonts() {
  return null;
}