import tw from "../lib/tailwind";
import React from "react";
import { Text, View, ScrollView, ImageBackground, Image } from "react-native";
import { Link } from "expo-router";
import Footer from "./components/molecules/Footer";
import { styles } from "./styles/settingsStyles";

export default function Settings() {
  return (
    <>
      <ImageBackground
        source={require("../assets/Intro/Map.png")}
        style={styles.background}
      />
      <View style={tw.style("flex")}>
        <View style={tw.style(`flex flex-col justify-between h-full`)}>
          <View>
            <Text
              style={tw.style(
                `text-center text-2xl`,
                `font-bold`,
                `mt-2.5`,
                `mb-2.5`
              )}
            >
              Settings
            </Text>
            <View style={tw.style("pt-8 pl-4 pr-4")}>
              <Image
                source={require("../assets/avatars/Avatar.png")}
                style={tw.style(`w-full h-20`)}
                resizeMode="contain"
              />
              <Text style={tw.style(`text-center text-2xl`)}>Username</Text>
            </View>
            <ScrollView>
              <View>
                <Link href="/selectLanguage">
                  <View
                    style={tw.style(
                      `pt-2 flex flex-col items-center justify-center`
                    )}
                  >
                    <Text style={tw.style(`text-[1rem]`)}>Change Language</Text>
                  </View>
                </Link>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <Footer />
    </>
  );
}
