import React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "./components/Home";

import { Provider } from "react-redux";
import ListTileTest from "./components/ListTileTest";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { store } from "./store/store";

const Tab = createMaterialTopTabNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ marginTop: StatusBar.currentHeight }}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="List" component={ListTileTest} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
