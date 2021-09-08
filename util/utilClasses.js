export class Player {
  constructor() {
    this.name = "";
    this.value = 0;
  }
}
export class Team {
  constructor() {
    this.P = [];
    this.D = [];
    this.C = [];
    this.A = [];
  }
  getTotalValueForRole(arr) {
    arr.forEach((el) => {
      sum += el.value;
    });
    return sum;
  }
  addP({ name, value }) {
    if (this.P.length < 3) {
      this.P.push({ name, value });
      return true;
    }
    return false;
  }
  addD(dif) {
    if (this.D.length < 8) {
      this.D.push(dif);
      return true;
    }
    return false;
  }
  addC(cen) {
    if (this.C.length < 8) {
      this.C.push(cen);
      return true;
    }
    return false;
  }
  addA(att) {
    if (this.A.length < 6) {
      this.A.push(att);
      return true;
    }
    return false;
  }
}

export class Teams {
  constructor(numOfPartecipants = 6) {
    this.teams = [];
    for (var i = 0; i < numOfPartecipants; i++) {
      this.teams.push(new Team());
    }
  }
}
// {
//   "crediti": "500",
//   "partecipants": "8",
//   "teamName": Object {
//     "0": "1",
//     "1": "2",
//     "2": "3",
//     "3": "4",
//     "4": "5",
//     "5": "6",
//     "6": "7",
//     "7": "8",
//   },
// }
export function getStatusForSettingsFromReduxState(config) {
  // console.log("getStatusForSettingsFromReduxState", config);
  var ids = Object.keys(config.teamStatus);
  var out = {};
  var teamName = {};
  ids.forEach((id) => {
    teamName[id] = config.teamStatus[id].name;
  });
  return {
    teamName: teamName,
    crediti: config.generalConfig.creditiIniziali,
    portieri: config.generalConfig.numPortieri,
    difensori: config.generalConfig.numDifensori,
    centrocampisti: config.generalConfig.numCentrocampisti,
    attaccanti: config.generalConfig.numAttaccanti,
    partecipants: ids.length,
    nomeAsta: config.generalConfig.name,
  };
}
export function getInitialStatus(conf) {
  // console.log("conf", conf);
  var ids = Object.keys(conf.teamName);
  var initialStatus = {};
  ids.forEach((id) => {
    initialStatus[id] = {
      name: conf.teamName[id],
      id: id,
      P: 3, //conf.numPortieri,
      D: 8, //conf.numDifensori,
      C: 8, //conf.numCentrocampisti,
      A: 6, //conf.numAttaccanti,
      creditiDisponibili: conf.crediti,
    };
  });
  // console.log("INITIAL STATUS ", initialStatus);
  return initialStatus;
}
export function getInitialTeamsStatus(conf) {
  // console.log("conf", conf);
  var initialStatus = {};
  conf.partecipants.forEach((el) => {
    initialStatus[el.id] = {
      name: el.name,
      id: el.id,
      P: conf.numPortieri,
      D: conf.numDifensori,
      C: conf.numCentrocampisti,
      A: conf.numAttaccanti,
      creditiDisponibili: conf.creditiIniziali,
    };
  });
  // console.log("INITIAL STATUS ", initialStatus);
  return initialStatus;
}
export const statsFields = {
  id: "Id",
  role: "R",
  name: "Nome",
  team: "Squadra",
  pg: "Pg",
  mv: "Mv",
  mf: "Mf",
  gf: "Gf",
  gs: "Gs",
  assist: "Ass",
  // assistFermo: "Asf",
  amm: "Amm",
  esp: "Esp",
  autogol: "Au",
};
export const conf = {
  partecipanti: { ids: ["1"], nomi: ["Squadra 1"] },
  partecipants: [
    { id: "1", name: "Squadra 1" },
    { id: "2", name: "Squadra 2" },
    { id: "3", name: "Squadra 3" },
    { id: "4", name: "Squadra 4" },
    { id: "5", name: "Squadra 5" },
    { id: "6", name: "Squadra 6" },
    { id: "7", name: "Squadra 7" },
    { id: "8", name: "Squadra 8" },
  ],
  num: { P: 3, D: 8, C: 8, A: 6 },
  numeroDiPartecipanti: 6,
  creditiIniziali: 500,
  numPortieri: 3,
  numDifensori: 8,
  numCentrocampisti: 8,
  numAttaccanti: 6,
};
export const iconsConf = {
  P: {
    name: "alpha-p-circle-outline",
    color: "orange",
  },
  D: {
    name: "alpha-d-circle-outline",
    color: "green",
  },
  C: {
    name: "alpha-c-circle-outline",
    color: "blue",
  },
  A: {
    name: "alpha-a-circle-outline",
    color: "red",
  },
};

export function switchOrderType(actualOrder) {
  if (actualOrder === "asc") {
    return "desc";
  } else {
    return "asc";
  }
}
