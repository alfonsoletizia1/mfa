import "react-native-gesture-handler";
import React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "./components/Home";

import { Provider } from "react-redux";
import ListTileTest from "./components/ListTileTest";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { store, persistor } from "./store/store";
import Asta from "./components/Asta";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "./components/Settings";
import TopTabs from "./TopTabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { PersistGate } from "redux-persist/integration/react";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="New" component={Settings} />
                <Drawer.Screen name="TopTabs" component={TopTabs} />
              </Drawer.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
