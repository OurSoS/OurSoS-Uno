import React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";
import IntroLayout from "./intro/_layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import * as langs from "./languages.json";
type LanguageType = {
  name: string;
  tag: string;
};

export default function SelectLanguage() {
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    axios
      .get("https://oursos-backend-production.up.railway.app/languages")
      .then((res) => {
        setLanguages(res.data);
      });
  }, []);

  return (
    <View style={styles.container}>
      <IntroLayout>
        <Text style={styles.header}>Select your language</Text>
        <FlatList
          style={styles.languageList}
          data={languages}
          renderItem={({ item }: { item: LanguageType }) => (
            <Pressable style={styles.languageBtn}>
              <Text style={styles.text}>{item.name}</Text>
            </Pressable>
          )}
        />

        <Link href="/intro-newsfeed">
          <Pressable style={styles.button}>
            <Text style={styles.text}>Continue</Text>
          </Pressable>
        </Link>
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
