import React from "react";
import { View, ScrollView } from "react-native";
import styles from "../styles";
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

  return (
    <View style={styles.container}>
      <ScrollView>
        {Object.values(teamStatus)
          .sort((a, b) => {
            return -Number(a.creditiDisponibili) + Number(b.creditiDisponibili);
          })
          .map((p) => {
            return (
              <View key={p.id}>
                <SectionListComponent
                  team={teams.filter((el) => el.teamId === p.id)}
                  teamName={p.name}
                  teamId={p.id}
                  teamState={p}
                  creditiDisponibili={p.creditiDisponibili}
                />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};
export default Home;
