import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";

import MapComp from "./components/molecules/map-comp";
import tw from "twrnc";
import Footer from "./components/molecules/Footer";

type alert = {
  id: number;
  message: string;
  category: string;
  latitude: string;
  longitude: string;
  radius: string;
  time: string;
  severity: string;
};

export default function App() {
  return (
    <View style={tw.style(`h-full`, `relative`)}>
      <MapComp buttons={true} />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchInput: {
    borderRadius: 62,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 0,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginRight: 10,
  },
});
