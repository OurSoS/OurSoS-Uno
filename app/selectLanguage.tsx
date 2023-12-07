import React, { useState, useEffect, useContext } from "react";
import { Link } from "expo-router";
import axios from "axios";
import IntroLayout from "./components/intro/_layout";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ImageBackground,
  Alert,
} from "react-native";
import { router } from "expo-router";
import tw, { create } from "twrnc";

type LanguageType = {
  name: string;
  tag: string;
};

import { getDeviceId } from "./chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SelectLanguages() {
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [userLang, setUserLang] = useState("");
  const [translatedData, setTranslatedData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      let currentUser = JSON.parse(
        (await AsyncStorage.getItem("currentUser")) || ""
      );
      setUserLang(currentUser.languagepreference);
      let data = JSON.parse(
        (await AsyncStorage.getItem("translatedData")) || ""
      );
      setTranslatedData(data);
    })();
  }, []);

  const setUserLanguage = async () => {
    let user = JSON.parse((await AsyncStorage.getItem("currentUser")) || "");
    console.log({ user });
    fetch(
      `https://oursos-backend-production.up.railway.app/updateuser/${user?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?.id,
          deviceId: user?.deviceId,
          username: user?.userName,
          lat: user?.lat,
          long: user?.long,
          friends: user?.friends,
          languagepreference: userLang,
          profile: user?.profile,
        }),
      }
    )
      .then(async (response) => {
        if (response.status == 200) {
          Alert.alert("Profile Updated", "Great Profile Updated Successfully");
          AsyncStorage.setItem(
            "currentUser",
            JSON.stringify({
              id: user.id,
              deviceId: user.deviceId,
              username: user.username,
              lat: user.lat,
              long: user.long,
              friends: user.friends,
              languagepreference: userLang,
              profile: user.profile,
            })
          );

          await axios
            .post<{ userLang: string }>(
              `https://oursos-backend-production.up.railway.app/translateobject/${userLang}`
            )
            .then((res) => {
              setTranslatedData(res.data);
              AsyncStorage.setItem("translatedData", JSON.stringify(res.data));
            });
        } else {
          Alert.alert("Error", "Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    (async () => {
      setLanguages([
        {
          name: "English",
          tag: "en",
        },
        {
          name: "Polski",
          tag: "pl",
        },
        {
          name: "中國傳統的）",
          tag: "zh-TW",
        },
        {
          name: "فارسی",
          tag: "fa",
        },
      ]);
    })();
  }, []);

  const handleBackButtonPress = () => {
    router.push("/settings");
  };

  return (
    <ImageBackground
      source={require("../assets/Intro/Map.png")}
      style={styles.background}
    >
      <View style={tw.style("flex-1")}>
        <View style={tw.style("flex-row justify-between items-center p-4")}>
          <Pressable
            onPress={handleBackButtonPress}
            style={tw.style(
              "flex flex-col p-2 bg-[#001d3d] rounded-md justify-center items-center"
            )}
          >
            <Text style={tw.style("text-white")}>
              {userLang !== "en" ? translatedData?.settings?.back : "Back"}
            </Text>
          </Pressable>
        </View>
        <View style={tw.style("p-4 flex flex-col gap-3 items-center")}>
          <IntroLayout>
            <Text style={styles.header}>
              {" "}
              {userLang !== "en"
                ? translatedData?.settings?.selectlanguage
                : "Select Your Language"}
            </Text>
            <FlatList
              style={tw.style(`w-full`, `flex`, `flex-col`)}
              data={languages}
              renderItem={({
                item,
                index,
              }: {
                item: LanguageType;
                index: number;
              }) => (
                <Pressable
                  onPress={() => {
                    setUserLang(languages[index]?.tag);
                    console.log(languages[index]?.tag);
                  }}
                  style={tw.style(
                    `px-7`,
                    `py-3`,
                    `rounded-lg`,
                    `border`,
                    `mb-3`,
                    userLang === languages[index]?.tag
                      ? `bg-gray-400`
                      : `bg-white`
                  )}
                >
                  <Text style={styles.text}>{item.name}</Text>
                </Pressable>
              )}
            />
            <Pressable
              onPress={() => {
                setUserLanguage();
              }}
              style={tw.style(`text-white bg-[#001d3d] px-7 py-3 rounded-lg`)}
            >
              <Text style={tw.style(`text-white`)}>
                {" "}
                {userLang !== "en"
                  ? translatedData?.settings?.continue
                  : "Select Your Language"}
              </Text>
            </Pressable>
          </IntroLayout>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    margin: "auto",
  },
  btnContinue: {
    backgroundColor: "#003566",
    color: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "rgba(125, 125, 125, .6)",
    marginTop: 24,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    objectFit: "cover",
    width: "100%",
    height: "100%",
    top: 0,
    position: "absolute",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
});
