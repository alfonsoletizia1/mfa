import { createSlice } from "@reduxjs/toolkit";

import { Teams } from "../util/utilClasses";
const conf = {
  numeroDiPartecipanti: 6,
  creditiIniziali: 500,
};

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: {
      teams: [
        {
          //   id: 0,
          P: [],
          D: [],
          C: [],
          A: [],
        },
        {
          //   id: 1,

          P: [],
          D: [],
          C: [],
          A: [],
        },
        {
          //   id: 2,

          P: [],
          D: [],
          C: [],
          A: [],
        },
        {
          //   id: 3,

          P: [],
          D: [],
          C: [],
          A: [],
        },
        {
          //   id: 4,

          P: [],
          D: [],
          C: [],
          A: [],
        },
        {
          //   id: 5,

          P: [],
          D: [],
          C: [],
          A: [],
        },
      ],
    },
  },
  reducers: {
    ASSIGN_TEAM_PLAYER: (state, action) => {
      console.log("ACTION", action);
      console.log("ruolo", action.payload.role);
      switch (action.payload.role) {
        case "P":
          state.teams.teams[action.payload.teamId].P.push({
            name: action.payload.name,
            value: action.payload.value,
            id: action.payload.id,
          });

          break;
        case "D":
          state.teams.teams[action.payload.teamId].D.push({
            name: action.payload.name,
            value: action.payload.value,
            id: action.payload.id,
          });

          break;
        case "C":
          state.teams.teams[action.payload.teamId].C.push({
            name: action.payload.name,
            value: action.payload.value,
            id: action.payload.id,
          });
          console.log("team", state.teams.teams[action.payload.teamId]);

          break;
        case "A":
          state.teams.teams[action.payload.teamId].A.push({
            name: action.payload.name,
            value: action.payload.value,
            id: action.payload.id,
          });
          break;
        default:
          break;
      }
    },
  },
});
export const { ASSIGN_TEAM_PLAYER } = teamSlice.actions;
export default teamSlice.reducer;
