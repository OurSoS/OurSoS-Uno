import React from "react";
import { Dimensions, Platform, ImageBackground, View } from "react-native";
import tw from "twrnc";
import { styles } from "./styles/settingsStyles";

import MapComp from "./components/molecules/map-comp";
import Footer from "./components/molecules/Footer";

const screenHeight = Dimensions.get("window").height;
const mapViewHeight =
  Platform.OS === "ios" ? screenHeight * 0.87 : screenHeight * 0.9;

export default function Map() {
  return (
    <>
      <ImageBackground
        source={require("../assets/Intro/Map.png")}
        style={styles.background}
      />
      <View style={tw.style("flex")}>
        <View style={tw.style(`flex flex-col justify-between h-full`)}>
          <View>
            <View style={tw.style(`h-full`, `relative`)}>
              <MapComp height={mapViewHeight} buttons={true} />
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </>
  );
}
