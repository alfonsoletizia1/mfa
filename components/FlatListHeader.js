import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { statsFields, switchOrderType } from "../util/utilClasses";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

const FlatListHeader = (props) => {
  const [orderType, setOrderType] = useState("asc");
  const { onPressField } = props;
  return (
    <View style={styles.externalContainer}>
      <View style={styles.container}>
        <View style={styles.role}>
          <TouchableOpacity
            onPress={() => onPressField(statsFields.role, orderType)}
          >
            {/* <Text style={styles.title}>{"R"}</Text> */}
            <MaterialCommunityIcons
              name="alpha-r-circle-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.name}>
          <TouchableOpacity
            onPress={() => {
              setOrderType(switchOrderType(orderType));
              onPressField(statsFields.name, orderType);
            }}
          >
            <Text style={styles.title}>{"Nome"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setOrderType(switchOrderType(orderType));
              onPressField(statsFields.team, orderType);
            }}
          >
            <Text style={styles.title}>{"Squadra"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.media}>
          <TouchableOpacity
            onPress={() => {
              setOrderType(switchOrderType(orderType));
              onPressField(statsFields.mv, orderType);
            }}
          >
            <Text style={styles.title}>{"MV"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.media}>
          <TouchableOpacity
            onPress={() => {
              setOrderType(switchOrderType(orderType));
              onPressField(statsFields.mf, orderType);
            }}
          >
            <Text style={styles.title}>{"FM"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.media}>
          <TouchableOpacity
            onPress={() => {
              setOrderType(switchOrderType(orderType));
              onPressField(statsFields.pg, orderType);
            }}
          >
            <Text style={styles.title}>{"PG"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pg}></View>
      </View>
    </View>
  );
};

export default FlatListHeader;

const styles = StyleSheet.create({
  externalContainer: {
    flex: 1,
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#00ffc8",
    justifyContent: "center",

    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    // minWidth: 200,
  },
  pg: {
    // borderLeftWidth: 1,
    paddingRight: 5,
    marginRight: 5,
    // minWidth: 50,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  media: {
    flex: 1,
    // borderRightWidth: 1,
    // paddingRight: 5,
    // marginRight: 10,
    justifyContent: "center",
    minWidth: 35,
  },
  // media: {
  //   flex: 1,
  //   borderRightWidth: 1,
  //   paddingRight: 5,
  //   marginRight: 10,
  //   minWidth: 50,
  // },

  fmedia: {
    flex: 1,
    marginRight: 0,
    minWidth: 50,
  },
  container: {
    flex: 1,
    flexDirection: "row",

    // borderWidth: 1,
    // borderColor: "green",

    borderColor: "#00c49a",
  },
  // container: {
  //   flexDirection: "row",
  //   // marginTop: 10,
  //   paddingVertical: 10,
  //   paddingHorizontal: 10,
  //   backgroundColor: "#fff",
  //   flexDirection: "row",
  //   borderTopLeftRadius: 0,
  //   borderTopRightRadius: 0,
  //   borderRadius: 10,
  //   // minWidth: 200,
  //   backgroundColor: "#00ffc8",
  //   borderColor: "#00c49a",
  //   borderWidth: 1.5,
  //   borderTopWidth: 0.0,
  // },
  role: {
    // flex: 1,
    // justifyContent: "center",
    // borderRightWidth: 1,
    // paddingRight: 5,
    // marginRight: 10,
  },
  name: {
    flex: 3,
    // borderRightWidth: 1,
    paddingRight: 5,
    marginRight: 10,
    minWidth: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  // name: {
  //   flex: 4,
  //   borderRightWidth: 1,
  //   paddingRight: 5,
  //   marginRight: 10,
  //   minWidth: 130,
  //   flexDirection: "row",
  //   justifyContent: "space-evenly",
  // },

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
