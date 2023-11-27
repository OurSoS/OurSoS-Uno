import React from "react";
import { View, Text, Image } from "react-native";
import tw from "twrnc";

type Alert = {
  type: string;
  latitude: number;
  longitude: number;
  geometry?: {
    coordinates: [number, number];
  };
  acq_time?: string;
  acq_date?: string;
  scan?: string;
  message?: string;
  radius?: string;
};

type ModalViewAlertsProps = {
  data: Alert[];
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
  type: string;
};

const ModalViewAlerts = React.memo((props: ModalViewAlertsProps) => {
  console.log(props.data)
  return (
    <View style={tw.style("pl-2 pr-18")}>
      {props.data.map((alert: Alert, index: number) => (
        <View
          key={index}
          style={tw.style(
            "flex flex-col bg-[#001D3D] rounded shadow-md p-2 m-1"
          )}
        >
          <View style={tw.style("flex flex-row p-2 m-2")}>
            <Image
              source={getAlertIcon(alert.type)}
              style={tw.style("w-10 h-10 mr-2 mt-1 self-center")}
            />

            <View style={tw.style("flex-1")}>
              <Text style={tw.style("font-bold text-sm mb-1 text-white")}>
                {alert.type}
              </Text>

              {alert.type === "Fire" ? (
                <Text style={tw.style("text-sm text-white")}>
                  Location - {alert.latitude}, {alert.longitude}
                </Text>
              ) : alert.type === "Earthquake" ? (
                <Text style={tw.style("text-sm text-white")}>
                  Location - {alert.geometry?.coordinates[1].toFixed(2)},{" "}
                  {alert.geometry?.coordinates[0].toFixed(2)}
                </Text>
              ) : alert.type === "Tsunami" ? (
                <Text style={tw.style("text-sm text-white")}>
                  Location - {alert.latitude}, {alert.longitude}
                </Text>
              ) : alert.type === "User Alert" ? (
                <Text style={tw.style("text-sm text-white")}>
                  Location - {alert.latitude}, {alert.longitude}
                </Text>
              ) : null}

              {alert.type === "Fire" ? (
                <>
                  <Text style={tw.style("text-sm text-white")}>Time - {alert.acq_time}</Text>
                  <Text style={tw.style("text-sm text-white")}>Date - {alert.acq_date}</Text>
                  <Text style={tw.style("text-sm text-white")}>Radius - {alert.scan}</Text>

                  {/* Add a View to represent the circle */}
                  {typeof alert.scan === "string" &&
                    !isNaN(parseFloat(alert.scan)) && (
                      <View
                        style={{
                          width: parseFloat(alert.scan) * 2,
                          height: parseFloat(alert.scan) * 2,
                          borderRadius: parseFloat(alert.scan),
                          backgroundColor: "orange",
                          borderColor: "red",
                          borderWidth: 5,
                          marginTop: 10,
                          alignSelf: "center",
                        }}
                      />
                    )}
                </>
              ) : null}

              {alert.type === "User Alert" ? (
                <>
                  <Text style={tw.style("text-sm text-white")}>
                    Message - {alert.message}
                  </Text>
                  {/* <Text style={tw.style("text-sm text-white")}>Time - {alert.time}</Text> */}
                  <Text style={tw.style("text-sm text-white")}>
                    Radius - {alert.radius}{" "}
                  </Text>
                  {/* Add a View to represent the circle */}
                  {/* <View
                    style={{
                      width: alert.radius * 2,
                      height: alert.radius * 2,
                      borderRadius: alert.radius,
                      backgroundColor: "orange",
                      borderColor: "red",
                      borderWidth: 5,
                      marginTop: 10,
                      alignSelf: "center",
                    }}
                  /> */}
                </>
              ) : null}
            </View>
          </View>
          {/* Pressable logic here */}
        </View>
      ))}
    </View>
  );
});

// Function to get the appropriate icon based on the alert type
const getAlertIcon = (type: string) => {
  switch (type) {
    case "Fire":
      return require("../../assets/mapIcons/Wildfire.png");
    case "Earthquake":
      return require("../../assets/mapIcons/Earthquake.png");
    case "Tsunami":
      return require("../../assets/mapIcons/Tsunami.png");
    case "User Alert":
      return require("../../assets/alert-categorys/Hazard.png"); // Adjust as needed
    default:
      return null;
  }
};

export default ModalViewAlerts;
