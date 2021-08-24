import React, { Component } from "react";
import { ListItem, Avatar, SearchBar } from "react-native-elements";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import stats from "../assets/lista2019.json";
import { TextInput } from "react-native-paper";
import filter from "lodash.filter";
import style from "../style";

export default class ListTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filteredStats: stats,
    };
  }
  // componentDidMount() {
  //   console.log("stats", stats);
  // }
  updateSearch = (search) => {
    if (!search) {
      this.setState({
        search,
        filteredStats: stats,
      });
    } else {
      this.setState({
        search,
        filteredStats: filter(stats, (el) => {
          return el.Nome.toLowerCase().includes(search);
        }),
      });
    }
  };
  renderItem1 = (l) => {
    return (
      <Text>{l.Nome}</Text>
      // <TouchableOpacity>
      // <ListItem key={l.Id} bottomDivider>
      //   <ListItem.Content>
      //     <ListItem.Title>{l.Nome}</ListItem.Title>
      //     <ListItem.Subtitle>{l.Squadra}</ListItem.Subtitle>
      //   </ListItem.Content>
      // </ListItem>
      // </TouchableOpacity>;
    );
  };
  renderItem = ({ item }) => (
    <ListItem title={item.Nome} subtitle={item.Squadra} bottomDivider={true} />
  );
  render() {
    const { search, filteredStats } = this.state;
    return (
      // <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <TextInput
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <View style={styles.flatlist}>
          <FlatList
            initialNumToRender={10}
            data={filteredStats}
            renderItem={this.renderItem1}
            keyExtractor={(item) => item.Id}
          />
        </View>
        {/* {filteredStats.map((l, i) => (
            <TouchableOpacity>
              <ListItem key={l.Id} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{l.Nome}</ListItem.Title>
                  <ListItem.Subtitle>{l.Squadra}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          ))} */}
        <View style={{ zIndex: 0 }}>
          <Text>{"HELLO"}</Text>
        </View>
      </SafeAreaView>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
