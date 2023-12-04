import React, { useState } from "react";
import { Button, Share, Pressable, View, Text, TextInput } from "react-native";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import tw from "twrnc";
import { getDeviceId } from "./chat";
import axios from "axios";
export default function AddFriend() {
  const [userId, setUserId] = useState<string>();
  const [addFriendUrl, setAddFriendUrl] = useState<string>("");

  const handleAddFriendSubmit = () => {
    if (!addFriendUrl) {
      console.log("No url provided");
      return;
    }
    axios.post(addFriendUrl)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }


  const handleShareButtonPress = async () => {
    const url = `exp://mlxl3ng.anonymous.8081.exp.direct/addfriend/${userId}`;
    await Share.share({
      message: url,
    });
  };

  const handleIncomingURL = async (event: any) => {
    const friendId = event.url.replace("exp://mlxl3ng.anonymous.8081.exp.direct/addfriend/", "");

    // Make a POST request to your API endpoint here to add the current user and friendId as friends
    fetch(
      "https://oursos-backend-production.up.railway.app/addfriend/" +
      userId +
      "/" +
      friendId,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error(error));
  };

  React.useEffect(() => {
    const deviceId = getDeviceId();

    fetch(`https://oursos-backend-production.up.railway.app/users/${deviceId}`)
      .then((response) => response.json())
      .then((json) => setUserId(json.id))
      .catch((error) => console.error(error));

    Linking.addEventListener("url", handleIncomingURL);

    return () => {
      //@ts-ignore
      Linking.removeEventListener("url", handleIncomingURL);
    };
  }, []);

  const handleBackButtonPress = () => {
    router.push("/settings");
  };

  return (
    <View style={tw.style("flex-1")}>

      <TextInput style={tw.style("border border-primary")}  value={addFriendUrl} onChangeText={setAddFriendUrl}></TextInput>
      <Pressable 
      style={tw.style(
            "flex flex-col p-2 bg-[#001d3d] rounded-md justify-center items-center"
          )}
        onPress={handleAddFriendSubmit}>
        <Text>Add Friend</Text>
      </Pressable>

      <View style={tw.style("flex-row justify-between items-center p-4")}>
        <Pressable
          onPress={handleBackButtonPress}
          style={tw.style(
            "flex flex-col p-2 bg-[#001d3d] rounded-md justify-center items-center"
          )}
        >
          <Text style={tw.style("text-white")}>Back</Text>
        </Pressable>
      </View>
      <View style={tw.style("flex-1 justify-center items-center")}>
        <Button title="Add Friend" onPress={handleShareButtonPress} />
      </View>
    </View>
  );
}
