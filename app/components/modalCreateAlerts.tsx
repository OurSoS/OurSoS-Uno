import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { Slider } from "react-native-awesome-slider";
import { MapType } from "react-native-maps";
import { useSharedValue } from "react-native-reanimated";
import tw from "twrnc";

type modalCreateAlertsProps = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  setGenMarkers: (
    desc: string,
    severity: number,
    type: string,
    date: string,
    confirmed?: boolean
  ) => void;
  setMapType: React.Dispatch<React.SetStateAction<MapType>>;
  updateMap: React.Dispatch<React.SetStateAction<boolean>>;
  myLocation: any;
};

const ModalCreateAlerts = React.memo((props: modalCreateAlertsProps) => {
  const [view, setView] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState(1);

  const progress = useSharedValue(1);
  const min = useSharedValue(1);
  const max = useSharedValue(2);

  const categories = ["Hazard", "Fire", "Police"];

  const getCircleColor = (severity: number) => {
    switch (severity) {
      case 1:
        return "yellow"; // Adjust this color based on your design
      case 2:
        return "red"; // Adjust this color based on your design
      default:
        return "gray";
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setView(2);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleSeverityChange = (value: number) => {
    setSeverity(value);
  };

  const handleEdit = () => {
    setView(1);
  };

  const handleSubmit = () => {
    // FOR TESTING - Starts here
    // alert("Report Submitted!");
    // props.setter(false);
    // props.setGenMarkers(description, severity, selectedCategory, new Date().toISOString());
    // props.setMapType("satellite");
    // props.updateMap((prev) => !prev);
    // FOR TESTING - Ends here

    // FOR REAL|BACKEND - Starts here
    if (props.myLocation) {
      alert("Drag the marker to the alert location.\nPress OK to proceed.");

      props.setter(false);

      props.setGenMarkers(
        description,
        severity,
        selectedCategory,
        new Date().toISOString(),
        false
      );

      props.setMapType("satellite");

      props.updateMap((prev) => !prev);
    } else {
      alert("Please enable location services and try again");
    }
    // FOR REAL|BACKEND - Ends here
  };

  return (
    <ScrollView style={tw.style("pl-2 pr-18")}>
      {view === 1 && (
        <View style={tw.style("flex h-full flex-grow justify-center")}>
          <Text> Page 1/3</Text>
          <Text style={tw.style("text-3xl text-center")}>
            What did you see?
          </Text>
          <View
            style={tw.style("flex flex-grow justify-center items-center gap-6")}
          >
            {categories.map((category) => (
              <Pressable
                key={category}
                onPress={() => handleSelectCategory(category)}
              >
                {category === "Hazard" && (
                  <>
                    <Text style={tw.style("text-center text-xl")}>
                      {category}
                    </Text>

                    <Image
                      source={require("../../assets/alert-categorys/Hazard.png")}
                      style={tw.style("h-20 w-20")}
                    />
                  </>
                )}
                {category === "Fire" && (
                  <>
                    <Text style={tw.style("text-center text-xl")}>
                      {category}
                    </Text>
                    <Image
                      source={require("../../assets/alert-categorys/Fire.png")}
                      style={tw.style("h-20 w-20")}
                    />
                  </>
                )}
                {category === "Police" && (
                  <>
                    <Text style={tw.style("text-center text-xl")}>
                      {category}
                    </Text>
                    <Image
                      source={require("../../assets/alert-categorys/Police.png")}
                      style={tw.style("h-20 w-20")}
                    />
                  </>
                )}
              </Pressable>
              //       <Pressable
              //         key={category}
              //         title={category}
              //         onPress={() => handleSelectCategory(category)}
              //       />
            ))}
          </View>
          {/* Severity Scale Slider */}
          <View style={tw.style("p-2")}>
            <Text
              style={
                severity === 1
                  ? tw.style("text-2xl text-center text-yellow-500")
                  : severity === 2
                  ? tw.style("text-2xl text-center text-red-500")
                  : null
              }
            >
              How Severe? ({severity})
            </Text>
            <Slider
              style={tw.style("justify-center h-20")}
              progress={progress}
              minimumValue={min}
              maximumValue={max}
              step={1}
              onValueChange={handleSeverityChange}
            />
          </View>
        </View>
      )}

      {view === 2 && (
        <View style={tw.style("flex h-full flex-grow justify-center")}>
          <Text style={tw.style("text-2xl")}> Page 2/3</Text>
          <Text>Characters used {description.length}/30</Text>
          <TextInput
            placeholder="What happened?"
            value={description}
            onChangeText={handleDescriptionChange}
            style={tw.style("border-2 border-black h-50 rounded-md p-2")}
            maxLength={30}
            textAlign="left"
            textAlignVertical="top"
            textBreakStrategy="highQuality"
            multiline={true}
          />
          <Pressable
            style={tw.style(
              "w-full bg-[#001D3D] pt-4 pb-4 mt-4 rounded-lg text-white"
            )}
            onPress={() => setView(3)}
          >
            <Text style={tw.style("text-xl text-white text-center")}>Next</Text>
          </Pressable>
        </View>
      )}

      {view === 3 && (
        <View style={tw.style("flex h-full flex-grow justify-center")}>
          <Text style={tw.style("text-2xl")}> Page 3/3</Text>
          <Text style={tw.style("text-2xl")}>
            Selected Category: {selectedCategory}
          </Text>
          <Text style={tw.style("text-2xl")}>Description: {description}</Text>
          <Text style={tw.style("text-2xl")}>Severity: {severity}</Text>
          <Pressable
            style={tw.style(
              "w-full bg-[#001D3D] pt-4 pb-4 mt-4 rounded-lg text-white"
            )}
            onPress={handleEdit}
          >
            <Text style={tw.style("text-xl text-white text-center")}>Edit</Text>
          </Pressable>
          <Pressable
            style={tw.style(
              "w-full bg-[#001D3D] pt-4 pb-4 mt-4 rounded-lg text-white"
            )}
            onPress={handleSubmit}
          >
            <Text style={tw.style("text-xl text-white text-center")}>
              Report
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
});

export default ModalCreateAlerts;
