import { View, Image, Modal, TouchableOpacity, StyleSheet, TextInput, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import tw from 'twrnc';
import React from 'react';

import { Avatar, Button, Card, Text, Snackbar } from 'react-native-paper';
import { router } from "expo-router";
// const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />

export default function ContentCard({ imgSrc, data, heading, snippet, onToggleSnackBar }: { imgSrc: string, data: any, heading: string, snippet: string, onToggleSnackBar: any }) {
      // const [visible, setVisible] = useState(false);

      // const onToggleSnackBar = () => setVisible(!visible);

      // const onDismissSnackBar = () => setVisible(false);
      // // onPress = { onToggleSnackBar } > { visible? 'Hide': 'Show' }
      return (
            <View style={tw.style("text-white w-50 pr-2")}>
                  <TouchableOpacity
                  style={tw.style("text-white")}
                  activeOpacity={0.6}
                  onPress={() => onToggleSnackBar(data)}
                  >
                        <Card style={tw.style(`mt-2 p-4 bg-[#001D3D] p-[10] h-48 flex justify-between`)}>
                              <Card.Cover
                              style={tw.style(`h-30 bg-[#001D3D]`)}
                              source={{ uri: imgSrc }}
                              />
                              <Text numberOfLines={ 2 } style={tw.style("text-white text-left pt-2")}>{heading}</Text>
                              {/* <Card.Content style={tw.style("text-white")}>
                              <Text style={tw.style("text-white")}>{snippet}</Text>
                              </Card.Content> */}
                        </Card>
                  </TouchableOpacity>
            </View>
      );
}
