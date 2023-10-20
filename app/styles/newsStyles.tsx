import { StyleSheet, ScrollView } from "react-native";

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "white", 
    padding: 10,
    marginBottom: 0,
    marginHorizontal: 10,
    elevation: 3, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginRight: 10,
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
    width: "auto",
    height: "auto",
    backgroundColor: "white",
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    margin: 20,

    alignItems: "center",
  },
  disasterInnerCard: {
    padding: 20,
  },
  disasterCardImage: {
    borderRadius: 15,
    // height:100,
    width: "auto",
    height: 160,
    objectFit: "cover",
  },
  disasterCardHeader: {
    color: "#000",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    margin: 10,
    width: 250,
  },
  disasterCardText: {
    color: "#000",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    width: 250,
    //   margin: 10,
    //   padding: 10,
  },
  pin: {
    position: "relative", // Change to "relative" if you don't need absolute positioning
    flex: 1,
    flexDirection: "row",    
  },
  pinImage: {
    width: "100%",
    height: 200,
    gap: 10,
    borderRadius: 15,
  },
  pinName: {
    color: "white", // Set text color to black
    fontSize: 24,
    position: "absolute",
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
    gap: 20,
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
  },
});

export { styles };
