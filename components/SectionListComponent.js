import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  // SafeAreaView,
  SectionList,
  // StatusBar,
  TouchableOpacity,
  // TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { conf } from "../util/utilClasses";
import SectionListItem from "./SectionListItem";
import {
  TitilliumWeb_700Bold,
  TitilliumWeb_400Regular,
  useFonts,
} from "@expo-google-fonts/titillium-web";
import AppLoading from "expo-app-loading";
const transformData = (team) => {
  // console.log("transform data ---> team -->", team);
  const portieri = team.filter((el) => el.R === "P");
  var sumPortieri = 0;
  portieri.forEach((element) => {
    sumPortieri += Number(element.value);
  });
  return [
    {
      role: "Portieri",
      roleCode: "P",
      data: team.filter((el) => el.R === "P"),
      total: team
        .filter((el) => el.R === "P")
        .reduce((sum, val) => sum + Number(val.value), 0),
    },
    {
      role: "Difensori",
      roleCode: "D",

      data: team.filter((el) => el.R === "D"),
      total: team
        .filter((el) => el.R === "D")
        .reduce((sum, val) => sum + Number(val.value), 0),
    },
    {
      roleCode: "C",
      role: "Centrocampisti",
      data: team.filter((el) => el.R === "C"),
      total: team
        .filter((el) => el.R === "C")
        .reduce((sum, val) => sum + Number(val.value), 0),
    },
    {
      roleCode: "A",
      role: "Attaccanti",
      data: team.filter((el) => el.R === "A"),
      total: team
        .filter((el) => el.R === "A")
        .reduce((sum, val) => sum + Number(val.value), 0),
    },
  ];
};

// const SectionSeparator = ({ totalValue }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{"Totale:"}</Text>
//     <Text style={styles.title}>{totalValue}</Text>
//   </View>
// );

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.Nome}</Text>
    <Text style={styles.title}>{item.value}</Text>
  </View>
);
const Header = ({ leftTitle, rightTitle, centerTitle }) => (
  <TouchableOpacity style={styles.headerContainer}>
    <Text style={styles.header}>{leftTitle}</Text>
    <Text style={styles.header}>{centerTitle}</Text>
    <Text style={styles.header}>{rightTitle}</Text>
  </TouchableOpacity>
);
export default function SectionListComponent(props) {
  const [showItems, setShowItems] = useState(true);
  const { teamName, team, teamId, teamState, creditiDisponibili, diff } = props;
  // console.log("SECTION TEAM STATE", teamState);
  // const teamStatus = useSelector((state) => state.teams.teamStatus);
  const { actualConfiguration, configurations } = useSelector((state) => state);
  const teamStatus = configurations[actualConfiguration].teamStatus;

  let [fontsLoaded] = useFonts({
    TitilliumWeb_700Bold,
    TitilliumWeb_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        // style={styles.teamNameContainer}
        style={
          diff == 0
            ? styles.teamNameContainer
            : diff > 0
            ? styles.positiveDiff
            : styles.negativeDiff
        }
        onPress={() => {
          // console.log(showItems);
          setShowItems(!showItems);
        }}
      >
        <View style={styles.teamNameEl}>
          <Text style={styles.teamName}>{teamName}</Text>
        </View>
        <View style={styles.teamNameEl}>
          <Text style={styles.teamName}>{creditiDisponibili}</Text>
        </View>
        <View style={styles.teamNameEl}>
          <Text style={styles.teamName}>{diff}</Text>
        </View>
      </TouchableOpacity>
      <SectionList
        sections={transformData(team)}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => {
          return <SectionListItem showItems={showItems} item={item} />;
        }}
        renderSectionHeader={({ section: { role, total, roleCode } }) =>
          showItems ? (
            <Header
              leftTitle={
                conf.num[roleCode] -
                teamStatus[teamId][roleCode] +
                "/" +
                conf.num[roleCode]
              }
              rightTitle={total}
              centerTitle={role}
            />
          ) : null
        }
        // renderSectionFooter={({ section: { total } }) => (
        //   <SectionSeparator totalValue={total} />
        // )}
      />
    </View>
  );
}
// }
const styles = StyleSheet.create({
  teamNameEl: {
    width: "33%",
    justifyContent: "center",
    // borderWidth: 1,
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    // flex: 1,
    padding: 5,
    // borderRadius: 15,
    marginTop: 2,
    // borderWidth: 1,
    // minWidth: 150,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3,
    elevation: 4,
    // margin: 12,
    backgroundColor: "white",
    // borderRadius: 20,
    // padding: 27,
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
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
  positiveDiff: {
    // justifyContent: "center",
    flexDirection: "row",
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    // borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#74f2a4",
    borderColor: "#74f2a4", //1be0da
  },
  negativeDiff: {
    // justifyContent: "center",
    flexDirection: "row",
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    // borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#f07171",
    borderColor: "#f07171", //1be0da
  },
  teamNameContainer: {
    // justifyContent: "center",
    flexDirection: "row",
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    // borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#74e6f2",
    borderColor: "#74e6f2", //1be0da
  },
  teamName: {
    fontSize: 15,
    color: "black",
    // fontWeight: "bold",
    textAlign: "center",
    fontFamily: "TitilliumWeb_700Bold",
  },
  title: {
    fontSize: 14,
  },
});
