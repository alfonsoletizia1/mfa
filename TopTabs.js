import "react-native-gesture-handler";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Teams from "./components/Teams";
import ListTileTest from "./components/ListTileTest";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Asta from "./components/Asta";
import {
  TitilliumWeb_700Bold,
  useFonts,
} from "@expo-google-fonts/titillium-web";
import AppLoading from "expo-app-loading";

const Tab = createMaterialTopTabNavigator();
const TopTabs = () => {
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
        <Tab.Navigator
          tabBarPosition="bottom"
          screenOptions={{
            // tabBarActiveTintColor: "#008896",
            tabBarStyle: {
              // backgroundColor: "#f2fcfc",
            },
            tabBarLabelStyle: {
              fontFamily: "TitilliumWeb_700Bold",
            },
          }}
        >
          <Tab.Screen name="Squadre" component={Teams} />
          <Tab.Screen name="Lista" component={ListTileTest} />
          <Tab.Screen name="Asta" component={Asta} />
        </Tab.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TopTabs;
