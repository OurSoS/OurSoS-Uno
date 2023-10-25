import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
        background: {
                flex: 1,
                resizeMode: "cover",
                justifyContent: "center",
        },
        container: {
                flex: 1,
                paddingTop: 20,
                width: "100%",
                padding: 20,
        },
        userContainer: {
                marginBottom: 20,
                alignItems: "center",
                height: 250,
        },
        userSpecificSettingContainer: {
                marginBottom: 20,
                height: 250,
        },
        scrollView: {
                marginBottom: 30,
        },
        settingItem: {
                padding: 10,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 10,
                margin: 10,
                minWidth: 300,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                backgroundColor: "white",
        },
        button: {
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
        },
        leftContent: {
                flex: 1,
        },
        rightContent: {
                marginLeft: 10,
        },
        profileImage: {
                display: "flex",
                marginTop: 10,
                height: 200,
                width: 200,
                borderRadius: 25,
        },
        profileUsername: {
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 10,
                marginBottom: 10,
        },
        topHeader: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 30,
                padding: 20,
        },
});