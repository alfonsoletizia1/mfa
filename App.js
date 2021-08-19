import "react-native-gesture-handler";
import React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "./components/Home";

import { Provider } from "react-redux";
import ListTileTest from "./components/ListTileTest";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { store } from "./store/store";
import Asta from "./components/Asta";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "./components/Settings";
import TopTabs from "./TopTabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <NavigationContainer>
            <Drawer.Navigator>
              <Drawer.Screen name="Settings" component={Settings} />
              <Drawer.Screen name="TopTabs" component={TopTabs} />
            </Drawer.Navigator>
            {/* <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="TopTabs" component={TopTabs} /> */}
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
