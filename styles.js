import { Platform, StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    // borderWidth: 3,
    // borderColor: "red",
  },
  lists: {
    // flexDirection: "column",
    // flexWrap: "wrap",
    // borderWidth: 3,
    // borderColor: "blue",
  },
  header: {
    flex: 1,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "green",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    alignContent: "center",
    minHeight: 200,
  },
  footer: {
    flex: 1,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "yellow",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    alignContent: "center",
    minHeight: 200,
  },
  list: {
    flex: 6,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    alignContent: "center",
    flexGrow: 0,
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
    // borderWidth: 1,
    borderStyle: "dashed",
    // borderColor: "red",
    minWidth: 200,
    minHeight: 400,
  },
});
