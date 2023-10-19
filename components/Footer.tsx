import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import { Image } from "react-native";
import { Link } from "expo-router";
import axios from "axios";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/dev";

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerColumn}>
          <Link href="/news">
            <View style={styles.footerItem}>
              <Image
                source={require("../assets/footerIcons/homeIcon.png")}
                style={styles.footerImage}
              />
              <Text style={styles.footerText}>Home</Text>
            </View>
          </Link>
        </View>
        <View style={styles.footerColumn}>
          <Link href="/map">
            <View style={styles.footerItem}>
              <Image
                source={require("../assets/footerIcons/mapIcon.png")}
                style={styles.footerImage}
              />
              <Text style={styles.footerText}>Map</Text>
            </View>
          </Link>
        </View>
        <View style={styles.footerColumn}>
          <Link href="/settings">
            <View style={styles.footerItem}>
              <Image
                source={require("../assets/footerIcons/settingIcon.png")}
                style={styles.footerImage}
              />
              <Text style={styles.footerText}>Settings</Text>
            </View>
          </Link>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#eee", // Adjust the background color as needed
    height: 60, // Adjust the height as needed
  },
  footerColumn: {
    flex: 1,
    alignItems: "center",
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  footerImage: {
    width: 25,
    height: 25,
  },
  footerText: {
    fontSize: 16,
  },
});
