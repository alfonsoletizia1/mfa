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
import { conf } from "../util/utilClasses";
import { ASSIGN_TEAM_PLAYER } from "../store/stateSlicer";

const PlayerTile = ({ item }) => {
  function notifyMessage(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  }
  const dispatch = useDispatch();
  const handleAssign = (item) => {
    console.log("PRESSED");
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
    notifyMessage("Assegnato!");
    setshowModal(false);
    // setdisableAssignButton(false);
  };
  const handleChangeValue = (value) => {
    setNumber(value);
  };
  const [expand, setExpand] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(conf.partecipants[0].id);
  const [number, onChangeNumber] = useState(null);

  const [disableAssignButton, setdisableAssignButton] = useState(false);

  return (
    <View style={styles.externalContainer}>
      <View style={styles.centeredView}>
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
              <Picker
                style={styles.picker}
                itemStyle={styles.itemStyle}
                mode={"dropdown"}
                selectedValue={selectedTeam}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedTeam(itemValue)
                }
              >
                {conf.partecipants.map((el) => {
                  return (
                    <Picker.Item label={el.name} value={el.id} key={el.id} />
                  );
                })}
              </Picker>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="useless placeholder"
                keyboardType="numeric"
              />
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
      </View>
      <View>
        <TouchableOpacity
          style={styles.container}
          onPress={() => setExpand(!expand)}
        >
          <View style={styles.role}>
            <Text>{item.R}</Text>
          </View>
          <View style={styles.name}>
            <Text style={styles.title}>{item.Nome}</Text>
            <Text style={styles.subTitle}>{item.Squadra}</Text>
          </View>
          <View style={styles.media}>
            <Text style={styles.subTitle}>{item.Mv}</Text>
          </View>
          <View style={styles.fmedia}>
            <Text style={styles.subTitle}>{item.Mf}</Text>
          </View>
          <View style={styles.pg}>
            <Text style={styles.subTitle}>{item.Pg}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {expand ? (
        <View>
          <View style={styles.details}>
            <View>
              <Text>{"PG: " + item.Pg}</Text>
              <Text>{"GF: " + item.Gf}</Text>
              <Text>{"Gs: " + item.Gs}</Text>
              <Text>{"Ass: " + item.Ass}</Text>
            </View>
            <View>
              <Text>{"Asf: " + item.Asf}</Text>
              <Text>{"Amm: " + item.Amm}</Text>
              <Text>{"Esp: " + item.Esp}</Text>
              <Text>{"Au: " + item.Au}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => handleAssign(item)}
              disabled={disableAssignButton}
              // title={"Assegna"}
              style={styles.assignButton}
            >
              <Text style={{ color: "white" }}>{"Assegna"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default PlayerTile;

const styles = StyleSheet.create({
  pg: {
    borderLeftWidth: 1,
    paddingLeft: 10,
    marginLeft: 10,
    minWidth: 50,
    justifyContent: "center",
  },
  itemStyle: {
    fontSize: 15,
    height: 75,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  picker: {
    width: 100,
    borderColor: "black",
    borderWidth: 1,
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
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",

    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    minWidth: 200,
  },
  container: {
    flex: 1,
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
