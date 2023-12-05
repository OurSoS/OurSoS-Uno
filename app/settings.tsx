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
import { getDeviceId } from "./chat";

export default function Settings() {
  const [profileImage, setProfileImage] = useState();
  const [currentUserName, setCurrentUserName] = useState();
  const [userLang, setUserLang] = useState("fa");
  const [translatedData, setTranslatedData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      await axios
        .post<{ userLang: string }>(
          `https://oursos-backend-production.up.railway.app/translateobject/${userLang}`
        )
        .then((res) => {
          setTranslatedData(res.data);
          // console.log(
          //   "===============translateadData=============",
          //   translatedData
          // );
        });
    })();
  }, []);

  useEffect(() => {
    // console.log(getDeviceId());
    (async () => {
      await axios
        .get(
          `https://oursos-backend-production.up.railway.app/users/${getDeviceId()}`
        )
        .then((response) => {
          setProfileImage(response.data.profile);
          setCurrentUserName(response.data.username);
        });
    })();
  }, []);

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
                {userLang !== "en"
                  ? translatedData?.menu?.settings
                  : "Settings"}
              </Text>
              <View style={tw.style("pt-8 pl-4 pr-4")}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={tw.style(`w-full h-20`)}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require("../assets/avatars/Avatar.png")}
                    style={tw.style(`w-full h-20`)}
                    resizeMode="contain"
                  />
                )}

                {currentUserName ? (
                  <Text style={tw.style(`text-center text-2xl`)}>
                    {currentUserName}
                  </Text>
                ) : (
                  <Text style={tw.style(`text-center text-2xl`)}>Username</Text>
                )}
              </View>
              <ScrollView>
                <View
                  style={tw.style(
                    `mt-8 mb-2 p-4 w-10/14 bg-white rounded-lg border border-gray-300 shadow-md self-center`
                  )}
                >
                  <Link href="/selectLanguage">
                    <Text style={tw.style(`text-[1rem] text-center`)}>
                      {userLang !== "en"
                        ? translatedData?.settings?.selectlanguage
                        : "Select Your Language"}
                    </Text>
                  </Link>
                </View>
                <View
                  style={tw.style(
                    `mt-8 mb-2 p-4 w-10/14 bg-white rounded-lg border border-gray-300 shadow-md self-center`
                  )}
                >
                  <Link href="/update-profile">
                    <Text style={tw.style(`text-[1rem] text-center`)}>
                      {userLang !== "en"
                        ? translatedData?.settings?.updateprofile
                        : "Update Profile"}
                    </Text>
                  </Link>
                </View>
                <View
                  style={tw.style(
                    `mt-8 mb-2 p-4 w-10/14 bg-white rounded-lg border border-gray-300 shadow-md self-center`
                  )}
                >
                  <Link href="/addfriend">
                    <Text style={tw.style(`text-[1rem] text-center`)}>
                      {userLang !== "en"
                        ? translatedData?.settings?.addfriend
                        : "Add Friend"}
                    </Text>
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
