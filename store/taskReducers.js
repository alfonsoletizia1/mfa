import { createReducer } from "@reduxjs/toolkit";
import { Teams } from "../util/utilClasses";
import { ASSIGN_TEAM_PLAYER, REMOVE_TEAM_PLAYER } from "./taskType";

const conf = {
  numeroDiPartecipanti: 6,
  creditiIniziali: 500,
};

var initialTeams = [];

const initialState = {
  teams: new Teams(conf.numeroDiPartecipanti),
};
const taskReducer = createReducer(initialState, {
  ASSIGN_TEAM_PLAYER: (state, action) => {
    console.log("ruolo", action.payload.role);
    switch (action.payload.role) {
      case "P":
        state.teams.teams[action.payload.id].addP(action.payload.player);

        break;
      case "D":
        state.teams.teams[action.payload.id].addD(action.payload.player);

        break;
      case "C":
        state.teams.teams[action.payload.id].addC(action.payload.player);
        console.log("team", state.teams.teams[action.payload.id]);

        break;
      case "A":
        state.teams.teams[action.payload.id].addA(action.payload.player);
        break;
      default:
        break;
    }
    return state;
  },
});
// const taskReducer = (state = initialState, action) => {
//   console.log("state", state);
//   console.log("action", action);
//   console.log("teams", state.teams);
//   switch (action.type) {
//     case ASSIGN_TEAM_PLAYER:
//       console.log("ruolo", action.payload.role);
//       var newState = Object.assign({}, state);
//       switch (action.payload.role) {
//         case "P":
//           newState.teams.teams[action.payload.id].P = [
//             ...newState.teams.teams[action.payload.id].P,
//             action.payload.player,
//           ]; //.addP(action.payload.player);

//           break;
//         case "D":
//           newState.teams.teams[actSion.payload.id].addD(action.payload.player);

//           break;
//         case "C":
//           console.log("team", newState.teams.teams[action.payload.id]);
//           newState.teams.teams[action.payload.id].addC(action.payload.player);

//           break;
//         case "A":
//           newState.teams.teams[action.payload.id].addA(action.payload.player);
//           break;
//         default:
//           break;
//       }
//       console.log("newState === state", newState == state);
//       return { ...state, ...newState };
//     // case REMOVE_TEAM_PLAYER:
//     //   return {
//     //     ...state,
//     //     tasks: state.tasks.filter((item) => item.id != action.payload),
//     //   };

//     default:
//       return state;
//   }
// };
export default taskReducer;
