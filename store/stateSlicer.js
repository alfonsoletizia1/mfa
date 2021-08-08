import { createSlice } from "@reduxjs/toolkit";

import { getInitialTeamsStatus, conf } from "../util/utilClasses";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teamStatus: getInitialTeamsStatus(conf),
    teams: [],
  },
  reducers: {
    ASSIGN_TEAM_PLAYER: (state, action) => {
      // console.log("ACTION", action);
      // console.log("STATE", state);

      state.teamStatus[action.payload.teamId].creditiDisponibili -=
        action.payload.value;
      state.teamStatus[action.payload.teamId][action.payload.R] =
        Number(state.teamStatus[action.payload.teamId][action.payload.R]) - 1;

      state.teams.push(action.payload);
      console.log("teamStatus", state.teamStatus);
    },
    UPDATE_TEAM_PLAYER: (state, action) => {
      // console.log("ACTION", action);
      // console.log("STATE", state);

      state.teamStatus[action.payload.teamId].creditiDisponibili =
        Number(state.teamStatus[action.payload.teamId].creditiDisponibili) +
        Number(action.payload.oldValue) -
        Number(action.payload.value);
      console.log("teams", state.teams);
      var index = state.teams.findIndex((el) => el.Id === action.payload.id);
      console.log("index", index);
      state.teams[index].value = Number(action.payload.value);
    },
    REMOVE_TEAM_PLAYER: (state, action) => {
      // console.log("ACTION", action);
      // console.log("STATE", state);

      state.teamStatus[action.payload.teamId].creditiDisponibili += Number(
        action.payload.value
      );
      state.teamStatus[action.payload.teamId][action.payload.R] =
        Number(state.teamStatus[action.payload.teamId][action.payload.R]) + 1;
      var index = state.teams.findIndex((el) => el.Id === action.payload.id);
      state.teams[index].value = Number(action.payload.value);
      if (index > -1) {
        state.teams.splice(index, 1);
      }
    },
  },
});
export const { ASSIGN_TEAM_PLAYER, REMOVE_TEAM_PLAYER, UPDATE_TEAM_PLAYER } =
  teamSlice.actions;
export default teamSlice.reducer;
