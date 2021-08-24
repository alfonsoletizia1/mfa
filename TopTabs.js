import "react-native-gesture-handler";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Teams from "./components/Teams";
import ListTileTest from "./components/ListTileTest";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Asta from "./components/Asta";

const Tab = createMaterialTopTabNavigator();
const TopTabs = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator tabBarPosition="bottom">
          <Tab.Screen name="Squadre" component={Teams} />
          <Tab.Screen name="Lista" component={ListTileTest} />
          <Tab.Screen name="Asta" component={Asta} />
        </Tab.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TopTabs;
