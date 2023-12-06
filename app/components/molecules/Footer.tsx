import { Text, View, StyleSheet } from "react-native";
import { Image } from "react-native";
import { Link } from "expo-router";
import tw from "twrnc";
import React from "react";
import { Dimensions } from "react-native";
import { Platform } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const screenHeight = Dimensions.get("window").height;
const footerHeight =
  Platform.OS === "ios" ? screenHeight * 0.09 : screenHeight * 0.09;

export default function Footer() {
  const [translatedData, setTranslatedData] = useState<any>([]);
  const [lang, setLang] = useState("en");
  useEffect(() => {
    (async () => {
      let data = JSON.parse(
        await AsyncStorage.getItem('translatedData') ||""
      );
      setTranslatedData(data);

      let currentUser = JSON.parse(
        await AsyncStorage.getItem('currentUser')||""
      );
      setLang(currentUser.languagepreference);
    })();
  }, []);

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
            <Text style={tw.style(`text-[1rem]`)}>
              {lang !== "en" ? translatedData?.menu?.home : "Home"}
            </Text>
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
            <Text style={tw.style(`text-[1rem]`)}>
              {lang !== "en" ? translatedData?.dashboard?.map : "Map"}
            </Text>
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
            <Text style={tw.style(`text-[1rem]`)}>
              {lang !== "en" ? translatedData?.menu?.settings : "Settings"}
            </Text>
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
