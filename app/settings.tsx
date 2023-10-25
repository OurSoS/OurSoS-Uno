import React, { useState } from "react";
import {
        Text,
        View,
        ScrollView,
        StyleSheet,
        ImageBackground,
        TouchableOpacity,
        Image,
        Pressable,
} from "react-native";
import { Link } from "expo-router";
import Footer from "./components/molecules/Footer";
import { styles } from "./styles/settingsStyles";

// import Toggle from "react-native-toggle-element";
// // https://github.com/mymai91/react-native-toggle-element

// import Toggle from "react-native-toggle-input";

const settingsArray = [
        "Notifications",
        "Manage Friends",
        "Languages",
        "Locations",
        "Accessibility",
];

export default function Settings() {
        const [page, setPage] = React.useState("SettingsHome");
        const [showFriendOnMap, setShowFriendOnMap] = useState(false);
        const [notification, setNotification] = useState(false);

        return (
                <>
                        <ImageBackground
                                source={require("../assets/Intro/Map.png")}
                                style={styles.background}
                        >
                                <View style={styles.container}>
                                        {page === "SettingsHome" && <SettingsHomeHeader />}
                                        {page !== "SettingsHome" && (
                                                <SpecificSettingHeader pageTitle={page} setPage={setPage} />
                                        )}

                                        {/* {page === "ManageFriends" && <ManageFriendsButton showFriendOnMap={showFriendOnMap} setShowFriendOnMap={setShowFriendOnMap(showFriendOnMap)}/> } */}

                                        {page === "SettingsHome" && <SettingsBody setPage={setPage} />}
                                        {page === "Notifications" && (
                                                <ButtonMapping
                                                        settings={[
                                                                "Show Notifications",
                                                                "Allow Sound",
                                                                "Allow Vibration",
                                                                "Notification Priority",
                                                        ]}
                                                />
                                        )}

                                        {/* TODO: this toggle button has some ts error, will fix later on  */}
                                        {/* <Toggle toggle={notification} setToggle={setNotification} /> */}

                                        {page === "Manage Friends" && (
                                                <View style={{ padding: 10, display: "flex" }}>
                                                        <Text style={{ fontSize: 26, borderBottomWidth: 3 }}>
                                                                Friends
                                                        </Text>
                                                        <ScrollView
                                                                style={{
                                                                        paddingHorizontal: 20,
                                                                        backgroundColor: "white",
                                                                        marginTop: 10,
                                                                        borderRadius: 10,
                                                                }}
                                                        >
                                                                <Friend name={"Judith"} />
                                                                <Friend name={"Eric"} />
                                                                <Friend name={"Sam"} />
                                                                <TouchableOpacity>
                                                                        <Text
                                                                                style={{ fontSize: 20, textAlign: "center", padding: 20 }}
                                                                        >
                                                                                Add Friend
                                                                        </Text>
                                                                </TouchableOpacity>
                                                        </ScrollView>
                                                </View>
                                        )}

                                        {page === "Locations" && (
                                                <View style={{ padding: 10, display: "flex" }}>
                                                        <Text style={{ fontSize: 26, borderBottomWidth: 3 }}>
                                                                Manage Pins
                                                        </Text>
                                                        <ScrollView
                                                                style={{
                                                                        paddingHorizontal: 20,
                                                                        backgroundColor: "white",
                                                                        marginTop: 10,
                                                                        borderRadius: 10,
                                                                }}
                                                        >
                                                                <Pin name={"Vancouver"} />
                                                                <Pin name={"Kelowna"} />
                                                                <Pin name={"Tokyo"} />
                                                                <TouchableOpacity>
                                                                        <Text
                                                                                style={{ fontSize: 20, textAlign: "center", padding: 20 }}
                                                                        >
                                                                                Add Pins
                                                                        </Text>
                                                                </TouchableOpacity>
                                                        </ScrollView>
                                                </View>
                                        )}
                                        {page === "Accessibility" && (
                                                <ButtonMapping
                                                        settings={[
                                                                "Enable Dark Mode",
                                                                "Text to Speech",
                                                                "Font Size"
                                                        ]}
                                                />
                                        )}
                                </View>
                        </ImageBackground>
                        <Footer />
                </>
        );
}

function SettingsHomeHeader() {
        return (
                <>
                        <View style={styles.userContainer}>
                                {/* <Image
                                        style={styles.profileImage}
                                        source={require("../assets/userimageskeleton.png")}
                                /> */}
                                <Text style={styles.profileUsername}>My Username</Text>
                        </View>
                </>
        );
}

interface SettingsBodyProps {
        setPage: React.Dispatch<React.SetStateAction<string>>;
}

function SettingsBody({ setPage }: SettingsBodyProps) {
        return (
                <>
                        <ScrollView style={styles.scrollView}>
                                {settingsArray.map((setting, i) => {
                                        return (
                                                <View style={styles.settingItem} key={i}>
                                                        <Pressable onPress={() => setPage(setting + "")}>
                                                                <TouchableOpacity
                                                                        onPress={() => setPage(setting + "")}
                                                                        style={styles.button}
                                                                >
                                                                        <View style={styles.leftContent}>
                                                                                <Text>{setting}</Text>
                                                                        </View>
                                                                </TouchableOpacity>
                                                        </Pressable>
                                                </View>
                                        );
                                })}
                        </ScrollView>
                </>
        );
}

interface ButtonMappingProps {
        settings: string[];
}

function ButtonMapping({ settings }: ButtonMappingProps) {
        return (
                <ScrollView style={styles.scrollView}>
                        {settings.map((setting, i) => {
                                return (
                                        <View style={styles.settingItem} key={i}>
                                                <TouchableOpacity style={styles.button}>
                                                        <View style={styles.leftContent}>
                                                                <Text>{setting}</Text>
                                                        </View>
                                                </TouchableOpacity>
                                        </View>
                                );
                        })}
                </ScrollView>
        );
}

interface SpecificSettingHeaderProps {
        pageTitle: string;
        setPage: React.Dispatch<React.SetStateAction<string>>;
}

function SpecificSettingHeader({
        pageTitle,
        setPage,
}: SpecificSettingHeaderProps) {
        return (
                <>
                        <View style={styles.userSpecificSettingContainer}>
                                <View style={styles.topHeader}>
                                        <Text>
                                                <TouchableOpacity onPress={() => setPage("SettingsHome")}>
                                                        <Text>Go Back</Text>
                                                </TouchableOpacity>
                                        </Text>
                                        <Text style={{ fontSize: 36 }}>{pageTitle}</Text>
                                </View>
                        </View>
                </>
        );
}

type FriendProps = {
        name: string;
};
function Friend({ name }: FriendProps) {
        return (
                <View
                        style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                borderBottomWidth: 2,
                                padding: 15,
                        }}
                >
                        <Text style={{ fontSize: 20 }}>{name}</Text>
                        <TouchableOpacity>
                                <Text style={{ fontSize: 20, color: "orange" }}>Edit</Text>
                        </TouchableOpacity>
                </View>
        );
}

type PinProps = {
        name: string;
};
function Pin({ name }: PinProps) {
        return (
                <View
                        style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                borderBottomWidth: 2,
                                paddingVertical: 15,
                        }}
                ><View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                {/* <Image source={require("../assets/PinIcon.png")} style={{ width: 20, height: 20, marginRight: 10 }} /> */}
                                <Text style={{ fontSize: 20 }}>{name}</Text>
                        </View>
                        <TouchableOpacity>
                                <Text style={{ fontSize: 20, color: "orange" }}>Edit</Text>
                        </TouchableOpacity>
                </View>
        );
}