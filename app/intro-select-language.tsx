import React from "react";
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

export default function SelectLanguage() {

  const router = useRouter();
  const [languages, setLanguages] = useState<LanguageType[]>([
    {
      name: "English",
      tag: "en",
    },
  ]);
  const [checkLangauge, setCheckLangauge] = useState(0);
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
      console.log({ languageTag });
      //get the real language Tag from the the backend boobs 00

      axios
        .put(
          "https://oursos-backend-production.up.railway.app/updateuser/1",
          updateUserRequest
        )
        .then((response) => {
          console.log("User updated successfully", response.data);
          router.replace("/intro-newsfeed")
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      console.log("No user language tag");
    }
  };
  return (
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
                setCheckLangauge(index);
                setLanguageTag(languages[index]?.tag);
                console.log({ languageTag });
              }}
              style={styles.languageBtn}
            >
              <Text style={styles.text}>{item.name}</Text>
              {index == checkLangauge && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width={30}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
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
