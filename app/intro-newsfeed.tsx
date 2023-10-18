import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import IntroLayout from "./intro/_layout";
import { UserLanguageContext } from "./context/language-context";
import axios from "axios";

type UserType = {
  id: number;
  username: string;
  locations: string[];
  languagepreference: string;
  friends: number[];
}

export default function IntroNewsFeed() {
  const [userLang, setUserLang] = useState("en");
  const [newsHeading, setNewsHeading] = useState("News Feed");
  const [newsText, setNewsText] = useState("");

  useEffect(() => {
    axios.get<UserType>("https://oursos-backend-production.up.railway.app/users/1").then((user) => {
      setUserLang(user.data.languagepreference);
      console.log(user.data.languagepreference);
    })
  }, []);

  useEffect(() => {

    const data = {
      "text": "Staying informed goes beyond crisis alerts.That's why we've included a local news dashboard for your saved locales.OurSOS keeps you up-to-date with relevant news and developments, helping you navigate through any situation effectively.",
      "lang": userLang
    }
    const headingData = {
      "text": "NewsFeed",
      "lang": userLang
    }

    axios
      .post("https://oursos-backend-production.up.railway.app/translate", data)
      .then((res) => {
        setNewsText(res.data);
      });

    axios
      .post("https://oursos-backend-production.up.railway.app/translate", headingData)
      .then((res) => {
        setNewsHeading(res.data);
      });

  }, [userLang]);


  return (
    <UserLanguageContext.Provider value={[userLang, setUserLang]} >
      <View style={styles.container}>
        <IntroLayout>
          <Text style={styles.header}>{newsHeading}</Text>
          <View style={styles.innercontainer}>
            <Text style={styles.text}>
              {newsText}
            </Text>
            <Link href="/intro-map">
              {/* <Pressable style={styles.button}> */}
              <Text style={styles.text}>Continue</Text>
              {/* </Pressable> */}
            </Link>
          </View>
        </IntroLayout>
      </View>
    </UserLanguageContext.Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  innercontainer: {
    padding: 36,
    transparent: true,
    alignItems: "center",
    backgroundColor: "rgba(125, 125, 125, .3)",
    borderRadius: 10,
  },
  container: {
    flex: 1,
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
