import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { SET_ACTUAL_CONFIGURATION } from "../store/stateSlicer";
const Item = ({ name }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const configurations = useSelector((state) => state.configurations);
  // console.log("HOME", configurations);
  const confList = Object.values(configurations);
  // console.log("conflist", confList);
  const ids = Object.keys(configurations);
  // console.log("ids", ids);
  const data = confList.map((el, index) => {
    return {
      configuration: el,
      id: ids[index],
    };
  });
  const navigateToTopTabs = (key) => {
    dispatch(
      SET_ACTUAL_CONFIGURATION({
        key: key,
      })
    );
    navigation.navigate("TopTabs");
  };
  // console.log("HOME: data", data);
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToTopTabs(item.id)}>
      <Item key={item.id} name={item.configuration.generalConfig.name} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.newConf}>
        <Text style={styles.createNew}>Inizia una nuova asta!</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("New", {
              configurations: null,
              key: uuidv4(),
            })
          }
        >
          <Ionicons name="md-add-circle-outline" size={45} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.existingConf}>
        <Text style={styles.createNew}>Scegli tra le aste già create:</Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  newConf: {
    borderWidth: 1,
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  existingConf: { borderWidth: 1, flex: 3 },
  createNew: {
    fontSize: 26,
    fontWeight: "bold",
    alignSelf: "center",
  },
  item: {
    backgroundColor: "#fff",
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
});
