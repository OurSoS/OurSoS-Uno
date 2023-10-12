import { Dimensions, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const remToPixel = (rem: number) => {
  const baseFontSize = Platform.OS === 'ios' ? 16 : 14; // Set your base font size in pixels here
  return RFValue(rem, screenHeight); // Using RFValue from react-native-responsive-fontsize
};