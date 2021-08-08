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

const Tab = createMaterialTopTabNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ marginTop: StatusBar.currentHeight }}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Squadre" component={Home} />
            <Tab.Screen name="Lista" component={ListTileTest} />
            <Tab.Screen name="Asta" component={Asta} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
