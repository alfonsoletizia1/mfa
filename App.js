import "react-native-gesture-handler";
import React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "./components/Home";

import { Provider } from "react-redux";
import ListTileTest from "./components/ListTileTest";
import {
  TitilliumWeb_700Bold,
  useFonts,
} from "@expo-google-fonts/titillium-web";
// import { Monoton_400Regular, useFonts } from "@expo-google-fonts/monoton";
// import { PressStart2P_400Regular } from "@expo-google-fonts/press-start-2p";
// import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { store, persistor } from "./store/store";
import Asta from "./components/Asta";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "./components/Settings";
import TopTabs from "./TopTabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { PersistGate } from "redux-persist/integration/react";
import AppLoading from "expo-app-loading";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const App = () => {
  let [fontsLoaded] = useFonts({
    // Monoton_400Regular,
    // PressStart2P_400Regular,
    TitilliumWeb_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor={"#159cab"} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {fontsLoaded && (
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerStatusBarHeight: 0,
                    cardStyle: {
                      flex: 1,
                    },
                    headerTitleStyle: {
                      fontFamily: "TitilliumWeb_700Bold",
                      fontSize: 20,
                    },
                    headerStyle: {
                      backgroundColor: "#1ab6c7",
                      // maxHeight: ,
                      // // height: "",
                      // borderWidth: 1,
                      //ff9d00
                      // backgroundColor: "#0283d9",
                      // backgroundColor: "#1dc4a6",
                    },
                    headerTintColor: "black",
                  }}
                >
                  <Stack.Screen
                    options={{
                      headerTitleAlign: "center",
                      title: "Magic Fanta Asta",
                    }}
                    name="Home"
                    component={Home}
                  />
                  <Stack.Screen
                    options={{ title: "Nuova Asta" }}
                    name="New"
                    component={Settings}
                  />
                  <Stack.Screen
                    options={{ title: "Gestisci Asta" }}
                    name="TopTabs"
                    component={TopTabs}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            )}
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
