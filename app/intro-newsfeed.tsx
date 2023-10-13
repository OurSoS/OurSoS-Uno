import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Link } from "expo-router";
import AtomIcon from "./components/atoms/icon";
import Header from "./components/molecules/header";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function IntroNewsFeed() {
  return (
    <View style={styles.container}>
      <AtomIcon icon="home" />
      <StatusBar style="auto" />
      <Header
        title="News Feed"
        hasBackButton={true}
        hasToggleSwitch={false}
        hasLocation={false}
        hasSearchbar={false}
        hasLogo={true}
      ></Header>

      <Link href="/intro-map">
        <Pressable>
          <Text>Continue</Text>
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
