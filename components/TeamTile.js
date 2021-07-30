import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "../styles";
import FooterTile from "./FooterTile";
import ListTile from "./ListTile";
import HeaderTile from "./HeaderTile";
import Row from "../Row";
import Column from "../Column";

export class TeamTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamName: props.teamName,
      availableCredits: props.availableCredits,
      initialCredits: props.availableCredits,
    };
  }
  render() {
    return (
      <View style={styles.column}>
        <View style={styles.header}>
          <Text>{this.state.availableCredits}</Text>
        </View>
        <View style={styles.list}>
          <ListTile />
        </View>
        <View style={styles.footer}>
          <Text> footer </Text>
        </View>
      </View>
    );
  }
}

export default TeamTile;
