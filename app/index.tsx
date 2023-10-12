import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AtomIcon from "./components/atoms/icon";
import Header from "./components/molecules/header";
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    console.log('Location', location)
  }, [location])

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <AtomIcon icon="home" />
      <StatusBar style="auto" />
      <Header
        title="OurSOS"
        hasBackButton={true}
        hasToggleSwitch={false}
        hasLocation={false}
        hasSearchbar={false}
        hasLogo={true}

      ></Header>
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
});
