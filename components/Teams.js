import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import SectionListComponent from "./SectionListComponent";
import { useSelector } from "react-redux";
import _ from "lodash";
///DATI FITTIZI DA OTTENERE
const Home = () => {
  const actualConfiguration = useSelector((state) => state.actualConfiguration);
  const teams = useSelector(
    (state) => state.configurations[actualConfiguration].teams
  );
  const teamStatus = useSelector(
    (state) => state.configurations[actualConfiguration].teamStatus
  );

  const notMyTeam = Object.values(teamStatus).filter((el) => el.id != 0);
  // console.log("notMyTeam", notMyTeam);

  const myTeam = Object.values(teamStatus).filter((el) => el.id == 0);
  console.log("myTeam", myTeam);

  const myCredits = myTeam[0].creditiDisponibili;
  console.log("myCredits", myCredits);

  const mapIDDiff = {};
  notMyTeam.forEach((el) => {
    mapIDDiff[el.id] = myCredits - el.creditiDisponibili;
  });
  mapIDDiff["0"] = 0;
  console.log("mapIDDiff", mapIDDiff);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <ScrollView> */}
        {Object.values(teamStatus)
          .sort((a, b) => {
            return -Number(a.creditiDisponibili) + Number(b.creditiDisponibili);
          })
          .map((p) => {
            return (
              <View style={styles.listElement} key={p.id}>
                <SectionListComponent
                  team={teams.filter((el) => el.teamId === p.id)}
                  diff={mapIDDiff[p.id]}
                  teamName={p.name}
                  teamId={p.id}
                  teamState={p}
                  creditiDisponibili={p.creditiDisponibili}
                />
              </View>
            );
          })}
        {/* </ScrollView> */}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flexDirection: "row",
  //   flex: 1,
  //   // justifyContent: '',
  // },
  // listElement: {
  //   flex: 1,
  // },
});
export default Home;
