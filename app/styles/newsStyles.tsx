import { StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageList: {
    padding: 52,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    maxHeight: 500,
    overflow: "scroll",
    gap: 10,
    backgroundColor: "rgba(248, 248, 248,0.5)",
  },
  container: {
    margin: 20,
    fontFamily: "NotoSans_400Regular",
  },
  searchInput: {
    borderRadius: 62,
    backgroundColor: "white", // Use 'white' for #FFF
    // Dashboard/Card
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    elevation: 3, // This adds an elevation for shadow on Android
  },
  heading2: {
    marginTop: 40,
    marginBottom: 20,
    margin: 20,
    color: "#252525", // Use '#252525' for var(--Black, #252525)
    fontFamily: "NotoSans_400Regular",
    fontSize: 28,
    fontStyle: "normal",
    fontWeight: "500", // Use '500' for font-weight: 500
  },

  inputSearchIcon: {
    backgroundColor: "#FFC300",
  },
  disasterCardContainer: {
    flexDirection: "row",

    padding: 10,
    borderRadius: 10,
  },
  disasterOuterCard: {
    width: 200,
    height: 350,
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    elevation: 3,
    alignItems: "center",
    //   marginVertical: 10,
    marginRight: 10,


  },
  disasterInnerCard: {
    padding: 20,
  },
  disasterCardImage: {
    borderRadius: 15,
  },
  disasterCardHeader: {
    color: "#000",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    margin: 10,
  },
  disasterCardText: {
    color: "#000",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    //   margin: 10,
    //   padding: 10,
  },
  pin: {
    position: "relative", // Change to "relative" if you don't need absolute positioning
    flex: 1,
    flexDirection: "row",
  },
  pinImage: {
    width: '100%',
    height: 200,
    gap: 10,
    borderRadius: 15,
  },
  pinName: {
    color: "white", // Set text color to black
    fontSize: 24,
    position: "absolute", // Use "absolute" positioning
    bottom: 10, // Adjust the position as needed
    left: 10, // Adjust the position as needed
  },
  pinsHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    height: 1,
  },
  pinsContent: {
    flexDirection: "row",
    margin: 10,
    gap: 20
  },
  FriendsHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    height: 1,
  },
  FriendsContent: {
    flex: 1,
    flexDirection: "row",
  },
  FriendImage: {
    width: 100,
    height: 100,
    gap: 10,
    borderRadius: 50,
  },
  FriendName: {
    marginTop: 10,
  },
  friend: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    // textAlign: "center",
  }
});

export { styles };