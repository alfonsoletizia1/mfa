import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { statsFields, switchOrderType } from "../util/utilClasses";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const HeaderList = (props) => {
  const [orderType, setOrderType] = useState("asc");
  const { onPressField, disableAll } = props;

  return (
    <View style={styles.externalContainer}>
      <View style={styles.container}>
        <View style={styles.role}>
          <TouchableOpacity
            disabled={disableAll}
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
            disabled={disableAll}
            onPress={() => {
              setOrderType(switchOrderType(orderType));
              onPressField(statsFields.name, orderType);
            }}
          >
            <Text style={styles.title}>{"Nome"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disableAll}
            onPress={() => {
              setOrderType(switchOrderType(orderType));
              onPressField(statsFields.team, orderType);
            }}
          >
            <Text style={styles.subTitle}>{"Squadra"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.media}>
          <TouchableOpacity
            disabled={disableAll}
            onPress={() => {
              setOrderType(switchOrderType(orderType));
              onPressField(statsFields.mv, orderType);
            }}
          >
            <Text style={styles.textButtons}>{"Mv"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.media}>
          <TouchableOpacity
            disabled={disableAll}
            onPress={() => {
              setOrderType(switchOrderType(orderType));
              onPressField(statsFields.mf, orderType);
            }}
          >
            <Text style={styles.textButtons}>{"Mf"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.media}>
          <TouchableOpacity
            disabled={disableAll}
            onPress={() => {
              setOrderType(switchOrderType(orderType));
              onPressField(statsFields.pg, orderType);
            }}
          >
            <Text style={styles.textButtons}>{"Pg"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pg}>
          <View style={{ opacity: 0 }}>
            <Ionicons name="add-circle-outline" size={32} color="blue" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderList;

export const styles = StyleSheet.create({
  addButton: {
    borderLeftWidth: 1,
    // paddingLeft: 10,
    // marginLeft: 10,
    minWidth: 50,
    justifyContent: "center",
  },
  pg: {
    // borderLeftWidth: 1,
    paddingRight: 5,
    marginRight: 5,
    // minWidth: 50,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  itemStyle: {
    fontSize: 15,
    height: 75,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  picker: {
    minWidth: 200,
    resizeMode: "stretch",
  },
  pickerContainer: {},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderRadius: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  assignButton: {
    alignItems: "center",
    backgroundColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    borderTopWidth: 1,
    alignItems: "center",
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    // backgroundColor: "#fff",
    flexDirection: "row",
    // borderRadius: 10,
    // borderWidth: 1,
    borderColor: "black",
    minWidth: 200,
    justifyContent: "space-around",
  },
  externalContainer: {
    backgroundColor: "#00ffc8",

    // flex: 1,
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    //   borderTopLeftRadius: 0,
    //   borderTopRightRadius: 0,
    //   // minWidth: 200,
    //   backgroundColor: "#00ffc8",
    borderColor: "#00c49a",
    borderWidth: 1.5,
    //   borderTopWidth: 0.0,
  },
  container: {
    flexWrap: "wrap",
    // flex: 1,
    flexDirection: "row",
    // marginTop: 10,
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    // backgroundColor: "#fff",
    flexDirection: "row",
    // borderRadius: 10,
    // borderWidth: 1,
    borderColor: "black",
    minWidth: 200,
  },
  media: {
    flex: 1,
    // borderRightWidth: 1,
    // paddingRight: 5,
    // marginRight: 10,
    justifyContent: "center",
    minWidth: 35,
    justifyContent: "center",
  },

  fmedia: {
    flex: 1,
    paddingRight: 5,

    marginRight: 10,
    minWidth: 50,
    justifyContent: "center",
  },

  role: {
    // flex: 1,
    justifyContent: "center",
    // borderRightWidth: 1,
    paddingRight: 5,
    marginRight: 10,
  },
  name: {
    flex: 3,
    // borderRightWidth: 1,
    paddingRight: 5,
    marginRight: 10,
    minWidth: 100,
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
  textButtons: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
  },
  title: {
    fontWeight: "bold",
    // fontFamily:
  },
});
