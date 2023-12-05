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
} from "react-native";
import tw, { create } from "twrnc";

type LanguageType = {
  name: string;
  tag: string;
};

export default function SelectLanguages() {
  const [languages, setLanguages] = useState<LanguageType[]>([]);
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

  const setUserLanguage = async () => {
    const updateUserRequest = {
      username: "sam",
      latitude: 49.26357,
      longitude: -123.13857,
      languagepreference: userLang, // Ensure that languageTag is defined and has a valid value
      friends: [2, 3],
      profile: "https://picsum.photos/200/300?grayscale",
    };
  };

  useEffect(() => {
    (async () => {
      setLanguages([
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

  // useEffect(() => {
  //   (async () => {
  //     await axios
  //       .get("https://oursos-backend-production.up.railway.app/languages")
  //       .then((res) => {
  //         setLanguages(res.data);
  //       });
  //   })();
  // }, []);

  return (
    <>
      <ImageBackground
        source={require("../assets/Intro/Map.png")}
        style={styles.background}
      >
        <View>
          <Link href="/settings">
            <View
              style={tw.style(
                "flex flex-col p-2 bg-[#001d3d] rounded-md justify-center items-center"
              )}
            >
              <Text style={tw.style("text-white")}>Back</Text>
            </View>
          </Link>
        </View>
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
            style={tw.style(`text-white bg-[#003566] px-7 py-3 rounded-lg`)}
          >
            <Text style={tw.style(`text-white`)}>
              {" "}
              {userLang !== "en"
                ? translatedData?.settings?.continue
                : "Continue"}
            </Text>
          </Pressable>
        </IntroLayout>
      </ImageBackground>
    </>
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
