import { View, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import React from 'react';

import { Card, Text} from 'react-native-paper';

export default function FriendCard( {friend} : {friend: {pfpSrc: string, username: string}}) {
      return (
            <View style={tw.style("text-white w-50 pr-2")}>
                  <TouchableOpacity
                  style={tw.style("text-white")}
                  activeOpacity={0.6}
                  // onPress={() => redirect to map }
                  >
                        <Card style={tw.style(`mt-2 p-4 bg-[#001D3D] p-[10] h-48 flex justify-between`)}>
                              <Card.Cover
                              style={tw.style(`h-30 bg-[#001D3D]`)}
                              source={{ uri: friend.pfpSrc }}
                              />
                              <Text style={tw.style("text-white text-left pt-2 truncate")}>{ friend.username }</Text>
                        </Card>
                  </TouchableOpacity>
            </View>
      );
}
