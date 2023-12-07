import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { FlatList, Alert, StyleSheet, Share, Pressable, View, Text, TextInput, ImageBackground } from "react-native";
=======
import {
  StyleSheet,
  Share,
  Pressable,
  View,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";
>>>>>>> acff719fc266cc410f4ef8f363e503a96c7ef9d2
import { router } from "expo-router";
import { Image } from "react-native";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import 
export default function AddFriend() {
  const [userId, setUserId] = useState<string>();
  const [addFriendUrl, setAddFriendUrl] = useState<string>("");
  const [userLang, setUserLang] = useState("en");
  const [translatedData, setTranslatedData] = useState<any>([]);
  const [friends, setFriends] = useState<any>([]);

  useEffect(() => {
    (async () => {
      let data = JSON.parse(
<<<<<<< HEAD
        await AsyncStorage.getItem('translatedData') || ""
=======
        (await AsyncStorage.getItem("translatedData")) || ""
>>>>>>> acff719fc266cc410f4ef8f363e503a96c7ef9d2
      );
      setTranslatedData(data);

      let currentUser = JSON.parse(await AsyncStorage.getItem('currentUser') || "");

      const res = await fetch(
        `https://oursos-backend-production.up.railway.app/getfriendsforuser/${currentUser.id}`
      );
      const myFriends = await res.json();
      setFriends(myFriends);
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
        .then((res) => {
          if (res.status == 200) {
            Alert.alert(
              "Added Friend",
              "Great Added Successfully"
            );
            (async () => {
              let currentUser = JSON.parse(await AsyncStorage.getItem('currentUser') || "");
  
              const res = await fetch(
                `https://oursos-backend-production.up.railway.app/getfriendsforuser/${currentUser.id}`
              );
              const myFriends = await res.json();
              setFriends(myFriends);
            })()
          }
        })
        .catch((err) => console.log(err));
    })();
  };

  const handleRemoveFriend = async (friendId: number) => {
    await axios
      .post(`https://oursos-backend-production.up.railway.app/removefriend/${userId}/${friendId}`)
      .then((res) => {
        if (res.status == 200) {
          Alert.alert(
            "Friend Removed",
            "Great Friend Removed Successfully"
          );
          (async () => {
            let currentUser = JSON.parse(await AsyncStorage.getItem('currentUser') || "");

            const res = await fetch(
              `https://oursos-backend-production.up.railway.app/getfriendsforuser/${currentUser.id}`
            );
            const myFriends = await res.json();
            setFriends(myFriends);
          })()
        }
      })
      .catch((err) => { console.log(err) })
  }


  const handleShareButtonPress = async () => {
    const url = `https://oursos-backend-production.up.railway.app/addfriend/${userId}`;
    await Share.share({
      message: url,
    });
  };

  React.useEffect(() => {
    (async () => {
      let currentUser = JSON.parse(
<<<<<<< HEAD
        await AsyncStorage.getItem('currentUser') || ""
=======
        (await AsyncStorage.getItem("currentUser")) || ""
>>>>>>> acff719fc266cc410f4ef8f363e503a96c7ef9d2
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
<<<<<<< HEAD
              {userLang !== "en"
                ? translatedData?.settings?.back :
                "Back"
              }
=======
              {userLang !== "en" ? translatedData?.settings?.back : "Back"}
>>>>>>> acff719fc266cc410f4ef8f363e503a96c7ef9d2
            </Text>
          </Pressable>
          <Pressable
            onPress={handleShareButtonPress}
            style={tw.style(
              "flex flex-col p-2 bg-transparent rounded-md justify-center items-center"
            )}
          >
            <Text style={tw.style("text-white")}>
              {/* Fathema Khanom */}
              <Image
                alt="Fathema Khanom free icon Image to add friend"
                source={require("../assets/add-friend.png")}
                style={tw.style(
                  `w-6 h-6`,
                )}
              />
            </Text>
          </Pressable>
        </View>

        <View style={tw.style("p-4 flex flex-col gap-3")}>
          <Text style={tw.style("text-2xl")}>
<<<<<<< HEAD
            {
              userLang !== "en"
                ? translatedData.settings.friendurl
                : "Friend Request Url"
            }
          </Text>
          <View style={tw.style("w-full flex flex-row justify-between")}>
            <TextInput
              style={tw.style("border border-primary px-2 py-1 w-[60%] rounded-md")}
              placeholder={`${userLang !== 'en' ? translatedData?.settings?.friendurl : 'Enter Friend Url'}`}
              // style={tw.style("border border-primary")}
              value={addFriendUrl}
              onChangeText={setAddFriendUrl}
            ></TextInput>
            <Pressable
              onPress={handleAddFriendSubmit}
              style={tw.style(
                "flex flex-col p-2 bg-[#001d3d] rounded-md justify-center items-center"
              )}
            >
              <Text style={tw.style("text-white")}>{userLang !== "en"
                ? translatedData?.settings?.addfriend
                : "Add Friend"}</Text>
            </Pressable>

          </View>

        </View>
        <Text style={tw.style("text-2xl p-4")}>
          Friend List
        </Text>
        <FlatList
          style={tw.style(`w-full`, `flex`, `flex-col`)}
          data={friends}
          renderItem={({
            item,
            index,
          }: {
            item: any
            index: number;
          }) => (
            <View style={tw.style("flex flex-row w-[30%] gap-3 items-center justify-between p-4 fit-content")}>
              <View style={tw.style("flex flex-col justify-center items-center gap-2")}>
                <Image
                  source={{ uri: item.profile }}
                  style={tw.style(
                    `w-15 h-15 rounded-full border-2 border-[#001D3D]`
                  )}
                />
                <Text style={styles.text}>{item.username}</Text>
              </View>
              <Pressable
                onPress={() => {
                  handleRemoveFriend(item.id);
                }}
                style={tw.style(
                  `px-7`,
                  `py-3`,
                  `rounded-lg`,
                  `text-white`,
                )}
              >
                <Image
                  alt="Fathema Khanom free icon Image to add friend"
                  source={require("../assets/delete-account.png")}
                  style={tw.style(
                    `w-6 h-6`,
                  )}
                />
              </Pressable>
            </View>
          )}
        />
=======
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
>>>>>>> acff719fc266cc410f4ef8f363e503a96c7ef9d2
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
