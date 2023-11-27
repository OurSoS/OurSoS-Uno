import Pubnub from 'pubnub';
import { useState, useEffect } from "react"
import { TextInput, Button, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import tw from 'twrnc';
import React from 'react';
const pubnub = new Pubnub({
      publishKey: "pub-c-3b2d833a-75f6-4161-91ea-e3a5752344eb",
      subscribeKey: "sub-c-7cec6aac-008e-4260-a63b-af4eb66b1272",
      userId: "myUniqueUserId"
});
import axios from "axios"
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
                              console.log("Connected")
                        }
                  },
                  // @ts-ignore
                  message: (messageEvent) => {
                        showMessage(messageEvent.message.description);
                  },
                  // @ts-ignore
                  presence: (presenceEvent) => {
                        // handle presence
                  }
            };
            pubnub.addListener(listener);
            // cleanup listener
            return () => {
                  pubnub.removeListener(listener)
            }
      }, [pubnub, setMessages]);

      // publish message
      const publishMessage = async (message: string) => {
            // With the right payload, you can publish a message, add a reaction to a message,
            // send a push notification, or send a small payload called a signal.
            const publishPayload = {
                  channel: "hello_world",
                  message: {
                        title: "message",
                        description: message
                  }
            };

            await pubnub.publish(publishPayload).then(async () => {
                  await axios.post("https://oursos-backend-production.up.railway.app/chat", { "message": message }).then(async (res) => {

                        await pubnub.publish({
                              channel: "hello_world",
                              message: {
                                    title: "message",
                                    description: res.data.response
                              }

                        })
                  })
            });
      }

      useEffect(() => {
            pubnub.subscribe({
                  channels: ["hello_world"]
            });
            return () => {
                  pubnub.unsubscribe({
                        channels: ["hello_world"]
                  });
            }
      }, [pubnub]);

      return (
            <ScrollView style={tw.style("h-full flex")}>
                  {messages.map((message, idx) => <Text key={idx}>{message}</Text>)}
                  {/* @ts-ignore */}
                  <TextInput
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="message"
                  />
                  {/* @ts-ignore */}
                  <Button onPress={() => { publishMessage(text); onChangeText("") }} title="send" />
            </ScrollView >
      );
}