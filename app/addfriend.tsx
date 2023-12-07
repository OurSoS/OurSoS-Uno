import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Share,
  Pressable,
  View,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function AddFriend() {
  const [userId, setUserId] = useState<string>();
  const [addFriendUrl, setAddFriendUrl] = useState<string>("");
  const [userLang, setUserLang] = useState("en");
  const [translatedData, setTranslatedData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      let data = JSON.parse(
        (await AsyncStorage.getItem("translatedData")) || ""
      );
      setTranslatedData(data);
    })();
  }, []);

  const handleAddFriendSubmit = () => {
    if (!addFriendUrl) {
      console.log("No url provided");
      return;
    }

    (async () => {
      await axios
        .post(`${addFriendUrl}/${userId}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    })();
  };

  const handleShareButtonPress = async () => {
    const url = `https://oursos-backend-production.up.railway.app/addfriend/${userId}`;
    await Share.share({
      message: url,
    });
  };

  React.useEffect(() => {
    (async () => {
      let currentUser = JSON.parse(
        (await AsyncStorage.getItem("currentUser")) || ""
      );
      setUserId(currentUser.id);
      setUserLang(currentUser.languagepreference);
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
        <View style={tw.style("p-4 flex flex-col gap-3")}>
          <Text style={tw.style("text-2xl")}>
            {userLang !== "en"
              ? translatedData.settings.friendurl
              : "Friend Request Url"}
          </Text>
          <TextInput
            placeholder={`${
              userLang !== "en"
                ? translatedData?.settings?.friendurl
                : "Enter Friend Url"
            }`}
            style={tw.style("border border-primary")}
            value={addFriendUrl}
            onChangeText={setAddFriendUrl}
          ></TextInput>
          <Pressable
            onPress={handleAddFriendSubmit}
            style={tw.style(
              "flex flex-col p-2 bg-[#001d3d] rounded-md justify-center items-center"
            )}
          >
            <Text style={tw.style("text-white")}>
              {userLang !== "en"
                ? translatedData?.settings?.addfriend
                : "Add Friend"}
            </Text>
          </Pressable>
        </View>

        <View style={tw.style("flex-1 justify-center items-center")}>
          <Pressable
            onPress={handleShareButtonPress}
            style={tw.style(
              "flex flex-col p-2 bg-[#001d3d] rounded-md justify-center items-center"
            )}
          >
            <Text style={tw.style("text-white")}>{`${
              userLang !== "en"
                ? translatedData?.settings?.addfriend
                : "Share Friend Request URL"
            }`}</Text>
          </Pressable>
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
