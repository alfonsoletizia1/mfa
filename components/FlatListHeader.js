import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { statsFields } from "../util/utilClasses";
const FlatListHeader = (props) => {
  const { onPressField } = props;
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
      <View style={styles.role}>
        <TouchableOpacity onPress={() => onPressField(statsFields.role)}>
          <Text style={styles.title}>{"R"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.name}>
        <TouchableOpacity onPress={() => onPressField(statsFields.name)}>
          <Text style={styles.title}>{"Nome"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onPressField(statsFields.team)}>
          <Text style={styles.title}>{"Squadra"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.media}>
        <TouchableOpacity onPress={() => onPressField(statsFields.mv)}>
          <Text style={styles.title}>{"MV"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fmedia}>
        <TouchableOpacity onPress={() => onPressField(statsFields.mf)}>
          <Text style={styles.title}>{"FM"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pg}>
        <TouchableOpacity onPress={() => onPressField(statsFields.pg)}>
          <Text style={styles.title}>{"PG"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlatListHeader;

const styles = StyleSheet.create({
  pg: {
    borderLeftWidth: 1,
    paddingLeft: 10,
    marginLeft: 10,
    minWidth: 50,
  },
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
    // marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: 10,
    minWidth: 200,
    backgroundColor: "#00ffc8",
    borderColor: "#00c49a",
    borderWidth: 1.5,
    borderTopWidth: 0.0,
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
