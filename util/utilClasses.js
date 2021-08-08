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

export function getInitialTeamsStatus(conf) {
  console.log("conf", conf);
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
  console.log("INITIAL STATUS ", initialStatus);
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
  assistFermo: "Asf",
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
