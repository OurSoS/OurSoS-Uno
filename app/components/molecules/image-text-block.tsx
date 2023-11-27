import { View, Image, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import tw from 'twrnc';
import React from 'react';


export default function ImageText({ style, imageUrl, text }: { style: string, imageUrl: string, text: string }) {
      return (
            <View style={tw.style(`h-full`, `w-full`, `mr-[1rem]`)}>
                  {
                        style == 'rounded'
                              ? <View style={tw.style(`flex`, `flex-col`, `h-full`, `w-full`, `items-center`, `justify-end`)}>
                                    <Image
                                          style={tw.style(`rounded-lg`, `h-full`, `w-full`, `absolute`, `flex`, `top-0`, `z-0`)}
                                          source={{ uri: imageUrl }}
                                    ></Image>
                                    <Text
                                          style={tw.style(`text-white`, `z-10`, `text-3xl`, `flex`, `p-4`, `bottom-0`)}
                                    >{text}</Text>
                              </View>
                              : <View id="Friend" style={styles.friend}>
                                    <Image source={{ uri: imageUrl }} style={styles.FriendImage} />
                                    <Text style={styles.FriendName}>{text}</Text>
                              </View>
                  }
            </View>
      )
}
const styles = StyleSheet.create({
      FriendsHeader: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 10,
            height: 1,
      },
      FriendsContent: {
            flex: 1,
            flexDirection: "row",
      },
      FriendImage: {
            width: 100,
            height: 100,
            gap: 10,
            borderRadius: 50,
      },
      FriendName: {
            marginTop: 10,
      },
      friend: {
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            // textAlign: "center",
      },
})