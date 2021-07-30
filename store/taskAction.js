import { ASSIGN_TEAM_PLAYER, REMOVE_TEAM_PLAYER } from "./taskType";

export const assignTeamPlayer = (player, teamId, role) => ({
  type: ASSIGN_TEAM_PLAYER,
  payload: {
    player: player,
    role: role,
    id: teamId,
  },
  key: Date.now(),
  id: Date.now(),
});

export const removeTeamPlayer = (id) => ({
  type: REMOVE_TEAM_PLAYER,
  payload: id,
});
