import React, { useState, useEffect, useRef } from "react";
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
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ListItem, Avatar, SearchBar } from "react-native-elements";
import stats from "../assets/lista2019.json";
import { List } from "react-native-paper";
import filter from "lodash.filter";
import style from "../style";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Ionicons } from "@expo/vector-icons";
import PlayerTile from "./PlayerTile";
import FlatListHeader from "./FlatListHeader";

export class Player {
  constructor() {
    this.name = "";
    this.value = 0;
  }
}
export class Team {
  constructor() {
    this.role = ["P", "D", "C", "A", "All"];
    this.P = [
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
    ];
    this.D = [
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
    ];
    this.C = [
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
    ];
    this.A = [
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
      // { name: "Sirigu", value: 10 },
    ];
  }
  getTotalValueForRole = (role) => {
    var sum = 0;
    var elements;
    switch (role) {
      case "P":
        elements = this.P;
        break;
      case "D":
        elements = this.D;
        break;
      case "C":
        elements = this.C;
        break;
      case "A":
        elements = this.A;
        break;
      default:
        break;
    }
    elements.forEach((el) => {
      sum += el.value;
    });
    return sum;
  };
  addP({ name, value }) {
    if (this.P.length < 3) {
      this.P.push({ name, value });
      return true;
    }
    return false;
  }
  addD(dif) {
    if (this.D.length < 8) {
      this.D.push(dif);
      return true;
    }
    return false;
  }
  addC(cen) {
    if (this.C.length < 8) {
      this.C.push(cen);
      return true;
    }
    return false;
  }
  addA(att) {
    if (this.A.length < 6) {
      this.A.push(att);
      return true;
    }
    return false;
  }
}

const actualTeam = new Team();
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ListTileTest = () => {
  // const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);
  const [showFlatList, setShowFlatList] = useState(true);
  const [team, setTeam] = useState(actualTeam);
  const typingTimer = useRef(null);
  const options = {
    // isCaseSensitive: false,
    includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.1,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: ["Nome"],
  };

  const fuse = new Fuse(stats, options);

  // const handleSearch = (text) => {
  //   setQuery(text);
  //   clearTimeout(typingTimer.current);
  //   if (!showFlatList) {
  //     setShowFlatList(true);
  //   }
  //   const formattedQuery = text.toLowerCase();
  //   console.log("query", formattedQuery);
  //   typingTimer.current = setTimeout(() => filterData(text), 500);
  // };

  const handleSearch = (text) => {
    setQuery(text);
    if (!text) {
      setData(stats);
    } else {
      // clearTimeout(typingTimer.current);
      if (!showFlatList) {
        setShowFlatList(true);
      }
      var res = fuse.search(text);
      console.log("res ", res);
      setData(
        res.map((el) => {
          return el.item;
        })
      );
    }
  };

  const filterData = (text) => {
    setData(
      filter(fullData, (user) => {
        return contains(user, text);
      })
    );
  };
  const contains = ({ Nome, Squadra }, query) => {
    if (Nome.toLowerCase().includes(query)) {
      return true;
    }

    return false;
  };

  const handleCloseButton = () => {
    setQuery("");
    setData(stats);
    Keyboard.dismiss();
    setShowFlatList(false);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.listItem}>
          <View style={styles.metaInfo}>
            <Text style={styles.title}>{item.Nome}</Text>
            <Text style={styles.subTitle}>{item.Squadra}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    setIsLoading(true);
    setData(stats);
    setFullData(stats);
    setIsLoading(false);
    console.log(team);
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
      {showFlatList ? (
        <KeyboardAvoidingView style={styles.flatlist}>
          <FlatList
            ListHeaderComponent={<FlatListHeader />}
            data={data}
            keyExtractor={(item) => String(item.Id)}
            renderItem={({ item }) => <PlayerTile item={item} />}
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
    // padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
  },
  input: {
    flex: 1,
    paddingRight: 10,
    // borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    minWidth: 100,
    paddingVertical: 0,
    // outline: "none",
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
