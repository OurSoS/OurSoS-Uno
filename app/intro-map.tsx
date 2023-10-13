import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import Header from "./components/molecules/header";
import React, { useState, useEffect } from "react";
import IntroLayout from "./intro/_layout";

export default function IntroMap() {
  return (
    <View style={styles.container}>
      <IntroLayout>
        <Text style={styles.header}>Map</Text>
        <View style={styles.innercontainer}>
          <Text style={styles.text}>
            Visualizing crisis information is crucial. OurSOS offers an
            interactive map view that displays crises and dangers in your area.
            This user-friendly interface helps you understand the proximity of
            threats and aids in making quick and informed decisions.
          </Text>
          <Link href="/intro-friends">
            <Pressable style={styles.button}>
              <Text style={styles.text}>Continue</Text>
            </Pressable>
          </Link>
        </View>
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
  innercontainer: {
    padding: 36,
    transparent: true,
    alignItems: "center",
    backgroundColor: "rgba(125, 125, 125, .3)",
    borderRadius: 10,
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
