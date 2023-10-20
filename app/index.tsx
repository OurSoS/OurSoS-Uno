import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import IntroLayout from "./intro/_layout";

export default function App() {

  return (
    <View style={styles.container}>
      <IntroLayout>
        <Text style={styles.header}>Welcome to OurSoS!</Text>
        <Link href="/intro-select-language">
          {/* <Pressable style={styles.button}> */}
          <Text style={styles.text}>Select Language</Text>
          {/* </Pressable> */}
        </Link>
        <Link href="/map"><Text>Go Map</Text></Link>
        <Link href="/news"><Text>Go News</Text></Link>
      </IntroLayout>
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
