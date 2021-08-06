import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import FlatListHeader from "./FlatListHeader";
import PlayerTile from "./PlayerTile";
import stats from "../assets/lista2019.json";

const roles = [
  { label: "Portieri", id: "P" },
  { label: "Difensori", id: "D" },
  { label: "Centrocampisti", id: "C" },
  { label: "Attaccanti", id: "A" },
];

const Asta = (props) => {
  const [selectedRole, setSelectedRole] = useState("P");
  const [data, setData] = useState(stats);

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        itemStyle={styles.itemStyle}
        mode={"dropdown"}
        selectedValue={selectedRole}
        onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
      >
        {roles.map((el) => {
          return <Picker.Item label={el.label} value={el.id} key={el.id} />;
        })}
      </Picker>
      <View>
        <View style={styles.header}>
          <FlatListHeader />
        </View>
        <View style={styles.playerTile}>
          <PlayerTile index={0} item={data[0]} />
        </View>
      </View>
    </View>
  );
};

export default Asta;

const styles = StyleSheet.create({
  header: {},
  container: {
    flex: 1,
    justifyContent: "center",
  },
  picker: {
    minWidth: 200,
    resizeMode: "stretch",
  },
  itemStyle: {
    fontSize: 15,
    height: 75,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});
