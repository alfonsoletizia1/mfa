import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "./components/Home";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import ListTileTest from "./components/ListTileTest";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { store } from "./store/store";
import Asta from "./components/Asta";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";

// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
const TopTabs = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Provider store={store}> */}
        {/* <NavigationContainer> */}
        <Tab.Navigator tabBarPosition="bottom">
          {/* <Tab.Screen
            name={"Drawer"}
            options={{
              title: () => <Ionicons name="menu" size={24} color="black" />,
            }}
            component={Home}
            listeners={({ navigation }) => ({
              tabPress: (e) => {
                e.preventDefault();
                navigation.openDrawer();
              },
              swipeStart: (e) => {
                navigation.openDrawer();
              },
            })}
          /> */}
          <Tab.Screen
            name="Squadre"
            component={Home}
            // options={{
            //   title: () => (
            //     <View
            //       style={{
            //         flexDirection: "row",
            //         justifyContent: "space-around",
            //       }}
            //     >
            //       <Ionicons name="menu" size={24} color="black" />
            //       <Text>{"Squadre"}</Text>
            //     </View>
            //   ),
            // }}
            // listeners={({ navigation }) => ({
            //   swipeEnd: (e) => {
            //     navigation.openDrawer();
            //   },
            // })}
          />
          <Tab.Screen name="Lista" component={ListTileTest} />
          <Tab.Screen name="Asta" component={Asta} />
        </Tab.Navigator>
        {/* </NavigationContainer> */}
        {/* </Provider> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TopTabs;
