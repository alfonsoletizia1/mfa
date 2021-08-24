import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-elements";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { v4 as uuidv4 } from "uuid";
import {
  getInitialStatus,
  getStatusForSettingsFromReduxState,
} from "../util/utilClasses";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_CONFIGURATION,
  SET_ACTUAL_CONFIGURATION,
} from "../store/stateSlicer";

// const DismissKeyboard = ({ children }) => (
//   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//     {children}
//   </TouchableWithoutFeedback>
// );

// const getAllKeys = async () => {
//   let keys = [];
//   try {
//     keys = await AsyncStorage.getAllKeys();
//   } catch (e) {
//     // read key error
//   }
//   console.log(keys);
//   let values;
//   try {
//     values = await AsyncStorage.multiGet(keys);
//   } catch (e) {
//     // read error
//   }
//   console.log(values);
// };

const Settings = ({ route, navigation }) => {
  const { configurations, key } = route.params;
  // console.log("PROPS", configurations);
  const dispatch = useDispatch();
  //const configurations = useSelector((state) => state.teams);

  // const configurations = {
  //   "4c298f61-8ebb-437e-90af-26f48db0c278": {
  //     generalConfig: {
  //       creditiIniziali: 500,
  //       numAttaccanti: 6,
  //       numCentrocampisti: 8,
  //       numDifensori: 8,
  //       numPortieri: 3,
  //     },
  //     teamStatus: {
  //       0: {
  //         A: 6,
  //         C: 8,
  //         D: 8,
  //         P: 3,
  //         creditiDisponibili: "500",
  //         id: "0",
  //         name: "Test",
  //       },
  //     },
  //     teams: [],
  //   },
  // };

  //console.log("configurations", configurations);

  const storeData = (value, key) => {
    var conf = getInitialStatus(value);
    // console.log(conf);
    dispatch(
      ADD_CONFIGURATION({
        config: conf,
        id: key,
        generalConfig: {
          name: nomeAsta,
          creditiIniziali: Number(crediti),
          numPortieri: Number(portieri),
          numDifensori: Number(difensori),
          numCentrocampisti: Number(centrocampisti),
          numAttaccanti: Number(attaccanti),
        },
      })
    );
    dispatch(
      SET_ACTUAL_CONFIGURATION({
        key: key,
      })
    );
  };
  const [partecipants, setPartecipants] = useState(null);
  const [crediti, setCrediti] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [teamsName, setTeamsName] = useState({});
  const [textField, setTextField] = useState({});
  const [nomeAsta, setNomeAsta] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  // const [firstStepError, setFirstStepError] = useState(false);

  const [portieri, setPortieri] = useState("3");
  const [difensori, setDifensori] = useState("8");
  const [centrocampisti, setCentrocampisti] = useState("8");
  const [attaccanti, setAttaccanti] = useState("6");

  useEffect(() => {
    // console.log("configurations in useEffect", configurations);
    if (configurations) {
      var conf = getStatusForSettingsFromReduxState(configurations[key]);
      // console.log("useEffect", conf);
      setPortieri(String(conf.portieri));
      setDifensori(String(conf.difensori));
      setCentrocampisti(String(conf.centrocampisti));
      setAttaccanti(String(conf.attaccanti));
      setTeamsName(conf.teamName);
      setCrediti(String(conf.crediti));
      setPartecipants(String(conf.partecipants));
      setNomeAsta(conf.nomeAsta);
    } else {
      setPortieri("3");
      setDifensori("8");
      setCentrocampisti("8");
      setAttaccanti("6");
      setTeamsName({});
      setCrediti(null);
      setPartecipants(null);
      setNomeAsta(null);
      setActiveStep(0);
    }
  }, [key]);
  return (
    // <DismissKeyboard>
    <View style={styles.container}>
      <Text style={styles.title}> Iniziamo!</Text>
      <View>{/* Numero Partecipanti */}</View>
      <ProgressSteps activeStep={activeStep}>
        <ProgressStep label="Crediti" nextBtnText={"Avanti"}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Input
              disabledInputStyle={{ background: "#ddd" }}
              //   errorMessage="Oops! that's not correct."
              label="Scegli un nome per la tua asta:"
              leftIcon={<MaterialCommunityIcons name="rename-box" size={20} />}
              rightIcon={<MaterialCommunityIcons name="close" size={20} />}
              placeholder="Asta 1"
              value={nomeAsta}
              onChangeText={(text) => setNomeAsta(text)}
            />
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
                    // console.log(teamsName);
                    setTeamsName({ ...teamsName });
                    // console.log(teamsName);
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
          onSubmit={() => {
            storeData(
              {
                teamName: teamsName,
                crediti: crediti,
                partecipants: partecipants,
              },
              uuidv4()
            );
            navigation.navigate("TopTabs");
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Input
              label="Numero di Portieri"
              leftIcon={
                <MaterialCommunityIcons
                  name="elevator-passenger"
                  size={20}
                  color="black"
                />
              }
              rightIcon={<MaterialCommunityIcons name="close" size={20} />}
              placeholder="3"
              keyboardType="numeric"
              value={portieri}
              onChangeText={(text) => setPortieri(text)}
            />
            <Input
              label="Numero di Difensori"
              leftIcon={
                <MaterialCommunityIcons
                  name="elevator-passenger"
                  size={20}
                  color="black"
                />
              }
              rightIcon={<MaterialCommunityIcons name="close" size={20} />}
              placeholder="8"
              keyboardType="numeric"
              value={difensori}
              onChangeText={(text) => setDifensori(text)}
            />
            <Input
              label="Numero di Centrocampisti"
              leftIcon={
                <MaterialCommunityIcons
                  name="elevator-passenger"
                  size={20}
                  color="black"
                />
              }
              rightIcon={<MaterialCommunityIcons name="close" size={20} />}
              placeholder="8"
              keyboardType="numeric"
              value={centrocampisti}
              onChangeText={(text) => setCentrocampisti(text)}
            />
            <Input
              label="Numero di Attaccanti"
              leftIcon={
                <MaterialCommunityIcons
                  name="elevator-passenger"
                  size={20}
                  color="black"
                />
              }
              rightIcon={<MaterialCommunityIcons name="close" size={20} />}
              placeholder="6"
              keyboardType="numeric"
              value={attaccanti}
              onChangeText={(text) => setAttaccanti(text)}
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
