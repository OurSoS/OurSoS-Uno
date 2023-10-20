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

const fakeUser = {
  username: "John123",
  profileImage: {uri:"https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nfGVufDB8fDB8fHww"},
}

export default function Settings() {
  return (
    <>
      <ImageBackground
        source={require("../assets/Intro/Map.png")}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.userContainer}>
          <Image style={styles.profileImage} source={fakeUser.profileImage} />
            <Text style={styles.profileUsername}>{fakeUser.username}</Text>
          </View>
          <ScrollView style={styles.scrollView}>
          {settingsArray.map((setting, i) => {
  return (
    <View style={styles.settingItem} key={i}>
      <Link href="/settings/notifications">
        <TouchableOpacity style={styles.button}>
          <View style={styles.leftContent}>
            <Text>{setting}</Text>
          </View>
          <View style={styles.rightContent}>
            <Image source={require("../assets/favicon.png")} />
          </View>
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
    minWidth: 300,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    marginLeft: 10,
  },
  profileImage: {
    display: "flex",
    marginTop: 10,
    height: 200,
    width: 200,
    borderRadius: 25,
  },
  profileUsername: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
});
