import Pubnub from "pubnub";
import { useState, useEffect } from "react";
import {
  TextInput,
  Pressable,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { Link } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import tw from "twrnc";
import React from "react";
import Footer from "./components/molecules/Footer";
import axios from "axios";
import Constants from "expo-constants";

const getDeviceId = (): string => {
  // This gets the installation ID, not a hardware ID
  return Constants.installationId;
};

const pubnub = new Pubnub({
  publishKey: "pub-c-3b2d833a-75f6-4161-91ea-e3a5752344eb",
  subscribeKey: "sub-c-7cec6aac-008e-4260-a63b-af4eb66b1272",
  userId: "myUniqueUserId",
});

export default function App() {
  return (
    <>
      <ImageBackground
        source={require("../assets/Intro/Map.png")}
        style={[tw.style("flex-1 justify-center"), { resizeMode: "cover" }]}
      >
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
                      <Text style={tw.style(`text-[1rem]`)}>
                        Change Language
                      </Text>
                    </View>
                  </Link>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </ImageBackground>
      <Footer />
    </>
  );
}
