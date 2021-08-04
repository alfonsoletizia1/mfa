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
      console.log("ACTION", action);
      console.log("STATE", state);

      state.teamStatus[action.payload.teamId].creditiDisponibili -=
        action.payload.value;
      state.teamStatus[action.payload.teamId][action.payload.R] -= 1;

      state.teams.push(action.payload);
    },
  },
});
export const { ASSIGN_TEAM_PLAYER } = teamSlice.actions;
export default teamSlice.reducer;
