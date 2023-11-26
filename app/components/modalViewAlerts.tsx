import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import tw from "twrnc";

type ModalViewAlertsProps = {
  data: any;
  type: "Fire" | "Earthquake" | "Tsunami" | "User Alert";
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
    <View style={tw.style("pl-2 pr-18")}>
      {props.data.map((a: any, index: number) => (
        <View
          key={index}
          style={tw.style(
            "flex flex-col bg-[#001D3D] rounded shadow-md p-2 m-1"
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
            ) : props.type === "User Alert" ? (
              <Image
                source={a.type === "Hazard" ? require("../../assets/alert-categorys/Hazard.png") :
                        a.type === "Fire" ? require("../../assets/alert-categorys/Fire.png") :
                        a.type === "Police" ? require("../../assets/alert-categorys/Police.png") : null}
                style={tw.style("w-10 h-10 mr-2 mt-1 self-center")}
              />
            ) : null}

            <View style={tw.style("flex-1")}>
              <Text style={tw.style("font-bold text-sm mb-1 text-white")}>
                {props.type}
              </Text>

              {props.type === "Fire" ? (
                <Text style={tw.style("text-sm text-white")}>
                  Location - {a?.latitude}, {a?.longitude}
                </Text>
              ) : props.type === "Earthquake" ? (
                <Text style={tw.style("text-sm text-white")}>
                  Location - {a?.geometry.coordinates[1].toFixed(2)},{" "}
                  {a?.geometry.coordinates[0].toFixed(2)}
                </Text>
              ) : props.type === "Tsunami" ? (
                <Text style={tw.style("text-sm text-white")}>
                  Location - {a?.latitude}, {a?.longitude}
                </Text>
              ) : props.type === "User Alert" ? (
                <Text style={tw.style("text-sm text-white")}>
                  Location - {a?.latitude}, {a?.longitude}
                </Text>
              ) : null}

              {/* <Text style={tw.style("text-sm text-white")}>
                Severity - Calculated on backend
              </Text> */}
              {props.type === "Fire" ? (
                <>
                  <Text style={tw.style("text-sm text-white")}>Time - {a?.acq_time}</Text>
                  <Text style={tw.style("text-sm text-white")}>Date - {a?.acq_date}</Text>
                  <Text style={tw.style("text-sm text-white")}>Radius - {a?.scan}</Text>

                  {/* Add a View to represent the circle */}
                  {typeof a?.scan === "string" &&
                    !isNaN(parseFloat(a?.scan)) && (
                      <View
                        style={{
                          width: parseFloat(a?.scan) * 2, // Diameter of the circle
                          height: parseFloat(a?.scan) * 2,
                          borderRadius: parseFloat(a?.scan), // Set borderRadius to half of the width/height to make it a circle
                          backgroundColor: "orange", // Change the color as needed
                          borderColor: "red",
                          borderWidth: 5,
                          marginTop: 10, // Adjust the margin as needed
                          alignSelf: "center", // Center horizontally
                        }}
                      />
                    )}
                </>
              ) : null}

              {props.type === "User Alert" ? (
                <>
                  <Text style={tw.style("text-sm text-white")}>
                    Message - {a?.message}
                  </Text>
                  {/* <Text style={tw.style("text-sm text-white")}>Time - {a?.time}</Text> */}
                  <Text style={tw.style("text-sm text-white")}>
                    Radius - {a?.radius}{" "}
                  </Text>
                  {/* Add a View to represent the circle */}
                  {/* <View
                    style={{
                      width: a?.radius * 2, // Diameter of the circle
                      height: a?.radius * 2,
                      borderRadius: a?.radius, // Set borderRadius to half of the width/height to make it a circle
                      backgroundColor: "orange", // Change the color as needed
                      borderColor: "red",
                      borderWidth: 5,
                      marginTop: 10, // Adjust the margin as needed
                      alignSelf: "center", // Center horizontally
                    }}
                  /> */}
                </>
              ) : null}
            </View>
          </View>
          {/* <Pressable
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
          </Pressable> */}
        </View>
      ))}
    </View>
  );
});

export default ModalViewAlerts;
