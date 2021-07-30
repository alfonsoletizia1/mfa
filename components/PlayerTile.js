import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const handlePress = (item) => {};
const PlayerTile = ({ item }) => {
  return (
    <TouchableOpacity onPress={handlePress()}>
      <View style={styles.container}>
        <View style={styles.role}>
          <Text>{item.R}</Text>
        </View>
        <View style={styles.name}>
          <Text style={styles.title}>{item.Nome}</Text>
          <Text style={styles.subTitle}>{item.Squadra}</Text>
        </View>
        <View style={styles.media}>
          {/* <Text style={styles.title}>{"MV"}</Text> */}
          <Text style={styles.subTitle}>{item.Mv}</Text>
        </View>
        <View style={styles.fmedia}>
          {/* <Text style={styles.title}>{"FM"}</Text> */}
          <Text style={styles.subTitle}>{item.Mf}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlayerTile;

const styles = StyleSheet.create({
  media: {
    flex: 1,
    borderRightWidth: 1,
    paddingRight: 5,
    marginRight: 10,
    minWidth: 50,
    justifyContent: "center",
  },

  fmedia: {
    flex: 1,
    marginRight: 0,
    minWidth: 50,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    minWidth: 200,
  },
  role: {
    flex: 1,
    justifyContent: "center",
    borderRightWidth: 1,
    paddingRight: 5,
    marginRight: 10,
  },
  name: {
    flex: 4,
    borderRightWidth: 1,
    paddingRight: 5,
    marginRight: 10,
    minWidth: 130,
  },

  listItem: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 20,
    minWidth: 200,
  },
  metaInfo: {
    marginLeft: 10,
  },
});
