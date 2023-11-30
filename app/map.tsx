import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";

import MapComp from "./components/molecules/map-comp";
import tw from 'twrnc';

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
      <MapComp zoomEnabled={true} pitchEnabled={true} scrollEnabled={true} toolbarEnabled={true} buttons={true} />
      {/* <Footer /> */}
    </View>
  );
}