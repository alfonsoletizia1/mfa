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

export function getInitialTeamsStatus(ids, conf) {
  var initialStatus = {};
  ids.forEach((el) => {
    initialStatus[el] = {
      postiDisponibiliP: conf.numPortieri,
      postiDisponibiliD: conf.numDifensori,
      postiDisponibiliC: conf.numCentrocampisti,
      postiDisponibiliA: conf.numAttaccanti,
      creditiDisponibili: conf.creditiIniziali,
    };
  });
}
