import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { getInitialTeamsStatus, conf } from "../util/utilClasses";
import stats from "../assets/lista2021.json";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    actualConfiguration: "",
    configurations: {},
    //teamStatus: getInitialTeamsStatus(conf),
    // teamStatus:{},
    // teams: [],
  },
  reducers: {
    SET_SAMPLE: (state, action) => {
      state.configurations[state.actualConfiguration].sample =
        action.payload.sample;
    },
    REMOVE_PLAYER: (state, action) => {
      _.remove(
        state.configurations[state.actualConfiguration].players,
        (el) => el.Id == action.payload.id
      );
      // state.configurations[state.actualConfiguration].players.push(action.payload.player);
    },
    ADD_PLAYER: (state, action) => {
      state.configurations[state.actualConfiguration].players.push(
        ...action.payload.players
      );
    },
    UNSHIFT_PASSED_IDS: (state, action) => {
      state.configurations[state.actualConfiguration].passedIds.unshift(
        action.payload.sample
      );
    },
    RESET_PASSED_IDS: (state, action) => {
      state.configurations[state.actualConfiguration].passedIds = [];
    },
    SET_ACTUAL_CONFIGURATION: (state, action) => {
      // console.log("SET_ACTUAL_CONFIGURATION ACTION ", action);

      state.actualConfiguration = action.payload.key;
    },
    REMOVE_CONFIGURATION: (state, action) => {
      delete state.configurations[action.payload.id];
    },
    ADD_CONFIGURATION: (state, action) => {
      // console.log("ADD_CONFIGURATION ACTION ", action);
      // console.log("ADD_CONFIGURATION state ", state);

      state.configurations[action.payload.id] = {
        teamStatus: action.payload.config,
        teams: [],
        generalConfig: action.payload.generalConfig,
        players: [...stats], //TODO -> REMOVE THIS
        passedIds: [],
        sample: {
          Id: 99999,
          R: "A",
          Nome: "Seleziona in alto il ruolo che vuoi estrarre",
          Squadra: "Poi clicca estrai per iniziare!",
          Pg: 0,
          Mv: 0,
          Mf: 0,
          Gf: 0,
          Gs: 0,
          Ass: 0,
          Asf: 0,
          Amm: 0,
          Esp: 0,
          Au: 0,
          disableAssign: true,
        },
      };
      // console.log("Stato iniziale", state);
    },
    ASSIGN_TEAM_PLAYER: (state, action) => {
      // console.log("ACTION", action);
      // console.log("STATE", state);
      // console.log(state.configurations[state.actualConfiguration]);
      state.configurations[state.actualConfiguration].teamStatus[
        action.payload.teamId
      ].creditiDisponibili -= action.payload.value;
      state.configurations[state.actualConfiguration].teamStatus[
        action.payload.teamId
      ][action.payload.R] =
        Number(
          state.configurations[state.actualConfiguration].teamStatus[
            action.payload.teamId
          ][action.payload.R]
        ) - 1;

      state.configurations[state.actualConfiguration].teams.push(
        action.payload
      );
      // console.log(
      //   "teamStatus",
      //   state.configurations[state.actualConfiguration].teamStatus
      // );
    },
    UPDATE_TEAM_PLAYER: (state, action) => {
      // console.log("ACTION", action);
      // console.log("STATE", state);

      state.configurations[state.actualConfiguration].teamStatus[
        action.payload.teamId
      ].creditiDisponibili =
        Number(
          state.configurations[state.actualConfiguration].teamStatus[
            action.payload.teamId
          ].creditiDisponibili
        ) +
        Number(action.payload.oldValue) -
        Number(action.payload.value);
      // console.log(
      //   "teams",
      //   state.configurations[state.actualConfiguration].teams
      // );
      var index = state.configurations[
        state.actualConfiguration
      ].teams.findIndex((el) => el.Id === action.payload.id);
      // console.log("index", index);
      state.configurations[state.actualConfiguration].teams[index].value =
        Number(action.payload.value);
    },
    REMOVE_TEAM_PLAYER: (state, action) => {
      // console.log("ACTION", action);
      // console.log("STATE", state);

      state.configurations[state.actualConfiguration].teamStatus[
        action.payload.teamId
      ].creditiDisponibili += Number(action.payload.value);
      state.configurations[state.actualConfiguration].teamStatus[
        action.payload.teamId
      ][action.payload.R] += 1;
      // Number(
      //   state.configurations[state.actualConfiguration].teamStatus[
      //     action.payload.teamId
      //   ][action.payload.R]
      // ) + 1;
      var index = state.configurations[
        state.actualConfiguration
      ].teams.findIndex((el) => el.Id === action.payload.id);
      state.configurations[state.actualConfiguration].teams[index].value =
        Number(action.payload.value);
      if (index > -1) {
        state.configurations[state.actualConfiguration].teams.splice(index, 1);
      }
      // console.log("STATE", state);
    },
  },
});
export const {
  REMOVE_CONFIGURATION,
  UNSHIFT_PASSED_IDS,
  REMOVE_PLAYER,
  ASSIGN_TEAM_PLAYER,
  REMOVE_TEAM_PLAYER,
  UPDATE_TEAM_PLAYER,
  ADD_CONFIGURATION,
  SET_ACTUAL_CONFIGURATION,
  ADD_PLAYER,
  RESET_PASSED_IDS,
  SET_SAMPLE,
} = teamSlice.actions;
export default teamSlice.reducer;
