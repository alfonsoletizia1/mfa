import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-elements";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { v4 as uuidv4 } from "uuid";
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const storeData = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};
const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
  }
  console.log(keys); // example console.log result:  // ['@MyApp_user', '@MyApp_key']
  let values;
  try {
    values = await AsyncStorage.multiGet(keys);
  } catch (e) {
    // read error
  }
  console.log(values);
};

const Settings = ({ navigation }) => {
  const [partecipants, setPartecipants] = useState(null);
  const [crediti, setCrediti] = useState(null);
  const [showButtons, setShowButtons] = useState(false);

  const [teamsName, setTeamsName] = useState({});
  const [textField, setTextField] = useState({});
  return (
    // <DismissKeyboard>
    <View style={styles.container}>
      <Text style={styles.title}> Iniziamo!</Text>
      <View>{/* Numero Partecipanti */}</View>
      <ProgressSteps>
        <ProgressStep label="Crediti" nextBtnText={"Avanti"}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Input
              disabledInputStyle={{ background: "#ddd" }}
              //   errorMessage="Oops! that's not correct."
              label="Numero di partecipanti:"
              leftIcon={
                <MaterialCommunityIcons name="account-outline" size={20} />
              }
              rightIcon={<MaterialCommunityIcons name="close" size={20} />}
              placeholder="8"
              keyboardType="numeric"
              value={partecipants}
              onChangeText={(text) => setPartecipants(text)}
            />
            {/* Crediti iniziali */}
            <Input
              //   disabledInputStyle={{ background: "#ddd" }}
              //   errorMessage="Oops! that's not correct."
              label="Crediti Iniziali"
              leftIcon={
                <MaterialIcons name="attach-money" size={20} color="black" />
              }
              rightIcon={<MaterialCommunityIcons name="close" size={20} />}
              placeholder="500"
              keyboardType="numeric"
              value={crediti}
              onChangeText={(text) => setCrediti(text)}
            />
          </View>
        </ProgressStep>
        <ProgressStep
          label="Partecipanti"
          removeBtnRow={showButtons}
          nextBtnText={"Avanti"}
          previousBtnText={"Indietro"}
        >
          <View style={{ alignItems: "center" }}>
            {Array.apply(null, Array(Number(partecipants))).map((el, index) => {
              return (
                <Input
                  onFocus={() => setShowButtons(true)}
                  onBlur={() => setShowButtons(false)}
                  onSubmitEditing={() => {
                    if (index < partecipants - 1) {
                      textField[index + 1].focus();
                    } else {
                      Keyboard.dismiss();
                      //   setShowButtons(false);
                    }
                  }}
                  ref={(input) => {
                    textField[index] = input;
                  }}
                  key={index}
                  //   disabledInputStyle={{ background: "#ddd" }}
                  //   errorMessage="Oops! that's not correct."
                  label={"Nome Squadra " + (index + 1) + ":"}
                  leftIcon={
                    <MaterialCommunityIcons name="account-outline" size={20} />
                  }
                  rightIcon={<MaterialCommunityIcons name="close" size={20} />}
                  placeholder=""
                  value={teamsName[index]}
                  onChangeText={(text) => {
                    teamsName[index] = text;
                    console.log(teamsName);
                    setTeamsName({ ...teamsName, index: text });
                    console.log(teamsName);
                  }}
                />
              );
            })}
          </View>
        </ProgressStep>
        <ProgressStep
          previousBtnText={"Indietro"}
          finishBtnText={"Inizia!"}
          label="Squadre"
          onSubmit={() =>
            storeData(
              {
                teamName: teamsName,
                crediti: crediti,
                partecipants: partecipants,
              },
              uuidv4()
            )
          }
        >
          <View style={{ alignItems: "center" }}>
            <Button
              onPress={() => {
                //getAllKeys();
                navigation.navigate("TopTabs");
              }}
              title="REcupera chiavi"
            />
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
    // </DismissKeyboard>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
