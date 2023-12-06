import React, { useEffect, useState } from "react";
import { Dimensions, Platform, View } from "react-native";
import tw from "twrnc";

import MapComp from "./components/molecules/map-comp";
import Footer from "./components/molecules/Footer";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDeviceId } from "./chat";
const screenHeight = Dimensions.get("window").height;
const mapViewHeight =
  Platform.OS === "ios" ? screenHeight * 0.87 : screenHeight * 0.9;

export default function Map() {
  const [currentUser,setCurrentUser] = useState();
  useEffect(() => {
    (async () => {
      let currentUser = JSON.parse(
        await AsyncStorage.getItem('currentUser')||""
      );

      setCurrentUser(currentUser);
    })();
  }, []);

  return (
    <>
      <View style={[tw.style(`h-full`), { height: mapViewHeight ?? "100%" }]}>
        <MapComp
          zoomEnabled={true}
          pitchEnabled={true}
          scrollEnabled={true}
          toolbarEnabled={true}
          buttons={true}
        />
      </View>
      {/* @ts-ignore */}
      <Footer lang={currentUser?.languagepreference ? currentUser.languagepreference : "en"}/>
    </>
  );
}
