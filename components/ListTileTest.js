import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  TextInput,
} from "react-native";
import Fuse from "fuse.js";
import stats from "../assets/lista2019.json";
import { Ionicons } from "@expo/vector-icons";
import PlayerTile from "./PlayerTile";
import FlatListHeader from "./FlatListHeader";
import { CheckBox } from "react-native-elements";

// const DismissKeyboard = ({ children }) => (
//   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//     {children}
//   </TouchableWithoutFeedback>
// );

const ListTileTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState(false);
  const [checkP, setCheckP] = useState(true);
  const [checkD, setCheckD] = useState(true);
  const [checkC, setCheckC] = useState(true);
  const [checkA, setCheckA] = useState(true);
  const [field, setField] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [showFlatList, setShowFlatList] = useState(true);
  const [roles, setRoles] = useState(["P", "D", "C", "A"]);

  const options = {
    includeScore: false,
    threshold: 0.1,
    keys: ["Nome"],
  };

  const fuse = new Fuse(stats, options);

  const handleSearch = (text) => {
    setQuery(text);
    if (!text) {
      setData(stats);
    } else {
      if (!showFlatList) {
        setShowFlatList(true);
      }
      var res = fuse.search(text);
      setData(
        res.map((el) => {
          return el.item;
        })
      );
    }
  };
  const setAssigned = (id) => {
    var index = data.findIndex((el) => el.Id === id);
    console.log("data[index]", data[index]);
    data[index].assigned = true;
    setData(data);
  };
  const filterByRole = (role, check) => {
    if (check) {
      roles.push(role);
      setRoles(roles);
    } else {
      var index = roles.indexOf(role);
      if (index > -1) {
        roles.splice(index, 1);
        setRoles(roles);
      }
    }
  };

  const sortData = (field, orderType = "desc") => {
    setField(field);
    setOrderType(orderType);
  };
  const handleCloseButton = () => {
    setQuery("");
    setData(stats);
    Keyboard.dismiss();
  };

  useEffect(() => {
    var newStats = Object.assign([], stats);
    console.log(parseFloat(typeof newStats[0].Mf));
    setIsLoading(true);
    setData(stats);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  return (
    // <DismissKeyboard>
    <View style={styles.container}>
      {/* <View
      // style={{
      //   flexDirection: "row",
      //   // justifyContent: "flex-start",
      //   alignItems: "center",
      // }}
      > */}
      <View style={{ flexDirection: "column-reverse" }}>
        <View style={styles.inputContainer}>
          <TextInput
            underlineColor="transparent"
            underlineColorAndroid="transparent"
            // outlineColor="transparent"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            value={query}
            onChangeText={(queryText) => handleSearch(queryText)}
            placeholder="Search"
            onFocus={() => setShowFlatList(true)}
            onSubmitEditing={Keyboard.dismiss}
          />

          <View>
            <Ionicons
              name="close-circle-outline"
              size={35}
              onPress={() => handleCloseButton()}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            title="P"
            checked={checkP}
            onPress={() => {
              filterByRole("P", !checkP);
              setCheckP(!checkP);
            }}
          />
          <CheckBox
            title="D"
            checked={checkD}
            onPress={() => {
              filterByRole("D", !checkD);
              setCheckD(!checkD);
            }}
          />
          <CheckBox
            title="C"
            checked={checkC}
            onPress={() => {
              filterByRole("C", !checkC);
              setCheckC(!checkC);
            }}
          />
          <CheckBox
            title="A"
            checked={checkA}
            onPress={() => {
              filterByRole("A", !checkA);
              setCheckA(!checkA);
            }}
          />
        </View>
      </View>
      {/* </View> */}
      {showFlatList ? (
        <KeyboardAvoidingView style={styles.flatlist}>
          <FlatList
            ListHeaderComponent={<FlatListHeader onPressField={sortData} />}
            stickyHeaderIndices={[0]}
            data={_.filter(
              _.filter(_.orderBy(data, field, orderType), (el) =>
                roles.includes(el.R)
              ),
              (el) => !el.assigned
            )}
            keyExtractor={(item) => String(item.Id)}
            renderItem={({ item, index }) => {
              if (!item.assigned) {
                return (
                  <PlayerTile
                    index={index}
                    item={item}
                    onAssign={(index) => setAssigned(index)}
                  />
                );
              }
            }}
          />
        </KeyboardAvoidingView>
      ) : (
        <View></View>
      )}

      <View style={{ zIndex: 0 }}></View>
    </View>
    // </DismissKeyboard>
  );
};

export default ListTileTest;

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
  },
  button: {
    alignContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // width: 200,
  },
  input: {
    paddingRight: 10,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    minWidth: 50,
    paddingVertical: 0,
    borderBottomWidth: 0,
    marginLeft: 5,
    height: 35,
  },
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "green",
    backgroundColor: "#f8f8f8",
    padding: 10,
    paddingTop: StatusBar.currentHeight + 5,
  },
  text: {
    fontSize: 20,
    color: "#101010",
    marginTop: 60,
    fontWeight: "700",
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  listItem1: {
    borderWidth: 2,
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  metaInfo: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10,
  },
  subTitle: {
    fontSize: 14,
    width: 150,
    padding: 5,
  },
});
