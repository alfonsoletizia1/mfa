import { createSlice } from "@reduxjs/toolkit";

import { getInitialTeamsStatus } from "../util/utilClasses";
const conf = {
  ids: ["id"],
  numeroDiPartecipanti: 6,
  creditiIniziali: 500,
  numPortieri: 3,
  numDifensori: 8,
  numCentrocampisti: 8,
  numAttaccanti: 6,
};

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teamStatus: getInitialTeamsStatus(conf.ids, conf),
    teams: [],
  },
  reducers: {
    ASSIGN_TEAM_PLAYER: (state, action) => {
      console.log("ACTION", action);
      state.teams.push(action.payload);
    },
  },
});
export const { ASSIGN_TEAM_PLAYER } = teamSlice.actions;
export default teamSlice.reducer;
