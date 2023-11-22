import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import tw from "twrnc";

type ModalViewAlertsProps = {
        data: any;
        handleGoToMap: (latitude: string, longitude: string) => void; 
      };
      
const ModalViewAlerts = (props: ModalViewAlertsProps) => {
  return (
    <View>
      {props.data.map((a: any, index: number) => (
        <View
          key={index}
          style={tw.style(
            "flex flex-col bg-white rounded-md shadow-md p-2 m-2"
          )}
        >
          <View style={tw.style("flex flex-row p-2 m-2")}>
            <Image
              source={require("../../assets/mapIcons/Wildfire.png")}
              style={tw.style("w-10 h-10 mr-2 mt-1 self-center")}
            />
            <View style={tw.style("flex-1")}>
              <Text style={tw.style("font-bold text-sm mb-1")}>Fire</Text>
              <Text style={tw.style("text-sm")}>
                Location - {typeof a?.latitude}, {a?.longitude}
              </Text>
              <Text style={tw.style("text-sm")}>
                Severity - Calculated on backend
              </Text>
              <Text style={tw.style("text-sm")}>Time - {a?.acq_time}</Text>
              <Text style={tw.style("text-sm")}>Date - {a?.acq_date}</Text>
              <Text style={tw.style("text-sm")}>Radius - {a?.scan}</Text>
            </View>
          </View>
          <Pressable
            style={tw.style("bg-blue-500 p-2 rounded-md mt-2 self-center")}
            onPress={() => props.handleGoToMap(a.latitude, a.longitude)}
          >
            <Text style={tw.style("text-white text-sm")}>View on Map</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default ModalViewAlerts;
