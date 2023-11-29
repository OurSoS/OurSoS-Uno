import Pubnub from "pubnub";
import { useState, useEffect } from "react";
import {
  TextInput,
  Pressable,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import tw from "twrnc";
import React from "react";
import Footer from "./components/molecules/Footer";

const pubnub = new Pubnub({
  publishKey: "pub-c-3b2d833a-75f6-4161-91ea-e3a5752344eb",
  subscribeKey: "sub-c-7cec6aac-008e-4260-a63b-af4eb66b1272",
  userId: "myUniqueUserId",
});
import axios from "axios";
export default function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, onChangeText] = useState([]);

  useEffect(() => {
    const showMessage = (msg: string) => {
      setMessages((messages: string[]) => [...messages, msg]);
    };

    // add listener
    const listener = {
      // @ts-ignore
      status: (statusEvent) => {
        if (statusEvent.category === "PNConnectedCategory") {
          console.log("Connected");
        }
      },
      // @ts-ignore
      message: (messageEvent) => {
        showMessage(messageEvent.message.description);
      },
      // @ts-ignore
      presence: (presenceEvent) => {
        // handle presence
      },
    };
    pubnub.addListener(listener);
    // cleanup listener
    return () => {
      pubnub.removeListener(listener);
    };
  }, [pubnub, setMessages]);

  // publish message
  const publishMessage = async (message: string) => {
    // With the right payload, you can publish a message, add a reaction to a message,
    // send a push notification, or send a small payload called a signal.
    const publishPayload = {
      channel: "hello_world",
      message: {
        title: "message",
        description: message,
      },
    };

    await pubnub.publish(publishPayload).then(async () => {
      await axios
        .post("https://oursos-backend-production.up.railway.app/chat", {
          message: message,
        })
        .then(async (res) => {
          await pubnub.publish({
            channel: "hello_world",
            message: {
              title: "message",
              description: res.data.response,
            },
          });
        });
    });
  };

  useEffect(() => {
    pubnub.subscribe({
      channels: ["hello_world"],
    });
    return () => {
      pubnub.unsubscribe({
        channels: ["hello_world"],
      });
    };
  }, [pubnub]);

  return (
    <>
      <ImageBackground
        source={require("../assets/Intro/Map.png")}
        style={[tw.style("flex-1 justify-center"), { resizeMode: "cover" }]}
      >
        <View style={tw.style("flex-1")}>
          <View style={tw.style(`flex flex-col justify-between h-full`)}>
            <View>
              <Text
                style={tw.style(
                  `text-center text-2xl`,
                  `font-bold`,
                  `mt-2.5`,
                  `mb-2.5`
                )}
              >
                Chat Bot
              </Text>
              <ScrollView style={tw.style("pt-8 pl-4 pr-4")}>
                {messages.map((message, idx) => (
                  <View
                    key={idx}
                    style={tw.style(
                      "bg-white mb-2 py-2 px-4 rounded-md border border-gray-300"
                    )} // Adjusted for rounded and grey border
                  >
                    <Text>{message}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={tw.style("pb-12 pl-4 pr-4")}>
              {/* @ts-ignore */}

              <TextInput
                maxLength={30}
                style={tw.style(
                  "px-4",
                  "py-2",
                  "border",
                  "border-gray-300",
                  "rounded-md",
                  "text-lg",
                  "bg-white"
                )}
                onChangeText={onChangeText}
                value={text}
                placeholder="maximum 30 characters"
                placeholderTextColor="#4B5563"
              />
              {/* @ts-ignore */}
              <Pressable
                onPress={() => {
                  publishMessage(text);
                  onChangeText("");
                }}
                style={tw.style(
                  "w-full bg-[#001D3D] pt-4 pb-4 mt-4 rounded-lg"
                )}
              >
                <Text style={tw.style("text-xl text-white text-center")}>
                  Send
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
      <Footer />
    </>
  );
}
