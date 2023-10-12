import { StyleSheet, Text, View, TextStyle } from "react-native";
import { remToPixel } from "./remToPixel";

interface TextStylesProps {
    children: React.ReactNode;
    textStyle?: 'heading' | 'subheading' | 'body' | 'backButton';
}

const TextStyles: React.FC<TextStylesProps> = ({ children, textStyle }) => {
    const styles = getStylesForVariant(textStyle);

    return <Text style={styles}>{children}</Text>;
};

const getStylesForVariant = (textStyle?: 'heading' | 'subheading' | 'body' | 'backButton'): TextStyle => {
    switch (textStyle) {
        case 'heading':
            return styles.heading;
        case 'subheading':
            return styles.subheading;
        case 'body':
            return styles.body;
        case 'backButton':
            return styles.backButton;
        default:
            return styles.default;
    }
};

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        color: 'black',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    subheading: {
        fontSize: 18,
        color: 'black',
    },
    body: {
        fontSize: 14,
        color: 'black',
    },
    backButton: {
        fontSize: remToPixel(1),
        color: 'black',
    }
});

export default TextStyles;