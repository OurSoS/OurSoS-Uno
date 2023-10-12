import AtomIcon from "../atoms/icon";
import { StyleSheet, Text, View } from "react-native";

type IconTextProps = {
    icon: string,
    text: string,
    iconLocation: "left" | "right" | "top",

}

export default function IconTextBlock({ icon, text, iconLocation }: IconTextProps) {

    let containerStyle;

    if (iconLocation === "top") {
        containerStyle = styles.top;
    } else if (iconLocation === "left") {
        containerStyle = styles.left;
    } else if (iconLocation === "right") {
        containerStyle = styles.right;
    }
    return (
        <View style={[styles.iconContainer, containerStyle]}>
            <AtomIcon icon={icon} />
            <Text>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        display: "flex",
    },
    top: {
        flexDirection: "column",
    },
    left: {
        flexDirection: "row",
    },
    right: {
        flexDirection: "row-reverse",
    },
});
