import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-elements";
import { UPDATE_TEAM_PLAYER, REMOVE_TEAM_PLAYER } from "../store/stateSlicer";
import { useDispatch } from "react-redux";

const SectionListItem = ({ item, showItems }) => {
  const [edit, setEdit] = useState(false);
  const [number, setNumber] = useState(item.value);
  const dispatch = useDispatch();
  const onUpdateContent = (item, value) => {
    dispatch(
      UPDATE_TEAM_PLAYER({
        teamId: item.teamId,
        oldValue: item.value,
        value: value,
        id: item.Id,
      })
    );
    setEdit(false);
  };
  const onRemoveContent = (item, value) => {
    dispatch(
      REMOVE_TEAM_PLAYER({
        teamId: item.teamId,
        oldValue: item.value,
        value: value,
        id: item.Id,
      })
    );
    setEdit(false);
  };
  if (showItems) {
    return (
      <View>
        {edit ? (
          <View style={styles.item}>
            <View style={styles.playerContainer}>
              <Text style={styles.title}>{item.Nome}</Text>

              <TextInput
                style={styles.input}
                onChangeText={(value) => setNumber(value)}
                value={number}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.buttons}>
              <Button
                title="Annulla"
                onPress={() => {
                  setEdit(false);
                  setNumber(item.value);
                }}
              />
              <Button
                title="Rimuovi"
                onPress={() => onRemoveContent(item, number)}
              />
              <Button
                onPress={() => onUpdateContent(item, number)}
                title="Modifica"
              />
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.item} onPress={() => setEdit(true)}>
            <View style={styles.playerContainer}>
              <Text style={styles.title}>{item.Nome}</Text>
              <Text style={styles.title}>{number}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  } else {
    return <View></View>;
  }
};

export default SectionListItem;
const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    // height: 40,
    // margin: 12,
    borderWidth: 1,
    // padding: 10,
  },
  container: {
    // flex: 1,
    padding: 10,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1,
    // minWidth: 150,
  },
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 3,
    marginRight: 5,
    margin: 2,
    borderWidth: 1,
    borderRadius: 5,
  },
  playerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    backgroundColor: "#fff",
    margin: 5,
    padding: 5,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  header: {
    fontSize: 16,
    // backgroundColor: "#fff",
    fontWeight: "bold",
  },
  teamNameContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 5,
    margin: 5,
    backgroundColor: "#1be0da",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1be0da",
  },
  teamName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 14,
  },
});
