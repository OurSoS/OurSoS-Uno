import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import AtomIcon from "./components/atoms/icon";
import Header from "./components/molecules/header";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function IntroLocation() {
  return (
    <View style={styles.container}>
      <AtomIcon icon="home" />
      <StatusBar style="auto" />
      <Header
        title="Allow use of Location Services?"
        hasBackButton={true}
        hasToggleSwitch={false}
        hasLocation={false}
        hasSearchbar={false}
        hasLogo={true}
      ></Header>

      <Link href="/news">
        <Pressable>
          <Text>Yes</Text>
        </Pressable>
        <Pressable>
          <Text>No</Text>
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
});
