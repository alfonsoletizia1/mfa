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
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import stats from "../assets/lista2019.json";
import filter from "lodash.filter";
import { Ionicons } from "@expo/vector-icons";
import PlayerTile from "./PlayerTile";
import FlatListHeader from "./FlatListHeader";
import { statsFields } from "../util/utilClasses";
import { CheckBox } from "react-native-elements";

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
  const [order, setOrder] = useState(false);
  //CHECKBOXES
  const [checkP, setCheckP] = useState(true);
  const [checkD, setCheckD] = useState(true);
  const [checkC, setCheckC] = useState(true);
  const [checkA, setCheckA] = useState(true);
  //Data Order
  const [field, setField] = useState(null);
  const [orderType, setOrderType] = useState(null);

  // const [fullData, setFullData] = useState([]);
  const [showFlatList, setShowFlatList] = useState(true);
  const [roles, setRoles] = useState(["P", "D", "C", "A"]);
  // const [team, setTeam] = useState(actualTeam);
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
      // console.log("res ", res);
      setData(
        res.map((el) => {
          return el.item;
        })
      );
    }
  };

  // const filterData = (text) => {
  //   setData(
  //     filter(fullData, (user) => {
  //       return contains(user, text);
  //     })
  //   );
  // };
  // const contains = ({ Nome, Squadra }, query) => {
  //   if (Nome.toLowerCase().includes(query)) {
  //     return true;
  //   }

  //   return false;
  // };

  /**
   *
   */
  const filterByRole = (role, check) => {
    // setData(data.filter((el) => el[statsFields.role] === role));
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
  function getSortOrder(prop, orderType) {
    return function (a, b) {
      let out = 0;
      if (a[prop] > b[prop]) {
        out = 1;
      } else if (a[prop] < b[prop]) {
        out = -1;
      }
      if (orderType === "DESC") {
        out *= -1;
      }
      return out;
    };
  }
  const sortData = (field, orderType = "desc") => {
    console.log("SORT.... the field", field);
    // setOrder(!order);
    setField(field);
    setOrderType(orderType);
    // setData(data.sort(getSortOrder(field, orderType)));
    // var newData = _.orderBy(data, field, orderType);
    // setData(newData);
    console.log("SORTED");
  };
  const handleCloseButton = () => {
    setQuery("");
    setData(stats);
    Keyboard.dismiss();
    // setShowFlatList(false);
  };

  // const renderItem = ({ item }) => {
  //   return (
  //     <TouchableOpacity>
  //       <View style={styles.listItem}>
  //         <View style={styles.metaInfo}>
  //           <Text style={styles.title}>{item.Nome}</Text>
  //           <Text style={styles.subTitle}>{item.Squadra}</Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };
  useEffect(() => {
    // console.log("TYPE OF MV", typeof stats[0].Mf);
    var newStats = Object.assign([], stats);
    console.log(parseFloat(typeof newStats[0].Mf));
    // newStats.map((el) => {
    //   console.log("el", el);
    //   // el.Mf = parseFloat(el.Mf.replace(",", "."));
    //   // el.Mv = parseFloat(el.Mf.replace(",", "."));
    // });
    setIsLoading(true);
    setData(stats);
    // setFullData(stats);
    setIsLoading(false);
    // console.log(team);
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
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
        <View></View>
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
      {showFlatList ? (
        <KeyboardAvoidingView style={styles.flatlist}>
          <FlatList
            ListHeaderComponent={<FlatListHeader onPressField={sortData} />}
            stickyHeaderIndices={[0]}
            // data={data}
            data={_.filter(_.orderBy(data, field, orderType), (el) =>
              roles.includes(el.R)
            )}
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
