import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  REMOVE_CONFIGURATION,
  SET_ACTUAL_CONFIGURATION,
} from "../store/stateSlicer";
import {
  TitilliumWeb_700Bold,
  TitilliumWeb_400Regular,
  useFonts,
} from "@expo-google-fonts/titillium-web";
import AppLoading from "expo-app-loading";
// import TouchableScale from "react-native-touchable-scale";
// import { Button } from "react-native";
import { ListItem, Button } from "react-native-elements";
const Item = ({ name, onDelete, press }) => (
  // <View style={styles.item}>
  //   <Text style={styles.title}>{name}</Text>
  <ListItem
    onPress={() => press()}
    bottomDivider
    topDivider
    // Component={TouchableScale}
    // friction={90}
    // tension={100}
    // activeScale={0.95}
  >
    <ListItem.Content style={styles.item}>
      <ListItem.Title>
        <Text style={styles.itemName}>{name}</Text>
      </ListItem.Title>
      <TouchableOpacity onPress={() => onDelete()}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
      {/* <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => onDelete()}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={() => edit()}>
          <AntDesign name="edit" size={24} color="blue" />
        </TouchableOpacity> */}
      {/* </View> */}
    </ListItem.Content>
  </ListItem>
  // </View>
);

// const Item = ({ name, onDelete }) => (
//   <ListItem.Swipeable
//     style={{ flex: 1 }}
//     rightStyle={{}}
//     rightWidth={"10%"}
//     leftWidth={"10%"}
//     bottomDivider
//     rightContent={
//       <Button
//         // title="Delete"
//         icon={{ name: "delete", color: "white" }}
//         buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
//       />
//     }
//   >
//     <ListItem.Content>
//       <ListItem.Title>{name}</ListItem.Title>
//       {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>   */}
//       {/* <View style={styles.item}>
//     <Text style={styles.title}>{name}</Text>
//     <TouchableOpacity onPress={() => onDelete()}>
//       <AntDesign name="delete" size={24} color="red" />
//     </TouchableOpacity>
//   </View> */}
//     </ListItem.Content>
//   </ListItem.Swipeable>
// );

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
  const renderItem = ({ item, index }) => (
    // <TouchableOpacity onPress={() => navigateToTopTabs(item.id)}>
    <Item
      press={() => navigateToTopTabs(item.id)}
      onDelete={() => dispatch(REMOVE_CONFIGURATION({ id: item.id }))}
      // edit={() => navigation.navigate("Settings")}
      key={item.id}
      name={index + 1 + ". " + item.configuration.generalConfig.name}
    />
    // </TouchableOpacity>
  );
  let [fontsLoaded] = useFonts({
    TitilliumWeb_700Bold,
    TitilliumWeb_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.newConf}>
        <Text style={styles.createNew}>Crea una nuova asta!</Text>

        <TouchableOpacity
          style={styles.createNewButton}
          onPress={() =>
            navigation.navigate("New", {
              configurations: null,
              key: uuidv4(),
            })
          }
        >
          <Ionicons name="md-add-circle-outline" size={65} color="#00b8cc" />
        </TouchableOpacity>
      </View>
      {data.length > 0 && (
        <View style={styles.existingConf}>
          <Text style={styles.createNew}>Scegli tra le aste già create:</Text>

          <FlatList
            data={data}
            renderItem={({ item, index, navigation }) =>
              renderItem({ item, index, navigation })
            }
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    // borderWidth: 1,
    minWidth: 70,
  },
  createNewButton: {
    margin: 12,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 27,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
  },

  container: {
    flex: 1,
    backgroundColor: "#f2f7f7",
    // borderWidth: 1,
  },
  newConf: {
    // borderWidth: 1,
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  existingConf: {
    flex: 2,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
    // margin: 12,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 27,
  },
  createNew: {
    padding: 10,
    fontSize: 24,
    fontFamily: "TitilliumWeb_700Bold",
    // fontWeight: "bold",
    alignSelf: "center",
  },
  itemName: {
    // fontFamily: "TitilliumWeb_700Bold",

    fontFamily: "TitilliumWeb_400Regular",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",

    // alignItems: "center",
    // backgroundColor: "#fff",
    // padding: 5,
    // marginVertical: 5,
    // marginHorizontal: 5,
    // borderWidth: 0.5,
  },
  title: {
    fontSize: 18,
  },
});
