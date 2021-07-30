import { StatusBar } from "expo-status-bar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from "react-native";
import ListTileTest, { Team } from "./ListTileTest";
import ListTile from "./ListTile";
import TeamTile from "./TeamTile";
import styles from "../styles";
import SectionListComponent from "./SectionListComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import store from "../store/store";

///DATI FITTIZI DA OTTENERE
export default function Home() {
  function getTotalValueForRole(arr) {
    var sum = 0;
    arr.forEach((el) => {
      sum += el.value;
    });
    return sum;
  }
  const team = new Team();
  const teams = useSelector((state) => state.teams.teams);
  const conf = {
    creditiIniziali: 500,

    // squadre: [
    //   {
    //     id: 1,
    //     nome: "Pippo",
    //     team: teams.teams[0],
    //   },
    //   {
    //     id: 2,
    //     nome: "Pluto",
    //     team: team,
    //   },
    //   {
    //     id: 3,
    //     nome: "Pippo",
    //     team: team,
    //   },
    //   { id: 4, nome: "Pluto", team: team },
    //   { id: 5, nome: "Pippo", team: team },
    //   { id: 6, nome: "Pluto", team: team },
    // ],
  };
  return (
    // <SafeAreaView>
    <KeyboardAvoidingView style={styles.container}>
      {/* <TeamTile availableCredits={conf.creditiIniziali} /> */}
      {/* <View style={{ flex: 1 }}>
        <ListTileTest />
      </View> */}
      {/* <FlatList
        // ListHeaderComponent={<FlatListHeader />}
        //ListHeaderComponent={renderHeader}
        extraData={teams.teams}
        numColumns={3}
        data={teams.teams}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <SectionListComponent team={item} teamName={"test"} />
        )}
      /> */}
      <View style={styles.lists}>
        <SectionListComponent
          team={[
            {
              role: "Portieri",
              data: teams.teams[0].P,
              total: getTotalValueForRole(teams.teams[0].P),
            },
            {
              role: "Difensori",
              data: teams.teams[0].D,
              total: getTotalValueForRole(teams.teams[0].D),
            },
            {
              role: "Centrocampisti",
              data: teams.teams[0].C,
              total: getTotalValueForRole(teams.teams[0].C),
            },
            {
              role: "Attaccanti",
              data: teams.teams[0].A,
              total: getTotalValueForRole(teams.teams[0].A),
            },
          ]}
          teamName={"test"}
          grandTotal={
            getTotalValueForRole(teams.teams[0].P) +
            getTotalValueForRole(teams.teams[0].D) +
            getTotalValueForRole(teams.teams[0].C) +
            getTotalValueForRole(teams.teams[0].A)
          }
        />

        {/* <SectionListComponent team={teams.teams[0]} teamName={"test"} /> */}

        {/* <SectionListComponent team={teams.teams[1]} />
        <SectionListComponent team={teams.teams[2]} />

        <SectionListComponent team={teams.teams[3]} /> */}
      </View>
      {/* {teams.teams[0].P.map((el) => {
        return <Text>{el.name}</Text>;
      })} */}

      {/* <TeamTile /> */}
    </KeyboardAvoidingView>
    // </SafeAreaView>
  );
}
