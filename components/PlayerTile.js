import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { assignTeamPlayer } from "../store/taskAction";
import { Button } from "react-native-paper";
import { ASSIGN_TEAM_PLAYER } from "../store/stateSlicer";

const handlePress = (item) => {};

const PlayerTile = ({ item }) => {
  const dispatch = useDispatch();
  const handleAssign = (item) => {
    console.log("PRESSED");
    setdisableAssignButton(true);
    // dispatch(ASSIGN_TEAM_PLAYER({ name: item.Nome, value: 10}, "0", item.R));
    dispatch(
      ASSIGN_TEAM_PLAYER({
        name: item.Nome,
        value: 10,
        teamId: 0,
        role: item.R,
        id: item.Id,
      })
    );

    setdisableAssignButton(false);
  };
  const [expand, setExpand] = useState(false);
  const [disableAssignButton, setdisableAssignButton] = useState(false);
  // "Partite Giocate": 3,
  // "Gol fatti": 0,
  // "Gs": 8,
  // "Ass": 0,
  // "Asf": 0,
  // "Amm": 1,
  // "Esp": 0,
  // "Au": 0
  return (
    <View style={styles.externalContainer}>
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
            {/* <Text style={styles.title}>{"MV"}</Text> */}
            <Text style={styles.subTitle}>{item.Mv}</Text>
          </View>
          <View style={styles.fmedia}>
            {/* <Text style={styles.title}>{"FM"}</Text> */}
            <Text style={styles.subTitle}>{item.Mf}</Text>
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
            <Button
              onPress={() => handleAssign(item)}
              disabled={disableAssignButton}
              // title={"Assegna"}
              style={styles.assignButton}
            >
              <Text style={{ color: "white" }}>{"Assegna"}</Text>
            </Button>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default PlayerTile;

const styles = StyleSheet.create({
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
