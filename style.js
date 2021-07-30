import { Platform, StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
  teamTile: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "ghostwhite",
    alignItems: "center",

    justifyContent: "center",
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
    minWidth: 200,
    minHeight: 400,

    borderWidth: 1,
    borderRadius: 2,
    borderStyle: "dashed",
  },
  headerTile: {
    flex: 1,
    borderWidth: 1,
  },
  footerTile: {
    borderWidth: 1,
    flex: 1,
  },
  listTile: {
    borderWidth: 1,
    flex: 6,
  },

  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "ghostwhite",
    alignItems: "center",
    justifyContent: "space-around",
    ...Platform.select({
      ios: { paddingTop: 20 },
      android: { paddingTop: StatusBar.currentHeight },
    }),
  },

  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    alignContent: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "black",
  },

  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "stretch",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "red",
  },
});
