import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import { Image } from "react-native";
import { Link } from "expo-router";
import axios from "axios";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/dev";
import tw from "twrnc";
import React from "react";
import { Dimensions } from "react-native";
import { Platform } from "react-native";

const screenHeight = Dimensions.get("window").height;
const footerHeight =
  Platform.OS === "ios" ? screenHeight * 0.09 : screenHeight * 0.09;

export default function Footer() {
  return (
    <View
      style={tw.style(
        `border-t border-gray-300 flex bg-white py-2 px-6 flex-row justify-between items-center absolute bottom-0 w-full`,
        { height: footerHeight }
      )}
    >
      <View>
        <Link href="/">
          <View
            style={tw.style(`pt-2 flex flex-col items-center justify-center`)}
          >
            <Image
              source={require("../../../assets/footerIcons/dark/homeIcon-darkBlue.png")}
              style={styles.footerImage}
            />
            <Text style={tw.style(`text-[1rem]`)}>Home</Text>
          </View>
        </Link>
      </View>
      <View>
        <Link href="/map">
          <View
            style={tw.style(`pt-2 flex flex-col items-center justify-center`)}
          >
            <Image
              source={require("../../../assets/footerIcons/mapIcon.png")}
              style={styles.footerImage}
            />
            <Text style={tw.style(`text-[1rem]`)}>Map</Text>
          </View>
        </Link>
      </View>
      <View>
        <Link href="/settings">
          <View
            style={tw.style(`pt-2 flex flex-col items-center justify-center`)}
          >
            <Image
              source={require("../../../assets/footerIcons/dark/settingIcon-darkBlue.png")}
              style={styles.footerImage}
            />
            <Text style={tw.style(`text-[1rem]`)}>Settings</Text>
          </View>
        </Link>
      </View>
      <View>
        <Link href="/chat">
          <View
            style={tw.style(`pt-2 flex flex-col items-center justify-center`)}
          >
            <Image
              source={require("../../../assets/footerIcons/dark/robotIcon-darkBlue.png")}
              style={styles.footerImage}
            />
            <Text style={tw.style(`text-[1rem]`)}>Chat</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerImage: {
    width: 25,
    height: 25,
  },
});
