import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { iconsConf } from "../util/utilClasses";
import { ASSIGN_TEAM_PLAYER } from "../store/stateSlicer";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PlayerTile = ({ item, index, disableAssign }) => {
  const { actualConfiguration, configurations } = useSelector((state) => state);

  // const teams = configurations[actualConfiguration].teams;
  const teamStatus = configurations[actualConfiguration].teamStatus;
  function notifyMessage(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else if (Platform.OS === "ios") {
      AlertIOS.alert(msg);
    } else {
      alert(msg);
    }
  }
  const dispatch = useDispatch();
  const handleAssign = (item) => {
    setshowModal(true);
    // setdisableAssignButton(true);
    // dispatch(
    //   ASSIGN_TEAM_PLAYER({
    //     ...item,
    //     value: 10,
    //     teamId: "id",
    //   })
    // );
    // setdisableAssignButton(false);
  };
  const handleAssignClick = (item, value, teamId) => {
    // setdisableAssignButton(true);
    //checkCanAssign
    dispatch(
      ASSIGN_TEAM_PLAYER({
        ...item,
        value: value,
        teamId: teamId,
      })
    );
    // onAssign(item.Id);
    notifyMessage("Assegnato!");
    setshowModal(false);
    // setdisableAssignButton(false);
  };
  const handleChangeValue = (value) => {
    setNumber(value);
  };
  const [expand, setExpand] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(
    Object.values(teamStatus)[0].id
  );
  const [number, onChangeNumber] = useState("1");

  // const [disableAssignButton, setdisableAssignButton] = useState(false);

  return (
    <View style={styles.externalContainer}>
      {/* <View> */}
      {showModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setshowModal(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  alignSelf: "flex-start",
                  margin: 5,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {" "}
                  {"Seleziona la squadra: "}{" "}
                </Text>
              </View>
              <Picker
                style={styles.picker}
                itemStyle={styles.itemStyle}
                mode={"dropdown"}
                selectedValue={selectedTeam}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedTeam(itemValue)
                }
              >
                {Object.keys(teamStatus).map((el) => {
                  return (
                    <Picker.Item
                      label={teamStatus[el].name}
                      value={el}
                      key={el}
                    />
                  );
                })}
              </Picker>

              <View
                style={{
                  alignSelf: "flex-start",
                  margin: 5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {" "}
                  {"Valore: "}{" "}
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeNumber}
                  value={number}
                  placeholder="1"
                  keyboardType="numeric"
                  required={true}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button onPress={() => setshowModal(false)} mode={"outlined"}>
                  {"Annulla"}{" "}
                </Button>
                <Button
                  onPress={() => handleAssignClick(item, number, selectedTeam)}
                  mode={"outlined"}
                >
                  {"OK"}
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {/* </View> */}
      <View>
        <TouchableOpacity
          style={styles.container}
          onPress={() => setExpand(!expand)}
        >
          <View style={styles.role}>
            {/* <Text>{item.R}</Text> */}
            <MaterialCommunityIcons
              name={iconsConf[item.R].name}
              size={24}
              color={iconsConf[item.R].color}
            />
          </View>
          <View style={styles.name}>
            <Text style={styles.title}>{item.Nome}</Text>
            <Text style={styles.subTitle}>{item.Squadra}</Text>
          </View>
          <View style={styles.media}>
            <Text style={styles.subTitle}>{item.Mv}</Text>
          </View>
          <View style={styles.media}>
            <Text style={styles.subTitle}>{item.Mf}</Text>
          </View>
          <View style={styles.media}>
            <Text style={styles.subTitle}>{item.Pg}</Text>
          </View>
          <View style={styles.pg}>
            <TouchableOpacity
              disabled={disableAssign}
              onPress={() => handleAssign(item)}
            >
              <Ionicons
                name="add-circle-outline"
                size={32}
                color={disableAssign ? "gray" : "blue"}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      {expand ? (
        <View>
          <View style={styles.details}>
            <View>
              {/* <Text>{"PG: " + item.Pg}</Text> */}
              <Text>{"GF: " + item.Gf}</Text>
              <Text>{"Gs: " + item.Gs}</Text>
              <Text>{"Ass: " + item.Ass}</Text>
            </View>
            <View>
              {/* <Text>{"Asf: " + item.Asf}</Text> */}
              <Text>{"Amm: " + item.Amm}</Text>
              <Text>{"Esp: " + item.Esp}</Text>
              <Text>{"Au: " + item.Au}</Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default PlayerTile;

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
    shadowOpacity: 0.45,
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
    //backgroundColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },
  details: {
    // flex: 1,
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
    // flex: 1,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",

    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    // minWidth: 200,
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
  title: {
    fontWeight: "bold",
    // fontFamily:
  },
});
