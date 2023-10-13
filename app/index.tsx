import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import AtomIcon from "./components/atoms/icon";
import Header from "./components/molecules/header";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    console.log("Location", location);
  }, [location]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      {/* <AtomIcon icon="home" /> */}
      <StatusBar style="auto" />
      <Header
        title="Welcome to OurSoS!"
        hasBackButton={false}
        hasToggleSwitch={false}
        hasLocation={false}
        hasSearchbar={false}
        hasLogo={true}
      ></Header>

      <Link href="/intro-select-language">
        <Pressable style={styles.button}>
          <Text style={styles.text}>Select Language</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
