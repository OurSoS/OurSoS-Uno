import React, { useEffect, useState } from "react";
import tw from "../lib/tailwind";
import {
  TextInput,
  Image,
  Pressable,
  View,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import * as FileSystem from "expo-file-system";
import { getDeviceId } from "./chat";
import axios from "axios";

export default function UpdateProfile() {
  const imgsrc = require("../assets/avatars/Avatar.png");
  const [profilePic, setProfilePic] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
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

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    //@ts-ignore
    if (!result.cancelled) {
      //@ts-ignore
      let base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setImage(base64);
    }
  };

  useEffect(() => {
    (async () => {
      await axios
        .get(
          `https://oursos-backend-production.up.railway.app/users/${getDeviceId()}`
        )
        .then(async (res) => {
          setProfilePic(res.data.profile);
        });
    })();
  }, []);

  const updateProfile = async () => {
    getDeviceId();
    await axios
      .get(
        `https://oursos-backend-production.up.railway.app/users/${getDeviceId()}`
      )
      .then(async (res) => {
        return res.data;
      })
      .then(async (user) => {
        await axios
          .post(
            "https://oursos-backend-production.up.railway.app/uploadimage",
            {
              imagefile: `data:image/png;base64,${image}`,
            }
          )
          .then(async (res) => {
            fetch(
              `https://oursos-backend-production.up.railway.app/updateuser/${user?.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: user.id,
                  deviceId: user.deviceId,
                  username: userName,
                  lat: user.lat,
                  long: user.long,
                  friends: user.friends,
                  languagepreference: user.languagepreference,
                  profile: res.data.url,
                }),
              }
            )
              .then((response) => {
                if (response.status == 200) {
                  Alert.alert(
                    "Profile Updated",
                    "Great Profile Updated Successfully"
                  );
                } else {
                  Alert.alert("Error", "Something went wrong");
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          });
      });
  };

  return (
    <ImageBackground
      source={require("../assets/Intro/Map.png")}
      style={styles.background}
    >
      <ScrollView
        style={tw.style(
          `flex`,
          `h-[100vh]`,
          `flex-col`,
          `w-full`,
          `relative`,
          `px-2`
        )}
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

        <View
          style={tw.style(`
                        w-[50] h-[50px]] overflow-hidden rounded-full self-center p-5
                        flex flex-col items-center justify-center`)}
        >
          {!profilePic && !image ? (
            <Image
              style={[tw.style(`w-full h-full`), { objectFit: "contain" }]}
              source={imgsrc}
              alt=""
              width={100}
              height={100}
            />
          ) : image ? (
            <Image
              source={{ uri: `data:image/png;base64,${image}` }}
              alt=""
              width={100}
              height={100}
              style={[tw.style(`w-full h-full`), { objectFit: "contain" }]}
            />
          ) : (
            <Image
              source={{ uri: profilePic }}
              alt=""
              width={100}
              height={100}
              style={[tw.style(`w-full h-full`), { objectFit: "contain" }]}
            />
          )}
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Pressable
            onPress={pickDocument}
            style={tw.style(
              `w-[50]`,
              `text-white`,
              `px-7`,
              `py-4`,
              `rounded-lg`,
              `mx-auto`
            )}
          >
            <Text style={tw.style(`text-black mx-auto text-md`)}>
              {userLang !== "en"
                ? translatedData?.settings?.updateimage
                : "Update Image"}
            </Text>
          </Pressable>
        </View>
        <TextInput
          maxLength={50}
          style={tw.style(
            "w-[80]",
            "mx-auto",
            "px-4",
            "py-2",
            "border",
            "border-gray-300",
            "rounded-md",
            "text-lg",
            "bg-white",
            "h-[12]"
          )}
          onChangeText={(val) => {
            setUserName(val);
          }}
          value={userName}
          placeholder={`${
            userLang !== "en" ? translatedData?.settings?.username : "User Name"
          }`}
          placeholderTextColor="#4B5563"
        />
        <Pressable
          onPress={updateProfile}
          style={tw.style(
            `w-[50]`,
            `text-white`,
            `bg-[#003566]`,
            `px-7`,
            `py-4`,
            `rounded-lg`,
            `mx-auto`,

            `mt-4`
          )}
        >
          <Text style={tw.style(`text-white mx-auto text-xl`)}>
            {userLang !== "en" ? translatedData?.settings?.done : "Done"}
          </Text>
        </Pressable>
      </ScrollView>
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
