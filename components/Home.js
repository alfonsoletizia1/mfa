import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
import React from "react";
import { View, KeyboardAvoidingView } from "react-native";

import styles from "../styles";
import SectionListComponent from "./SectionListComponent";

import { useSelector } from "react-redux";

///DATI FITTIZI DA OTTENERE
export default function Home() {
  const state = useSelector((state) => state.teams);
  console.log("teams", state.teams);
  // var team = teams.filter((el) => el);
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
          team={state.teams.filter((el) => el.teamId === "id")}
          teamName={"test"}
          teamId={"id"}
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
