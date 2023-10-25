import { View, Text, Pressable } from "react-native";
import tw from 'twrnc';
import IntroLayout from "./_layout";
export default function IntroTextButton({ heading, buttonText, details, buttonFunction, buttonNext }: { heading: string, buttonText: string, details: string, buttonFunction: (btnNext: string) => void, buttonNext: string }) {
        return (
                <IntroLayout>
                        <Text style={tw.style(`text-[2rem]`, `text-center`, `mb-10`)}>{heading}</Text>
                        <Text style={tw.style(`text-[1rem]`, `text-left`, `mb-10`)}>{details}</Text>
                        <Pressable onPress={() => buttonFunction(buttonNext)}>
                                <Text style={tw.style(`text-white`, `bg-[#003566]`, `px-7`, `py-3`, `rounded-lg`)}>{buttonText}</Text>
                        </Pressable>
                </IntroLayout>
        );
}