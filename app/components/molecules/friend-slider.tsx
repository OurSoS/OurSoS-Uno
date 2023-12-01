import React from "react";
import { ScrollView } from "react-native";
import FriendCard from "./friend-card";

export type Friend = {
  pfpSrc: string;
  username: string;
  long: number;
  lat: number;
}

export default function FriendSlider({
  data,
}: {
  data: Friend[];
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={10}
      style={{ paddingVertical: 10 }}
      contentContainerStyle={{ justifyContent: "center" }}
    >
      {data.map((item, i) => {
        const displayData =
          data && data[i] ? data[i] : item;

        return (
          <FriendCard
            key={i}
            friend={item}
          />
        );
      })}
    </ScrollView>
  );
}
