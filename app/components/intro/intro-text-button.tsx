import { View, Text, Pressable } from "react-native";
import tw from "twrnc";
import IntroLayout from "./_layout";
import React from "react";
export default function IntroTextButton({
  heading,
  buttonText,
  details,
  buttonFunction,
  buttonNext,
}: {
  heading: string;
  buttonText: string;
  details: string;
  buttonFunction: (btnNext: string) => void;
  buttonNext: string;
}) {
  return (
    <IntroLayout>
      <View style={tw.style(`flex justify-center items-center`)}>
        <Text style={tw.style(`text-[2rem] text-center mb-10 max-w-[85%]`)}>{heading}</Text>
        <Text style={tw.style(`text-[1rem] text-left mb-10 max-w-[85%] text-center`)}>{details}</Text>
        <Pressable
          style={tw.style(`text-white bg-[#003566] px-7 py-3 rounded-lg`)}
          onPress={() => buttonFunction(buttonNext)}
        >
          <Text style={tw.style(`text-white`)}>{buttonText}</Text>
        </Pressable>
      </View>
    </IntroLayout>
  );
}
