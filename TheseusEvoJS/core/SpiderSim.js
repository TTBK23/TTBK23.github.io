class SpiderSim {
  constructor() {
    this.spiderPop = [];
    this.popSize = 6;
  }

  InitPopulation() {
  	for (let i=0; i<popSize; i++){
  		spiderPop.push(new Spider());
  	}
  }

  DoWebBuilding(anIndex) {
  	(this.spiderPop[anIndex]).buildWholeWeb();
  }
  
}
