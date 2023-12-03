import * as React from "react";
import { Button, Share, Pressable, View, Text } from "react-native";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import tw from "twrnc";
import { getDeviceId } from "./chat";

export default function AddFriend() {
  const [userId, setUserId] = React.useState<string>();

  const handleShareButtonPress = async () => {
    const url = `exp://10.0.0.17:8081/addfriend/${userId}`;
    await Share.share({
      message: url,
    });
  };

  const handleIncomingURL = async (event) => {
    const friendId = event.url.replace("exp://10.0.0.17:8081/addfriend/", "");

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
      Linking.removeEventListener("url", handleIncomingURL);
    };
  }, []);

  const handleBackButtonPress = () => {
    router.push("/settings");
  };

  return (
    <View style={tw.style("flex-1")}>
      <View style={tw.style("flex-row justify-between items-center p-4")}>
        <Pressable onPress={handleBackButtonPress} style={tw.style("p-2")}>
          <Text style={tw.style("text-lg")}>Back</Text>
        </Pressable>
      </View>
      <View style={tw.style("flex-1 justify-center items-center")}>
        <Button title="Add Friend" onPress={handleShareButtonPress} />
      </View>
    </View>
  );
}
