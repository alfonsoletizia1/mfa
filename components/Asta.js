import React, { useState } from "react";
import _ from "lodash";
import { StyleSheet, View, Alert } from "react-native";
import stats from "../assets/lista2019 copy.json";
import PlayerTile from "./PlayerTile";
import FlatListHeader from "./FlatListHeader";
import { CheckBox } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { iconsConf } from "../util/utilClasses";
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";
import HeaderList from "./HeaderList";

const START_SAMPLE = {
  Id: 99999,
  R: "A",
  Nome: "Clicca estrai",
  Squadra: "per iniziare!",
  Pg: 0,
  Mv: 0,
  Mf: 0,
  Gf: 0,
  Gs: 0,
  Ass: 0,
  Asf: 0,
  Amm: 0,
  Esp: 0,
  Au: 0,
  disableAssign: true,
};
const Asta = () => {
  const [players, setPlayers] = useState([...stats]);
  const [passedIds, setPassedIds] = useState([]);
  const [sample, setSample] = useState(START_SAMPLE);
  const [backIndex, setBackIndex] = useState(0);
  const [checkP, setCheckP] = useState(true);
  const [checkD, setCheckD] = useState(true);
  const [checkC, setCheckC] = useState(true);
  const [checkA, setCheckA] = useState(true);
  const [roles, setRoles] = useState(["P", "D", "C", "A"]);
  const state = useSelector((state) => state.teams);

  const setAssigned = (id) => {
    // var index = stats.findIndex((el) => el.Id === id);
    // data[index].assigned = true;
    // setData(data);
  };
  const filterByRole = (role, check) => {
    if (check) {
      roles.push(role);
      setRoles(roles);
    } else {
      var index = roles.indexOf(role);
      if (index > -1) {
        roles.splice(index, 1);
        setRoles(roles);
      }
    }
  };

  const goBack = () => {
    if (passedIds.length <= backIndex + 1 || passedIds.lengt <= 1) {
      alert("Finit");
    } else {
      console.log("vack index", backIndex + 1);
      console.log("back -->", passedIds[backIndex + 1]);
      setSample(passedIds[backIndex + 1]);
      setBackIndex(backIndex + 1);
    }
  };
  const goNext = () => {
    if (backIndex <= 0) {
      alert("Finit");
    } else {
      console.log("next index", backIndex - 1);
      console.log("next -->", passedIds[backIndex - 1]);
      setSample(passedIds[backIndex - 1]);
      setBackIndex(backIndex - 1);
    }
  };
  const extract = () => {
    // console.log("players", players);
    if (backIndex >= 0) {
      console.log("reset back");
      setBackIndex(0);
    }
    var sample = _.sample(
      _.filter(
        _.filter(
          players,
          (el) =>
            roles.includes(el.R) &&
            !state.teams.map((el) => el.Id).includes(el.Id)
        )
      )
    );
    if (sample) {
      console.log("sample", sample.Id);
      passedIds.unshift(sample);
      setPassedIds(passedIds);
      console.log("passedIds", passedIds);

      var removed = _.remove(players, (el) => el.Id == sample.Id);
      //   console.log("removed", removed);
      setPlayers(players);
      setSample(sample);
    } else {
      Alert.alert(
        "Attenzione!",
        "I giocatori in questo ruolo sono terminati!",
        [
          {
            text: "Chiudi",
            onPress: () => console.log("Chiudi"),
          },
          {
            text: "Ricomincia",
            onPress: () => {
              console.log("Ricomincia ", passedIds);
              players.push(...passedIds);
              setPlayers(players);
              setPassedIds([]);
              setSample(START_SAMPLE);
              //   console.log("Ricomincia");
            },
            style: "cancel",
          },
          //   { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
  };
  return (
    // <View>
    //   <HeaderList />
    // </View>
    <View style={styles.container}>
      <View style={{ flexDirection: "column-reverse" }}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            title={
              <MaterialCommunityIcons
                name={iconsConf["P"].name}
                size={24}
                color={iconsConf["P"].color}
              />
            }
            checked={checkP}
            onPress={() => {
              filterByRole("P", !checkP);
              setCheckP(!checkP);
            }}
          />
          <CheckBox
            title={
              <MaterialCommunityIcons
                name={iconsConf["D"].name}
                size={24}
                color={iconsConf["D"].color}
              />
            }
            checked={checkD}
            onPress={() => {
              filterByRole("D", !checkD);
              setCheckD(!checkD);
            }}
          />
          <CheckBox
            title={
              <MaterialCommunityIcons
                name={iconsConf["C"].name}
                size={24}
                color={iconsConf["C"].color}
              />
            }
            checked={checkC}
            onPress={() => {
              filterByRole("C", !checkC);
              setCheckC(!checkC);
            }}
          />
          <CheckBox
            title={
              <MaterialCommunityIcons
                name={iconsConf["A"].name}
                size={24}
                color={iconsConf["A"].color}
              />
            }
            checked={checkA}
            onPress={() => {
              filterByRole("A", !checkA);
              setCheckA(!checkA);
            }}
          />
        </View>
      </View>

      {/* <View style={{  }}> */}
      <View style={styles.header}>
        <HeaderList disableAll={true} />
      </View>
      <View style={styles.playerTile}>
        <PlayerTile
          disableAssign={sample.disableAssign}
          item={sample}
          onAssign={() => setAssigned(sample.Id)}
        />
      </View>
      {/* </View> */}

      <View style={styles.buttonGroup}>
        <Button
          disabled={passedIds.length <= backIndex + 1 || passedIds.lengt <= 1}
          onPress={() => goBack()}
          mode={"outlined"}
        >
          Indietro
        </Button>
        <Button
          disabled={backIndex <= 0}
          onPress={() => goNext()}
          mode={"outlined"}
        >
          Avanti
        </Button>
        <Button onPress={() => extract()} mode={"outlined"}>
          Estrai
        </Button>
      </View>
    </View>
  );
};

export default Asta;

const styles = StyleSheet.create({
  playerTile: {
    // borderWidth: 1,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
  },
  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatlist: {
    flex: 1,
  },
  button: {
    alignContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // width: 200,
  },
  input: {
    flex: 1,
    // borderWidth: 1,
    paddingRight: 10,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    minWidth: 50,
    paddingVertical: 0,
    borderBottomWidth: 0,
    marginLeft: 5,
    height: 30,
  },
  container: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "green",
    // backgroundColor: "#f8f8f8",
    // padding: 10,
    // paddingTop: StatusBar.currentHeight + 5,
  },
  text: {
    fontSize: 20,
    color: "#101010",
    marginTop: 60,
    fontWeight: "700",
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  listItem1: {
    borderWidth: 2,
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  metaInfo: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10,
  },
  subTitle: {
    fontSize: 14,
    width: 150,
    padding: 5,
  },
});
