import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import axios from "axios";
import staticText from "../utils/static-text.json";
import IntroTextButton from "./components/intro/intro-text-button";
import IntroLayout from "./components/intro/_layout";
import tw from "twrnc";
import Dashboard from "./components/dashboard/dashboard";

export type staticType = {
  "intro-friends": {
    details: string;
    heading: string;
  };
  "intro-map": {
    details: string;
    heading: string;
  };
  "intro-newsfeed": {
    details: string;
    heading: string;
  };
  map: {
    heading: string;
    "search-placeholder": string;
  };
  news: {
    heading: string;
    "search-placeholder": string;
    "pins-header": string;
    "friends-header": string;
    "view-more": string;
  };
  friends: {
    "search-placeholder": string;
  };
  article: {
    details: string;
  };
  "button-text": {
    continue: string;
    "back-button": string;
  };
};

type LanguageType = {
  name: string;
  tag: string;
};

export default function Index() {
  const [translatedStaticContent, setTranslatedStaticContent] =
    useState<any>(staticText);
  const [userLang, setUserLang] = useState("hi");
  const [introComponent, setIntroComponent] = useState("map");
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const setUserLanguage = async () => {
    const updateUserRequest = {
      username: "sam",
      latitude: 49.26357,
      longitude: -123.13857,
      languagepreference: userLang, // Ensure that languageTag is defined and has a valid value
      friends: [2, 3],
      profile: "https://picsum.photos/200/300?grayscale",
    };
    if (userLang) {
      setUserLang(userLang);

      // await axios
      //   .post<{ translateObject: staticType; lang: string }>(
      //     "https://oursos-backend-production.up.railway.app/translateobject",
      //     { translateObject: staticText, lang: userLang }
      //   )
      //   .then((res) => {
      //     setTranslatedStaticContent(res.data);
      //     setIntroComponent("newsFeed");
      //   });
    }
  };

  useEffect(() => {
    (async () => {
      // await axios
      //   .get("https://oursos-backend-production.up.railway.app/languages")
      //   .then((res) => {
      //     setLanguages(res.data);
      //   });

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      await axios
        .get("https://oursos-backend-production.up.railway.app/users/1")
        .then((res) => {
          setCurrentUser(res.data);
        });
    })();
  }, []);

  const buttonFunction = (buttonText: string) => {
    setIntroComponent(buttonText);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View style={styles.container}>
      {introComponent === "welcome" ? (
        <IntroTextButton
          heading="Welcome To OurSOS!"
          details="Empowering Your Safety, Connecting Our World"
          buttonNext="selectLocation"
          buttonText="Select Language"
          buttonFunction={buttonFunction}
        ></IntroTextButton>
      ) : introComponent === "selectLocation" ? (
        <IntroLayout>
          <Text style={styles.header}>Select your language</Text>
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
                  `text-white`,
                  `bg-white`,
                  `px-7`,
                  `py-3`,
                  `rounded-lg`,
                  `border`,
                  `mb-3`
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
            style={tw.style(
              `text-white`,
              `bg-[#003566]`,
              `px-7`,
              `py-3`,
              `rounded-lg`
            )}
          >
            <Text style={tw.style(`text-white`)}>Continue</Text>
          </Pressable>
        </IntroLayout>
      ) : introComponent === "newsFeed" ? (
        <IntroTextButton
          heading={translatedStaticContent["intro-newsfeed"].heading}
          details={translatedStaticContent["intro-newsfeed"].details}
          buttonNext="introMap"
          buttonText={translatedStaticContent["button-text"].continue}
          buttonFunction={buttonFunction}
        ></IntroTextButton>
      ) : introComponent === "introMap" ? (
        <IntroTextButton
          heading={translatedStaticContent["intro-map"].heading}
          details={translatedStaticContent["intro-map"].details}
          buttonNext="introFriends"
          buttonText={translatedStaticContent["button-text"].continue}
          buttonFunction={buttonFunction}
        ></IntroTextButton>
      ) : introComponent === "introFriends" ? (
        <IntroTextButton
          heading={translatedStaticContent["intro-friends"].heading}
          details={translatedStaticContent["intro-friends"].details}
          buttonNext="dashboard"
          buttonText={translatedStaticContent["button-text"].continue}
          buttonFunction={buttonFunction}
        ></IntroTextButton>
      ) : (
        <Dashboard user={currentUser} userLang={userLang}></Dashboard>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
