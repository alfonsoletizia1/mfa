import React, { Component, useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
} from "react-native";
import { useSelector } from "react-redux";
import { conf } from "../util/utilClasses";
const transformData = (team) => {
  console.log("transform data ---> team --_>", team);
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
  <View style={styles.headerContainer}>
    <Text style={styles.header}>{leftTitle}</Text>
    <Text style={styles.header}>{centerTitle}</Text>
    <Text style={styles.header}>{rightTitle}</Text>
  </View>
);
export default function SectionListComponent(props) {
  const { teamName, team, teamId, teamState } = props;
  console.log("SECTION TEAM STATE", teamState);
  const state = useSelector((state) => state.teamStatus);
  return (
    <View style={styles.container}>
      <View style={styles.teamNameContainer}>
        <Text style={styles.teamName}>{teamName}</Text>
      </View>
      <SectionList
        sections={transformData(team)}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => <Item item={item} />}
        renderSectionHeader={({ section: { role, total, roleCode } }) => (
          // <Text style={styles.header}>{role}</Text>
          <Header
            leftTitle={
              conf.num[roleCode] -
              teamState[roleCode] +
              "/" +
              conf.num[roleCode]
            }
            rightTitle={total}
            centerTitle={role}
          />
        )}
        // renderSectionFooter={({ section: { total } }) => (
        //   <SectionSeparator totalValue={total} />
        // )}
      />
    </View>
  );
}
// }
const styles = StyleSheet.create({
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
  teamNameContainer: {
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
