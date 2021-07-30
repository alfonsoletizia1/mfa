import React, { Component, useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
} from "react-native";

const transformData = (team) => {
  console.log("transform data ---> team --_>", team);
  const portieri = team.filter((el) => el.R === "P");
  var sumPortieri = 0;
  portieri.forEach((element) => {
    sumPortieri += element.value;
  });
  return [
    {
      role: "Portieri",
      data: portieri,
      total: sumPortieri,
    },
    {
      role: "Difensori",
      data: team.filter((el) => el.R === "D"),

      // total: team.getTotalValueForRole("D"),
    },
    {
      role: "Centrocampisti",
      data: team.filter((el) => el.R === "C"),

      // total: team.getTotalValueForRole("C"),
    },
    {
      role: "Attaccanti",
      data: team.filter((el) => el.R === "A"),

      // total: team.getTotalValueForRole("A"),
    },
  ];
};

const SectionSeparator = ({ totalValue }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{"Totale:"}</Text>
    <Text style={styles.title}>{totalValue}</Text>
  </View>
);
const data1 = {};
const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.Nome}</Text>
    <Text style={styles.title}>{item.value}</Text>
  </View>
);
export default class SectionListComponent extends Component {
  componentDidMount() {
    console.log("MOUNTED");
    const { team } = this.props;
    this.setState({
      data: transformData(team),
    });
  }
  componentDidUpdate() {
    console.log("Update");
    const { team } = this.props;
    // this.setState({
    //   data: transformData(team),
    // });
  }

  constructor(props) {
    super(props);
    const { team } = this.props;
    const DATA = transformData(team);
    this.state = {
      data: DATA,
    };
  }
  render() {
    const { data } = this.state;
    const { teamName, team } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.teamName}>{teamName}</Text>
        <SectionList
          sections={transformData(team)}
          keyExtractor={(item) => item.Id}
          renderItem={({ item }) => <Item item={item} />}
          renderSectionHeader={({ section: { role } }) => (
            <Text style={styles.header}>{role}</Text>
          )}
          renderSectionFooter={({ section: { total } }) => (
            <SectionSeparator totalValue={total} />
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    minWidth: 150,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    margin: 5,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  header: {
    fontSize: 16,
    backgroundColor: "#fff",
    fontWeight: "bold",
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 10,
    borderStyle: "dashed",
  },
  title: {
    fontSize: 14,
  },
});
