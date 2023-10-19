import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link } from "expo-router";
import Footer from "../components/Footer";

const settingsArray = [
  "Notifications",
  "Manage Friends",
  "Languages",
  "Locations",
  "Accessibility",
];

export default function Settings() {
  return (<>
    <ImageBackground
      source={require("../assets/Intro/Map.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image style={styles.profileImage} source={require("../assets/favicon.png")} />
          <Text style={styles.profileUsername}>My Username</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {settingsArray.map((setting, i) => {
            return (
              <View style={styles.settingItem} key={i}>
                <Link href="/settings/notifications">
                  <TouchableOpacity style={styles.button}>
                    <Text>{setting}</Text>
                    <Image source={require("../assets/favicon.png")} />
                  </TouchableOpacity>
                </Link>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ImageBackground>
    <Footer />
  </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  userContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  scrollView: {
    marginBottom: 30,
  },
  settingItem: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    margin: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    marginTop:10,
    height:200,
    width:200,
    borderRadius: 25
  },
  profileUsername: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  }
});
