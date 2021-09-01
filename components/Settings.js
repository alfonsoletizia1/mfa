import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input } from "react-native-elements";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
// import { Button } from "react-native-elements";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { v4 as uuidv4 } from "uuid";
import { StackActions } from "@react-navigation/native";
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
const validateFirstStep = (nomeAsta, crediti, partecipanti) => {
  if (!(nomeAsta && crediti && partecipanti)) {
    return false;
  }
  if (crediti < 1) {
    return false;
  }
  if (partecipanti < 1) {
    return false;
  }
  return true;
};
const validateSecondStep = (teamsName, partecipants) => {
  if (Object.values(teamsName).length < partecipants) {
    return false;
  }
  for (var el of Object.values(teamsName)) {
    if (!el) {
      return false;
    }
  }

  return true;
};

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
    const popAction = StackActions.pop(1);

    navigation.dispatch(popAction);
    // navigation.dispatch(StackActions.replace("Home"));
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

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    // alert("Keyboard Shown");
    setShowButtons(true);
  };

  const _keyboardDidHide = () => {
    setShowButtons(false);
  };

  return (
    // <DismissKeyboard>
    <View style={styles.container}>
      <Text style={styles.title}> Manca poco, configura la tua asta!</Text>
      <View>{/* Numero Partecipanti */}</View>
      <ProgressSteps
        activeStep={activeStep}
        activeLabelColor={"#00b8cc"}
        completedStepIconColor={"#00b8cc"}
        activeStepIconBorderColor={"#00b8cc"}
        completedProgressBarColor={"#00b8cc"}
      >
        <ProgressStep
          label="Crediti"
          nextBtnText={"Avanti"}
          nextBtnDisabled={!validateFirstStep(nomeAsta, crediti, partecipants)}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Input
              containerStyle={styles.input}
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
              containerStyle={styles.input}
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
              containerStyle={styles.input}
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
          nextBtnDisabled={!validateSecondStep(teamsName, partecipants)}
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
                  label={
                    index > 0
                      ? "Nome Squadra " + (index + 1) + ":"
                      : "Nome della TUA squadra:"
                  }
                  labelStyle={{
                    color: index > 0 ? "gray" : "red",
                  }}
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
  input: {
    // flex: 1,
    // // padding: 5,
    // // borderRadius: 15,
    // // marginTop: 2,
    // // borderWidth: 1,
    // // minWidth: 150,
    // marginTop: 1,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.45,
    // shadowRadius: 3,
    // elevation: 4,
    // // margin: 12,
    // backgroundColor: "white",
    // // borderRadius: 20,
    // // padding: 27,
  },
});
