import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import tw from "twrnc";
import React from "react";

import { Avatar, Button, Card, Text, Snackbar } from "react-native-paper";
import { router } from "expo-router";
// const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />

export default function ContentCard({
  imgSrc,
  data,
  heading,
  snippet,
  onToggleSnackBar,
}: {
  imgSrc: string;
  data: any;
  heading: string;
  snippet: string;
  onToggleSnackBar: any;
}) {
  // const [visible, setVisible] = useState(false);

  // const onToggleSnackBar = () => setVisible(!visible);

  // const onDismissSnackBar = () => setVisible(false);
  // // onPress = { onToggleSnackBar } > { visible? 'Hide': 'Show' }
  return (
    <View style={tw.style("text-white w-50 p-2")}>
      <TouchableOpacity
        style={tw.style("text-white")}
        onPress={() => onToggleSnackBar(data)}
      >
        <Card style={tw.style(`mt-2 bg-[#001D3D] p-2`)}>
          <Card.Cover
            style={tw.style(`p-2 h-35 bg-[#001D3D]`)}
            source={{ uri: imgSrc }}
          />
          <Text style={tw.style("text-white p-4")}>{heading}</Text>
          {/* <Card.Content style={tw.style("text-white")}>
            <Text style={tw.style("text-white")}>{snippet}</Text>
          </Card.Content> */}
        </Card>
      </TouchableOpacity>
    </View>
  );
}
