import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";

export default function DisasterCard(disasterType:string, disasterTitle:string, disasterImage:string) {
  return (
    <View id="DisasterCard" style={styles.disasterCard}>
      <Image
        source={{ uri: disasterImage }} // Use the provided disasterImage prop
        style={[{ width: 160, height: 100 }, styles.disasterCardImage]}
      />
      <Text style={styles.disasterCardHeader}>{disasterType}</Text>
      <Text>{disasterTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  disasterCardHeader: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    margin: 10,
  },
  disasterCardText: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    margin: 10,
  },
  disasterCardImage: {
    margin: 10,
    borderRadius: 15,
  },
  disasterCard: {
    borderRadius: 15,
    height: 200,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    elevation: 3,
    alignItems: 'center',
    margin: 10,
  },
  disasterCardContainer: {
    flexDirection: 'row',
  },
});
