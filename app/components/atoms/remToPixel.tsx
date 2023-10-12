import { Platform, PixelRatio } from 'react-native';

const fontScale = PixelRatio.getFontScale();

export const remToPixel = (rem: number) => {
  const baseFontSize = Platform.OS === 'ios' ? 16 : 14; // Set your base font size in pixels here
  return rem * baseFontSize * fontScale;
};