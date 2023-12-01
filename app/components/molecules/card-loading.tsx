import React from "react";
import { View } from "react-native";
import tw from "../../../lib/tailwind";

export default function CardLoading () {
      return (
            <View style={tw.style("animate-pulse bg-muted h-[4rem] w-[4rem] rounded-lg")}>
                  
            </View>
      )
}