import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import tw from "twrnc";

type ModalViewAlertsProps = {
  data: any;
  type: "Fire" | "Earthquake" | "Tsunami";
  setJumpToLocation: React.Dispatch<
    React.SetStateAction<{
      longitude: number;
      latitude: number;
    }>
  >;
  jumpToLocation: {
    longitude: number;
    latitude: number;
  };
};

const ModalViewAlerts = React.memo((props: ModalViewAlertsProps) => {
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
            {props.type === "Fire" ? (
              <Image
                source={require("../../assets/mapIcons/Wildfire.png")}
                style={tw.style("w-10 h-10 mr-2 mt-1 self-center")}
              />
            ) : props.type === "Earthquake" ? (
              <Image
                source={require("../../assets/mapIcons/Earthquake.png")}
                style={tw.style("w-10 h-10 mr-2 mt-1 self-center")}
              />
            ) : props.type === "Tsunami" ? (
              <Image
                source={require("../../assets/mapIcons/Tsunami.png")}
                style={tw.style("w-10 h-10 mr-2 mt-1 self-center")}
              />
            ) : null}

            <View style={tw.style("flex-1")}>
              <Text style={tw.style("font-bold text-sm mb-1")}>
                {props.type}
              </Text>

              {props.type === "Fire" ? (
                <Text style={tw.style("text-sm")}>
                  Location - {a?.latitude}, {a?.longitude}
                </Text>
              ) : props.type === "Earthquake" ? (
                <Text style={tw.style("text-sm")}>
                  Location - {a?.geometry.coordinates[1].toFixed(2)},{" "}
                  {a?.geometry.coordinates[0].toFixed(2)}
                </Text>
              ) : props.type === "Tsunami" ? (
                <Text style={tw.style("text-sm")}>
                  Location - {a?.latitude}, {a?.longitude}
                </Text>
              ) : null}

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
            onPress={() => {
              props.setJumpToLocation((prevLocation) => ({
                ...prevLocation,
                longitude: a.longitude,
                latitude: a.latitude,
            }));
            console.log(a.latitude, a.longitude);
            console.log(props.jumpToLocation);
            }}
          >
            <Text style={tw.style("text-white text-sm")}>View on Map</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
});

export default ModalViewAlerts;
