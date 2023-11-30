import React from "react";
import { Dimensions, Platform, View, StyleSheet } from "react-native";
import tw from "twrnc";

import MapComp from "./components/molecules/map-comp";
import Footer from "./components/molecules/Footer";

const screenHeight = Dimensions.get("window").height;
const footerHeight =
  Platform.OS === "ios" ? screenHeight * 0.09 : screenHeight * 0.09;

const mapViewHeight =
  Platform.OS === "ios" ? screenHeight - footerHeight : undefined;

export default function Map() {
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
      <Footer />
    </>
  );
}
