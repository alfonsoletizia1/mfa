import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FlatListHeader = () => {
  return (
    // <TouchableOpacity>
    //   <View style={styles.listItem}>
    //     <View style={styles.metaInfo}>
    //       <Text style={styles.title}>{item.Nome}</Text>
    //       <Text style={styles.subTitle}>{item.Squadra}</Text>
    //     </View>
    //   </View>
    // </TouchableOpacity>
    <View style={styles.container}>
      <View style={styles.role}></View>
      <View style={styles.name}>
        <Text style={styles.title}>{"Nome"}</Text>
        <Text style={styles.title}>{"Squadra"}</Text>
      </View>
      <View style={styles.media}>
        <Text style={styles.title}>{"MV"}</Text>
      </View>
      <View style={styles.fmedia}>
        <Text style={styles.title}>{"FM"}</Text>
      </View>
    </View>
  );
};

export default FlatListHeader;

const styles = StyleSheet.create({
  media: {
    flex: 1,
    borderRightWidth: 1,
    paddingRight: 5,
    marginRight: 10,
    minWidth: 50,
  },

  fmedia: {
    flex: 1,
    marginRight: 0,
    minWidth: 50,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 20,
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
    flexDirection: "row",
    justifyContent: "space-evenly",
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
