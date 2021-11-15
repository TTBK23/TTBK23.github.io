class Spider {

  constructor() {
//    this.genes[NUM_GENES];

    this.stage = WS.Start;
    this.initDefaultGenes();
    this.web = new Web();
    this.numPreyCaught = 0;
  	this.curRadiusID = -1;
  	this.curDistToCentre = -1;
    this.capSpiralDir = 1;
    this.startAddRadiiAngle = 0;

    // cap spiral
    this.sumAngleDiff = 0;
    this.lastx = 0.0;
    this.lasty = 0.0;
    this.lastCapSpiralRadiiId = 0;
    this.lastDistToInnerTurn = 0;


//    static int geneBounds[NUM_GENES][2];
    this.attachX =0; this.attachY = 0;

    this.numGenes = 19;
    this.inheritanceCode ="I";
  	this.inheritanceCrossover = 0;
  	this.parentId1 = -1;
    this.parentId2 = -1;
    this.fitness =  0;
    this.silkCost = 0.0;
    this.silkLimit = -1;
    this.timePenalty = 0.0;

  }

  initDefaultGenes() {
    this.genes = [];
    // FirstRadiiAndFrame
  	this.genes[ 0] = 10; // numStartRadii
  	this.genes[ 1] = 0;  // variability
  	this.genes[ 2] = 5;  // phase
  	this.genes[ 3] = 50; // rMaxLenRight
  	this.genes[ 4] = 90; // rMaxLenTop
  	this.genes[ 5] = 50; // rMaxLenLeft
  	this.genes[ 6] = 90; // rMaxLenBottom
  	this.genes[ 7] = 2;  // interpolation function ID
  	this.genes[ 8] = 2;  // interpolation function parameter
  	// AdditionalRadii
  	this.genes[ 9] = 10; // rNextRadiiAngleRight
  	this.genes[10] = 10; // rNextRadiiAngleTop
  	this.genes[11] = 10; // rNextRadiiAngleLeft
  	this.genes[12] = 10; // rNextRadiiAngleBottom
  	this.genes[13] = 2;  // interpolation function ID
  	this.genes[14] = 2;  // interpolation function parameter
  	this.genes[15] = 2;  // minimal interradii space factor before termination
  	// FirstCapSpiralLoop
  	this.genes[16] = 2;  // spiral distance at start
  	this.genes[17] = 6;  // spiral distance at the end of the first loop
  	// MainCapSpiral
  	this.genes[18] = 100; // growth % factor for the distance to the centre
  }

  initWebBuilding() {
  	this.stage = WS.Start;
  	this.capSpiralDir  = 1;
  	// srand(1000);
  }

  buildWholeWeb() {
  	this.initWebBuilding();
  	if (this.stage==WS.Start) this.stage = WS.FirstRadii;
  	while (this.stage==WS.FirstRadii) this.buildFirstRadiiAndFrame();
  	while (this.stage==WS.AddRadii) this.buildAdditionalRadii();
  	while (this.stage==WS.FirstCapSpiralLoop) this.buildFirstCapSpiralLoop();
  	while (this.stage==WS.MainCapSpiral) this.buildMainCapSpiral();
  }

  buildWebStage(targetStage) {
  	this.initWebBuilding();
  	if (this.stage==WS.Start) this.stage = WS.FirstRadii;
  	while (sthis.tage==WS.FirstRadii) this.buildFirstRadiiAndFrame();
  	if (this.stage==targetStage+1) return;
  	while (this.stage==WS.AddRadii) this.buildAdditionalRadii();
  	if (this.stage==targetStage+1) return;
  	while (this.stage==WS.FirstCapSpiralLoop) this.buildFirstCapSpiralLoop();
  	if (this.stage==targetStage+1) return;
  	while (this.stage==WS.MainCapSpiral) this.buildMainCapSpiral();
  }

  handleWebBuilding() {
  	if (this.stage==WS.Start) this.stage = WS.FirstRadii;
  	if (this.stage==WS.FirstRadii) this.buildFirstRadiiAndFrame();
  	if (this.stage==WS.AddRadii) this.buildAdditionalRadii();
  	if (this.stage==WS.FirstCapSpiralLoop) this.buildFirstCapSpiralLoop();
  	if (this.stage==WS.MainCapSpiral) this.buildMainCapSpiral();
  }

  removeWeb() {
  	this.stage = WS.Start;
  	this.curRadiusID		= -1;
  	this.curDistToCentre = -1;
  	// web.Dispose();
  }

  startOfQuadrant(anAngle) {
  	if (anAngle<halfPi)    return(0.0);
  	if (anAngle<pi)        return(halfPi);
  	if (anAngle<pi+halfPi) return(pi);
  	return pi+halfPi;
  }

  endOfQuadrant(anAngle) {
  	if (anAngle>=pi+halfPi) return(twoPi);
  	if (anAngle>=pi)        return(pi+halfPi);
  	if (anAngle>=halfPi)    return(pi);
  	return halfPi;
  }

  quadrantID(anAngle) {
  	if (anAngle<halfPi)    return(1);
  	if (anAngle<pi)        return(2);
  	if (anAngle<pi+halfPi) return(3);
  	return(4);
  }

  interpolateQuadValues (anAngle, quadStartVal, quadEndVal) {
  	let soq_angle = this.startOfQuadrant(anAngle);
  	let eoq_angle = this.endOfQuadrant(anAngle);

  	let relQuadAngle   = anAngle - soq_angle;
  	let quadAngleRange = eoq_angle - soq_angle;

  	return quadStartVal + (quadEndVal - quadStartVal) * 0.70 * relQuadAngle/quadAngleRange;
  }

  hasSilk() {
    if (this.silkLimit<0)
      return true;
    else
      return this.web.frameLen + this.web.radiiLen + this.web.capSpiralLen < this.silkLimit;
  }

  buildFirstRadiiAndFrame() {
  	let numStartRadii = this.genes[0];
  	let variability   = this.genes[1];
  	let phase         = this.genes[2];

  	if (this.web.radii.length>=numStartRadii) {
  		this.web.frameLen = 0;
  		let j = 0;
  		for (let i=0; i<this.web.radii.length; i++) {
  			if (i < this.web.radii.length-1) j = i+1; else j=0;
  			this.web.frameLen += getPointDist (this.web.radii[i].x2,this.web.radii[i].y2,this.web.radii[j].x2,this.web.radii[j].y2);
  		}
  		this.startAddRadiiAngle = this.web.radii[this.curRadiusID].angle;
  		this.stage = WS.AddRadii;
  		return;
  	}

  	let interval = 360.0 / numStartRadii;
  	let angle = phase + this.web.radii.length * interval;
  	angle = angle + Math.random() % (variability*2+1) - variability; // add random variability
  	if (angle>360.0) angle = angle - 360.0;
  	angle = degToRad(angle);

  	let soq_len = this.genes[2+this.quadrantID(angle)];
  	let eoq_len = this.genes[2+(this.quadrantID(angle)%4)+1];
  	let length  = this.interpolateQuadValues(angle, soq_len, eoq_len);

  	if (this.hasSilk()) {
  		this.curRadiusID = this.web.addRadius(angle, length, 0);
  		this.attachThreadAt(this.web.lastAttachX, this.web.lastAttachY);
  	} else
  		this.stage = WS.AddRadii;
  }

  buildAdditionalRadii() {
  	let curRad          = this.web.radii[this.curRadiusID];
  	let nextRad         = this.web.radii[(this.curRadiusID+1) % this.web.radii.length];
  	let soq_radAngle    = degToRad(this.genes[8 + this.quadrantID(curRad.angle)]);
  	let eoq_radAngle    = degToRad(this.genes[8 + (this.quadrantID(curRad.angle) % 4) + 1]);
  	let newRelRadAngle  = this.interpolateQuadValues (curRad.angle, soq_radAngle, eoq_radAngle);
  	let gapSize         = nextRad.angle - curRad.angle; if (gapSize<0) gapSize += twoPi;
  	if (gapSize > newRelRadAngle*this.genes[15]) {
  		let newRadAngle = curRad.angle + newRelRadAngle; if (newRadAngle>twoPi) newRadAngle-=twoPi;
  		if ((newRadAngle>1.57079) && (newRadAngle<1.57080)) newRadAngle=1.57079;
  		let negSlope = 0;
  		if (nextRad.x2 != curRad.x2)
  			negSlope = (nextRad.y2 - curRad.y2) / -(nextRad.x2 - curRad.x2);
  		else
  			negSlope = (nextRad.y2 - curRad.y2) / -0.000000001;
  		let tangens = Math.tan(newRadAngle);
  		let newX        = (negSlope * (curRad.x2) + (curRad.y2)) / (tangens + negSlope);
  		let newY        = tangens * newX;
  		let newRadLen   = Math.sqrt(newX*newX + newY*newY);
  		// if (newRadLen<3) cout << "warning: radius length < 3" << endl;
  		if (this.hasSilk()) {
  			this.curRadiusID = this.web.addRadius(newRadAngle, newRadLen, 1);
  			this.attachThreadAt(this.web.lastAttachX, this.web.lastAttachY);
  		}
  	}
  	else this.curRadiusID = (this.curRadiusID + 1) % this.web.radii.length;

  	if ((this.startAddRadiiAngle==this.web.radii[this.curRadiusID].angle) || !this.hasSilk()) {
  		this.initCapSpiralParameters();
  		this.stage = WS.FirstCapSpiralLoop;
  	}
  }

  scheduleMoveTo(x, y) {
  //	scheduledArm.push_back(Armature(x, y));
  }

  attachThreadAt(x, y) {
  	// this.attachX = x; this.attachY = y;
  	// this.scheduleMoveTo(x, y);
  	// this.scheduleMoveTo(this.arm.x, this.arm.y);
  }

  initCapSpiralParameters() {
  	this.sumAngleDiff = 0.0, this.lastx = 0.0, this.lasty = 0.0;
  	this.lastCapSpiralRadiiId = -1;
  	this.curRadiusID = -1;
  }

  buildFirstCapSpiralLoop() {
      this.web.firstMainCapSpiralThreadId = this.web.capSpiral.length;
  //	for (int i=0;i<(int)web.radii.size()+1;i++) {
  		this.curRadiusID++; this.curRadiusID = this.curRadiusID % this.web.radii.length;
  		if (this.lastCapSpiralRadiiId>-1) {
  			let angleDiff = this.web.radii[this.curRadiusID].angle - this.web.radii[this.lastCapSpiralRadiiId].angle;
  			if (angleDiff<0) angleDiff += twoPi;
  			this.sumAngleDiff += angleDiff;
  		}
  		this.curDistToCentre = this.genes[16]+(this.genes[17] - this.genes[16]) * this.sumAngleDiff/twoPi;
  		let r = this.web.radii[this.curRadiusID];
      let x = r.x1; let y = r.y1;
  		let p = getTranslatedPoint(x, y , r.angle, this.curDistToCentre); x = p[0]; y = p[1];
  		let d = getPointDist(x, y, r.x2, r.y2);
  		if (d < 3.0) {this.stage = WS.MainCapSpiral; this.web.capSpiralAborted = true; return;}
  		if (this.lastCapSpiralRadiiId>-1) {
  			let isFeasible = false;
  			if (this.hasSilk()) {
  			  isFeasible = this.web.addCapSpiralThread (this.lastx, this.lasty, x, y, this.lastCapSpiralRadiiId, this.curRadiusID);
    			  this.attachThreadAt(this.web.lastAttachX, this.web.lastAttachY);
  			}
  		}
  		this.lastx = x; this.lasty = y; this.lastCapSpiralRadiiId = this.curRadiusID;
  //	}
  	if ((this.curRadiusID==0 && this.sumAngleDiff>0) || !this.hasSilk()) {
  		let capNode = this.getCurNode(); this.lastx = capNode.x; this.lasty = capNode.y;
  		this.lastDistToInnerTurn = this.getDistToInnerCapSpiralTurn();
  		this.stage = WS.MainCapSpiral;
  	}
  }

  getDistToInnerCapSpiralTurn() {
  	if (this.web.radii[this.curRadiusID].capNodes.length<2) return(0.0);
  	let curNode   = this.web.radii[this.curRadiusID].capNodes[this.web.radii[this.curRadiusID].capNodes.length-1];
  	let innerNode = this.web.radii[this.curRadiusID].capNodes[this.web.radii[this.curRadiusID].capNodes.length-2];
  	return getPointDist(curNode.x, curNode.y, innerNode.x, innerNode.y);
  }

  getCurNode() {
  	if (this.web.radii[this.curRadiusID].capNodes.length==0) return(new WebNode(0,0));
  	return this.web.radii[this.curRadiusID].capNodes[this.web.radii[this.curRadiusID].capNodes.length-1];
  }

  getCurDistToCentre() {
  	if (this.web.radii[this.curRadiusID].capNodes.length==0) return(0.0);
  	let curNode = this.getCurNode();
  	return getPointDist(curNode.x, curNode.y, 0.0, 0.0);
  }

  getCurDistToFrame() {
  	if (this.web.radii[this.curRadiusID].capNodes.length==0) return(0.0);
  	let curNode = this.getCurNode();
  	return getPointDist(curNode.x, curNode.y, this.web.radii[this.curRadiusID].x2, this.web.radii[this.curRadiusID].y2);
  }

  getNextCapThreadFeasible (aDir, aLastDistToTurn) {
  	let saveRadiusID = this.curRadiusID;
  	this.curRadiusID = this.curRadiusID + aDir;
  	let lastRadiusId = this.web.radii.length-1;
  	if (this.curRadiusID > lastRadiusId) this.curRadiusID = 0;
  	if (this.curRadiusID < 0)  this.curRadiusID = lastRadiusId;
  	let nextDistToInnerTurn = aLastDistToTurn * this.genes[18]/100.0;
  	this.curDistToCentre = this.getCurDistToCentre() + nextDistToInnerTurn;
  	let feasible = this.curDistToCentre <= this.web.radii[this.curRadiusID].length;
  	this.curRadiusID = saveRadiusID;
  	return feasible;
  }

  buildMainCapSpiral() {
  	let done = false;
  	if ((this.web.capSpiralAborted==true) || !this.hasSilk()) {this.stage = WS.Done; return;}
  	let numRadii = this.web.radii.length-1;
  	let lastRadID = this.curRadiusID;

  	this.curRadiusID = this.curRadiusID + this.capSpiralDir;
  	if (this.curRadiusID > numRadii) this.curRadiusID=0;
  	if (this.curRadiusID<0)  this.curRadiusID = numRadii;
  	let nextDistToFrame = this.getCurDistToFrame();
  	this.curRadiusID = this.curRadiusID - this.capSpiralDir;
  	if (this.curRadiusID > numRadii) this.curRadiusID=0;
  	if (this.curRadiusID < 0) this.curRadiusID = numRadii;

  	if ((nextDistToFrame < this.lastDistToInnerTurn*2.2) && (this.getCurDistToFrame() > nextDistToFrame - this.lastDistToInnerTurn)) {
  			if (this.getNextCapThreadFeasible(-this.capSpiralDir, this.lastDistToInnerTurn)) {
  				done = false; this.capSpiralDir = -this.capSpiralDir; // Reverse
  			}
  			else
  				done = (!this.getNextCapThreadFeasible(this.capSpiralDir,this.lastDistToInnerTurn));
  		}
  		else {
  			if (!this.getNextCapThreadFeasible(this.capSpiralDir, this.lastDistToInnerTurn)) {
  				if (this.getNextCapThreadFeasible(-this.capSpiralDir, this.lastDistToInnerTurn)) {
  					done = false; this.capSpiralDir = -this.capSpiralDir; // Reverse
  				}
  				else
  					done = true;
  			}
  		}

  		this.curRadiusID = this.curRadiusID + this.capSpiralDir;
  		if (this.curRadiusID > numRadii) this.curRadiusID = 0;
  		if (this.curRadiusID < 0) this.curRadiusID = numRadii;
  		let nextDistToInnerTurn = this.lastDistToInnerTurn * this.genes[18] / 100.0;
  		this.curDistToCentre = this.getCurDistToCentre() + nextDistToInnerTurn;

  		if (!done) {
  			let x = this.web.radii[this.curRadiusID].x1;
        let y = this.web.radii[this.curRadiusID].y1;
  			let p = getTranslatedPoint(x, y, this.web.radii[this.curRadiusID].angle, this.curDistToCentre); x = p[0]; y = p[1];
  			let isFeasible = false;
  			if (this.hasSilk()) {
  				isFeasible = this.web.addCapSpiralThread (this.lastx, this.lasty, x, y, lastRadID, this.curRadiusID);
  				this.attachThreadAt(this.web.lastAttachX, this.web.lastAttachY);
  			}
  			if (!isFeasible) done = true;
  			this.lastx = x; this.lasty = y;
        this.lastDistToInnerTurn = nextDistToInnerTurn;
        lastRadID = this.curRadiusID;
  		}

  	if (done || !this.hasSilk()) this.stage = WS.Done;
  }

  render() {
    ctx.fillStyle = "rgb(255, 255, 0)";
  	let x = this.attachX;
    let y = this.attachY;
    let r = 2;
    ctx.fillRect(x,y,x-r,y-r);
  }

  inheritanceCode2int(i) {
  	if (i == "I") return 0;
  	if (i == "SEL") return 1;
  	if (i == "CROSS") return 2;
  	if (i == "SEL+MUT") return 3;
  	if (i == "CROSS+MUT") return 4;
  	return -1;
  }

  int2InheritanceCode(i) {
  	if (i == 0) return "I";
  	if (i == 1) return "SEL";
  	if (i == 2) return "CROSS";
  	if (i == 3) return "SEL+MUT";
  	if (i == 4) return "CROSS+MUT";
  	return "";
  }

  // getFossilCode() {
  // 	let fossil = [];
  //   fossil.resize(EA.fossilEntryLen);
  // 	for (int i = 0; i < NUM_GENES; i++)
  // 		fossil[i] = genes[i];
  // 	fossil[NUM_GENES + 0] = fitness;
  // 	fossil[NUM_GENES + 1] = inheritanceCode2int(inheritanceCode);
  // 	fossil[NUM_GENES + 2] = parentId1;
  // 	fossil[NUM_GENES + 3] = parentId2;
  // 	if (EA.fossilEntryLen > NUM_GENES + 4)
  // 		fossil[NUM_GENES + 4] = inheritanceCrossover;
  // 	return fossil;
  // }

  setGenesWithDNA(dna) {
  	for (let i = 0; i < this.numGenes; i++)
  		this.genes[i] = dna[i];
  }

  getGeneStringStart() {
  	let s = "";
  	for (let g = 0; g < this.numGenes; g++) {
  		s = s + this.genes[g];
  		if (g < this.numGenes - 1) s = s + ", "; else s = s + "";
  	}
  	return s;
  }


}
