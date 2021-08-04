import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
import React from "react";
import { View, KeyboardAvoidingView } from "react-native";

import styles from "../styles";
import SectionListComponent from "./SectionListComponent";
import { conf } from "../util/utilClasses";
import { useSelector } from "react-redux";
import _ from "lodash";
///DATI FITTIZI DA OTTENERE
export default function Home() {
  const state = useSelector((state) => state.teams);

  console.log("teams", state.teams);

  // var team = teams.filter((el) => el);
  return (
    // <SafeAreaView>
    <View style={styles.container}>
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
      {/* <SectionListComponent
        key={conf.partecipants[0].id}
        team={state.teams.filter((el) => el.teamId === conf.partecipants[0].id)}
        teamName={conf.partecipants[0].name}
        teamId={conf.partecipants[0].id}
      /> */}
      {Object.keys(state.teamStatus).map((id) => {
        return (
          <View key={id}>
            <SectionListComponent
              team={state.teams.filter((el) => el.teamId === id)}
              teamName={state.teamStatus[id].name}
              teamId={id}
              teamState={state.teamStatus[id]}
              creditiDisponibili={state.teamStatus[id].creditiDisponibili}
            />
          </View>
        );
      })}
      {Object.values(state.teamStatus)
        .sort((a, b) => -a.creditiDisponibili + b.creditiDisponibili)
        .map((p) => {
          return (
            <View key={p.id}>
              <SectionListComponent
                team={state.teams.filter((el) => el.teamId === p.id)}
                teamName={p.name}
                teamId={p.id}
                teamState={p}
                creditiDisponibili={p.creditiDisponibili}
              />
            </View>
          );
        })}
      {/* {conf.partecipants.map((p) => {
        return (
          <View key={p.id}>
            <SectionListComponent
              team={state.teams.filter((el) => el.teamId === p.id)}
              teamName={p.name}
              teamId={p.id}
              teamState={state.teamStatus[p.id]}
            />
          </View>
        );
      })} */}
      {/* <View style={styles.lists}>
        {conf.partecipants.map((p) => {
          return (
            <View key={p.id}>
              <SectionListComponent
                key={p.id}
                team={state.teams.filter((el) => el.teamId === p.id)}
                teamName={p.name}
                teamId={p.id}
              />
            </View>
          );
        })} */}

      {/* <SectionListComponent team={teams.teams[0]} teamName={"test"} /> */}

      {/* <SectionListComponent team={teams.teams[1]} />
        <SectionListComponent team={teams.teams[2]} />

        <SectionListComponent team={teams.teams[3]} /> */}
    </View>

    // </KeyboardAvoidingView>
    // </SafeAreaView>
  );
}
