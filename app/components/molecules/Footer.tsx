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
import tw from 'twrnc';
import React from "react";

export default function Footer() {
      return (
            <View style={tw.style(`flex`, `bg-white`, `py-2`, `px-4`, `flex-row`, `justify-between`, `items-center`, `h-[3.75rem]`, `absolute`, `bottom-0`, `w-full`)}>
                  <View >
                        <Link href="/">
                              <View style={tw.style(`flex`, `flex-col`, `items-center`, `justify-center`)}>
                                    <Image
                                          source={require("../../../assets/footerIcons/homeIcon.png")}
                                          style={styles.footerImage}
                                    />
                                    <Text style={tw.style(`text-[1rem]`)}>Home</Text>
                              </View>
                        </Link>
                  </View>
                  <View>
                        <Link href="/map">
                              <View style={tw.style(`flex`, `flex-col`, `items-center`, `justify-center`)}>
                                    <Image
                                          source={require("../../../assets/footerIcons/mapIcon.png")}
                                          style={styles.footerImage}
                                    />
                                    <Text style={tw.style(`text-[1rem]`)}>Map</Text>
                              </View>
                        </Link>
                  </View>
                  <View>
                        <Link href="/settings">
                              <View style={tw.style(`flex`, `flex-col`, `items-center`, `justify-center`)}>
                                    <Image
                                          source={require("../../../assets/footerIcons/settingIcon.png")}
                                          style={styles.footerImage}
                                    />
                                    <Text style={tw.style(`text-[1rem]`)}>Settings</Text>
                              </View>
                        </Link>
                  </View>
                  <View>
                        <Link href="/chat">
                              <View style={tw.style(`flex`, `flex-col`, `items-center`, `justify-center`)}>
                                    {/* <Image
                                          source={require("../../../assets/footerIcons/settingIcon.png")}
                                          style={styles.footerImage}
                                    /> */}
                                    <Text style={tw.style(`text-[1rem]`)}>Chat</Text>
                              </View>
                        </Link>
                  </View>
            </View>
      );
}

const styles = StyleSheet.create({
      footerImage: {
            width: 25,
            height: 25,
      },

});