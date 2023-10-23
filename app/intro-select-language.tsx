import React, { useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import IntroLayout from "./intro/_layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import * as langs from "./languages.json";
import { useRouter } from 'expo-router';
type LanguageType = {
  name: string;
  tag: string;
};
import { staticType } from ".";

import staticText from "../utils/static-text.json"
import { StaticTextContext, UserLanguageContext } from "./context/language-context";

export default function SelectLanguage() {

  const [translatedStaticContent, setTranslatedStaticContent] = useState(staticText);
  const [userLang, setUserLang] = useContext(UserLanguageContext);
  const router = useRouter();
  const [languages, setLanguages] = useState<LanguageType[]>([
    {
      name: "English",
      tag: "en",
    },
  ]);
  const [languageTag, setLanguageTag] = useState("en");

  useEffect(() => {
    axios
      .get("https://oursos-backend-production.up.railway.app/languagelistenglish")
      .then((res) => {
        setLanguages(res.data);
      });
  }, []);

  const setUserLanguage = () => {
    const updateUserRequest = {
      "username": "cunt",
      "locations": ["(40.7128,-74.006)"],
      "languagepreference": languageTag, // Ensure that languageTag is defined and has a valid value
      "friends": [2, 3],
    };
    if (languageTag) {
      setUserLang(languageTag);
      axios
        .put(
          "https://oursos-backend-production.up.railway.app/updateuser/1",
          updateUserRequest
        )
        .then((response) => {
          setUserLang(languageTag);
          axios.post<{ "translateObject": staticType, "lang": string }>("https://oursos-backend-production.up.railway.app/translateobject", { "translateObject": staticText, "lang": userLang })
            .then(res => {
              setTranslatedStaticContent(res.data.translateObject);
              console.log(res.data.translateObject);
            }).then(() => {
              console.log(translatedStaticContent);
            })
          router.replace("/intro-newsfeed")
        })
    }
  };


  return (
    <UserLanguageContext.Provider value={[userLang, setUserLang]}>
      <StaticTextContext.Provider value={[translatedStaticContent, setTranslatedStaticContent]}>
        <View style={styles.container}>
          <IntroLayout>
            <Text style={styles.header}>Select your language</Text>
            <FlatList
              style={styles.languageList}
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
                    // setCheckLangauge(index);
                    setLanguageTag(languages[index]?.tag);
                    console.log({ languageTag });
                  }}
                  style={styles.languageBtn}
                >
                  <Text style={styles.text}>{item.name}</Text>
                </Pressable>
              )}
            />

            {/* <Link > */}
            <Pressable
              onPress={() => {
                setUserLanguage();

              }}
              style={styles.button}
            >
              <Text style={styles.text}>Continue</Text>
            </Pressable>
            {/* </Link> */}
          </IntroLayout>
        </View>
      </StaticTextContext.Provider>
    </UserLanguageContext.Provider>
  );
}

const styles = StyleSheet.create({
  languageBtn: {
    display: "flex",
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: "rgba(255, 255, 255, .5)",
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 15,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  languageList: {
    padding: 52,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    maxHeight: 500,
    overflow: "scroll",
    gap: 10,
    backgroundColor: "rgba(248, 248, 248,0.5)",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
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
    textAlign: "left",
  },
});