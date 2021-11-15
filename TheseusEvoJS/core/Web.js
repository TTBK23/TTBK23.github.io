class WebNode {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class WebThread {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}

class Web {
  constructor() {

    this.ctx = [];
    this.maxWebSize_x = 100;
    this.maxWebSize_y = 100;
    this.frameSize_x = 0;
    this.frameSize_y = 0;
    this.size = 100;
    this.x0 = 0;
    this.y0 = 0;
    this.xOff = 0;
    this.yOff = 0;
    this.scaleF = 0.0;

    this.useDarkBackground = true;
    this.lineWidthRadii = 1.0;
    this.lineWidthFrame = 1.0;
    this.lineWidthCapSpiral = 2.0;

  	this.radii = [];
  	this.capSpiral = [];
  	this.frame = [];

  	this.lastAttachX = 0; this.lastAttachY = 0;
  	this.firstMainCapSpiralThreadId = 0;
    this.isHighlighted = false;
 	  this.isMadeByManualSelectionParent = false;
 	  this.capSpiralAborted = false;
 	  this.mainCapStart = 0;
 	  this.capSpiralLen = 0.0;
    this.radiiLen = 0.0;
    this.frameLen = 0.0;

    this.caughtPreyID = [];
    this.cur_f = 0.0; // prey impact variables
    this.cur_s = 0.0; // prey impact variables
  }

  setLineWidth(c) {
  	if (c == CP.Normal) { this.lineWidthRadii = 1.0; this.lineWidthFrame = 1.0; this.lineWidthCapSpiral = 2.0;}
  	if (c >= CP.Dimmed) { this.lineWidthRadii = 1.0; this.lineWidthFrame = 1.0; this.lineWidthCapSpiral = 2.0; }
  	if (c >= CP.HighlightFrame) { this.lineWidthRadii = 1.0; this.lineWidthFrame = 3.0; this.lineWidthCapSpiral = 1.0; }
  	if (c >= CP.HighlightFirstRadii) { this.lineWidthRadii = 3.0; this.lineWidthFrame = 1.0; this.lineWidthCapSpiral = 1.0; }
  	if (c >= CP.HighlightFrameAndFirstRadii) { this.lineWidthRadii = 3.0; this.lineWidthFrame = 3.0; this.lineWidthCapSpiral = 1.0; }
  	if (c >= CP.HighlightNextRadii) { this.lineWidthRadii = 3.0; this.lineWidthFrame = 1.0; this.lineWidthCapSpiral = 1.0; }
  	if (c >= CP.HighlightFirstCapSpiralLoop) { this.lineWidthRadii = 1.0; this.lineWidthFrame = 1.0; this.lineWidthCapSpiral = 3.0; }
  	if (c >= CP.HighlightMainCapSpiral) { this.lineWidthRadii = 1.0; this.lineWidthFrame = 1.0; this.lineWidthCapSpiral = 3.0; }
  	if (c >= CP.HighlightWholeCapSpiral) { this.lineWidthRadii = 1.0; this.lineWidthFrame = 1.0; this.lineWidthCapSpiral = 3.0; }
  }

  setColors(c) {
    this.cFrame = [1.0, 0.0, 0.0];
    this.cFirstRadii = [0.5, 0.5, 0.5];
    this.cNextRadii = [0.5, 0.5, 0.5];
    this.cFirstCapSpiralLoop = [0.3, 0.3, 1.0];
    this.cMainCapSpiral = [0.3, 0.3, 1.0];
  	// if (useDarkBackground) {
  	// 	if (c == CP.Normal) {
  	// 		SetColor(cFrame, 1.0f, 0.0f, 0.0f);
  	// 		SetColor(cFirstRadii, 0.5f, 0.5f, 0.5f);
  	// 		SetColor(cNextRadii, 0.5f, 0.5f, 0.5f);
  	// 		SetColor(cFirstCapSpiralLoop, 0.3f, 0.3f, 1.0f);
  	// 		SetColor(cMainCapSpiral, 0.3f, 0.3f, 1.0f);
  	// 	}
  	// 	if (c >= CP.Dimmed) {
  	// 		SetColor(cFrame, 0.5f, 0.0f, 0.0f);
  	// 		SetColor(cFirstRadii, 0.2f, 0.2f, 0.2f);
  	// 		SetColor(cNextRadii, 0.2f, 0.2f, 0.2f);
  	// 		SetColor(cFirstCapSpiralLoop, 0.1f, 0.1f, 0.5f);
  	// 		SetColor(cMainCapSpiral, 0.1f, 0.1f, 0.5f);
  	// 	}
  	// 	if (c == CP.HighlightFrame) SetColor(cFrame, 1.0f, 0.0f, 0.0f);
  	// 	if (c == CP.HighlightFirstRadii) SetColor(cFirstRadii, 0.5f, 0.5f, 0.5f);
  	// 	if (c == CP.HighlightFrameAndFirstRadii) { SetColor(cFrame, 1.0f, 0.0f, 0.0f); SetColor(cFirstRadii, 0.5f, 0.5f, 0.5f); }
  	// 	if (c == CP.HighlightNextRadii) SetColor(cNextRadii, 0.5f, 0.5f, 0.5f);
  	// 	if (c == CP.HighlightFirstCapSpiralLoop) SetColor(cFirstCapSpiralLoop, 0.3f, 0.3f, 1.0f);
  	// 	if (c == CP.HighlightMainCapSpiral) SetColor(cMainCapSpiral, 0.3f, 0.3f, 1.0f);
  	// 	if (c == CP.HighlightWholeCapSpiral) { SetColor(cFirstCapSpiralLoop, 0.3f, 0.3f, 1.0f); SetColor(cMainCapSpiral, 0.3f, 0.3f, 1.0f); }
  	// }
  	// else {
  	// 	if (c == CP.Normal) {
  	// 		SetColor(cFrame, 0.8f, 0.0f, 0.0f);
  	// 		SetColor(cFirstRadii, 0.5f, 0.5f, 0.5f);
  	// 		SetColor(cNextRadii, 0.5f, 0.5f, 0.5f);
  	// 		SetColor(cFirstCapSpiralLoop, 0.2f, 0.2f, 0.7f);
  	// 		SetColor(cMainCapSpiral, 0.2f, 0.2f, 0.7f);
  	// 	}
  	// 	if (c >= CP.Dimmed) {
  	// 		SetColor(cFrame, 1.0f, 0.4f, 0.4f);
  	// 		SetColor(cFirstRadii, 0.7f, 0.7f, 0.7f);
  	// 		SetColor(cNextRadii, 0.7f, 0.7f, 0.7f);
  	// 		SetColor(cFirstCapSpiralLoop, 0.3f, 0.3f, 1.0f);
  	// 		SetColor(cMainCapSpiral, 0.3f, 0.3f, 1.0f);
  	// 	}
  	// 	if (c == CP.HighlightFrame) SetColor(cFrame, 1.0f, 0.0f, 0.0f);
  	// 	if (c == CP.HighlightFirstRadii) SetColor(cFirstRadii, 0.5f, 0.5f, 0.5f);
  	// 	if (c == CP.HighlightFrameAndFirstRadii) { SetColor(cFrame, 1.0f, 0.0f, 0.0f); SetColor(cFirstRadii, 0.5f, 0.5f, 0.5f); }
  	// 	if (c == CP.HighlightNextRadii) SetColor(cNextRadii, 0.5f, 0.5f, 0.5f);
  	// 	if (c == CP.HighlightFirstCapSpiralLoop) SetColor(cFirstCapSpiralLoop, 0.3f, 0.3f, 1.0f);
  	// 	if (c == CP.HighlightMainCapSpiral) SetColor(cMainCapSpiral, 0.3f, 0.3f, 1.0f);
  	// 	if (c == CP.HighlightWholeCapSpiral) { SetColor(cFirstCapSpiralLoop, 0.3f, 0.3f, 1.0f); SetColor(cMainCapSpiral, 0.3f, 0.3f, 1.0f); }
    //
  	// }
  }

  setColorsAndLineWidth(c) {
  	this.setColors(c);
  	this.setLineWidth(c);
  }

  // Webs have a max size, which is 100 x 100. All webs use this metric for their max bounds
  // During rendering, the web is projected to the screen by a scaling factor that reflects the ratio between its screen size and its coordinates
  initRendering (ctx, size, x0, y0) {
    this.ctx = ctx;
    this.scaleF = 0.0;
  	if (this.maxWebSize_x > this.maxWebSize_y)
  		this.scaleF = size/(2.0*this.maxWebSize_x);
  	else
  		this.scaleF = size/(2.0*this.maxWebSize_y);

  	this.xOff = x0 + this.scaleF * this.maxWebSize_x;
  	this.yOff = y0 + this.scaleF * this.maxWebSize_y;
  	this.frameSize_x = this.maxWebSize_x - 1;
  	this.frameSize_y = this.maxWebSize_y - 1;
  }

  getColorCode(r, g, b) {
    return "rgb("+r*255+", "+g*255+", "+b*255+")";
  }

  getColorCodeVar(c) {
    return "rgb("+c[0]*255+", "+c[1]*255+", "+c[2]*255+")";
  }

  renderBackgroundHighlighting() {
  	let i = 0;
    this.ctx.scale(this.scaleF,this.scaleF);
    this.ctx.beginPath();     // Start a new path.
    this.ctx.lineWidth = "4";
    if (this.useDarkBackground) {
   	  if (this.isHighlighted)
        this.ctx.strokeStyle = this.getColorCode(0.3, 1.0, 0.3);
      else
        this.ctx.strokeStyle = this.getColorCode(0.0, 0.0, 0.0);
   	} else {
   		if (this.isHighlighted)
        this.ctx.strokeStyle = this.getColorCode(0.0, 0.5, 0.0);
      else
        this.ctx.strokeStyle = this.getColorCode(1.0, 1.0, 1.0);
   	}
    this.ctx.moveTo(-this.frameSize_x+i,-this.frameSize_y+i);
    this.ctx.lineTo(-this.frameSize_x+i, this.frameSize_y-i-0);
    this.ctx.lineTo( this.frameSize_x-i, this.frameSize_y-i-0);
    this.ctx.lineTo( this.frameSize_x-i,-this.frameSize_y+i);
    this.ctx.lineTo(-this.frameSize_x+i,-this.frameSize_y+i);
    this.ctx.stroke();
  }

  renderCage() {
    this.ctx.beginPath();     // Start a new path.
    this.ctx.lineWidth = "2";
  	if (this.useDarkBackground)
      this.ctx.strokeStyle = this.getColorCode(1.0, 1.0, 1.0);
    else
      this.ctx.strokeStyle = this.getColorCode(0.6, 0.6, 0.6);
    this.ctx.moveTo(-this.frameSize_x,-this.frameSize_y);
    this.ctx.lineTo(-this.frameSize_x, this.frameSize_y);
    this.ctx.lineTo( this.frameSize_x, this.frameSize_y);
  	this.ctx.lineTo( this.frameSize_x,-this.frameSize_y);
    this.ctx.lineTo(-this.frameSize_x,-this.frameSize_y);
    this.ctx.stroke();
  }

  renderAllThreads() {
    if (this.radii.length==0) return;

    // (1) Draw radii
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidthRadii;
  	for (let i=0; i<this.radii.length; i++) {
      if (this.radii[i].radType==0)
        this.ctx.strokeStyle = this.getColorCodeVar(this.cFirstRadii);
  		else
        this.ctx.strokeStyle = this.getColorCodeVar(this.cNextRadii);
        this.ctx.moveTo(this.radii[i].x1,this.radii[i].y1);
        this.ctx.lineTo(this.radii[i].x2,this.radii[i].y2);
    }
    this.ctx.stroke();

  	// (2) Draw frame
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidthFrame;
    this.ctx.strokeStyle = this.getColorCodeVar(this.cFrame);
    this.ctx.moveTo(this.radii[0].x2,this.radii[0].y2);
  	for (let i=1; i<this.radii.length; i++) {
      this.ctx.lineTo(this.radii[i].x2,this.radii[i].y2);
    }
    this.ctx.lineTo(this.radii[0].x2,this.radii[0].y2);
    this.ctx.stroke();

  	// (3) Draw capture spiral
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidthCapSpiral;
    this.ctx.strokeStyle = this.getColorCodeVar(this.cFirstCapSpiralLoop);

    this.ctx.moveTo(this.capSpiral[0].x1, this.capSpiral[0].y1);
  	for (let i = 1; i < this.capSpiral.length; i++) {
      this.ctx.lineTo(this.capSpiral[i].x1, this.capSpiral[i].y1);
//  		if (i==firstMainCapSpiralThreadId) LGL::UseColor(cMainCapSpiral);
  	}
  	if (this.capSpiral.length > 0) {
  		let t = this.capSpiral[this.capSpiral.length-1];
      this.ctx.lineTo(t.x2, t.y2);
  	}
    this.ctx.stroke();
  }

  render() {
    this.ctx.translate(this.xOff,this.yOff);
    this.ctx.scale(this.scaleF,this.scaleF);
  	this.renderCage();
  	this.renderAllThreads();
  	//this.RenderBackgroundHighlighting();
    this.ctx.scale(1/this.scaleF,1/this.scaleF);
    this.ctx.translate(-this.xOff,-this.yOff);
  }

  getClampedLocation (x, y) {
  	if (x > this.maxWebSize_x) x = this.maxWebSize_x;
  	if (x < -this.maxWebSize_x) x = -this.maxWebSize_x;
  	if (y > this.maxWebSize_y) y = this.maxWebSize_y;
  	if (y < -this.maxWebSize_y) y = -this.maxWebSize_y;
    return [x, y];
  }

  // Insert a radius in cw order to the list and returns the index of the new radius
  addRadius (anAngle, aLength, aRadType) {
  	let x = 0.0;
    let y = 0.0;
    let p1 = getTranslatedPoint(x, y, anAngle, aLength); x = p1[0]; y = p1[1];
    let p2 = this.getClampedLocation(x, y); x = p2[0]; y = p2[1];
  	this.lastAttachX = x; this.lastAttachY = y;
    let newRadius = new Radius(0, 0, Math.round(x), Math.round(y), anAngle, aRadType);
    this.radiiLen += getPointDist(0.0, 0.0, x, y);

  	// Add if first radius
  	if (this.radii.length==0) {
  		this.radii.push(newRadius);
  		return 0;
  	}

    // !! NEEDS TO BE TESTED !!
    for (let i=0; i<this.radii.length; i++) {
      if (this.radii[i].angle > anAngle) {
        this.radii.splice(i, 0, newRadius);
  			return(i);
      }
    }

  	// Add if new radius is the last radius
  	this.radii.push(newRadius);
  	return this.radii.length-1;
  }

  // Add a capSpiralNode to the capture spiral
  addCapSpiralThread (x1d, y1d, x2d, y2d, radId1, radId2) {
  	let isFeasible = true;
  	let c1 = []; let c2 = [];

  	let p1 = this.getClampedLocation(x1d, y1d); x1d = p1[0]; y1d = p1[1];
  	let p2 = this.getClampedLocation(x2d, y2d); x2d = p2[0]; y2d = p2[1];

  	let x1 = Math.round(x1d); let y1 = Math.round(y1d);
    let x2 = Math.round(x2d); let y2 = Math.round(y2d);

  	if (this.capSpiral.length > 0) {
  		let t = this.capSpiral[this.capSpiral.length-1];
  		if (x1==t.x1 && y1==t.y1 && x2==t.x2 && y2==t.y2) isFeasible = false;
  		if (x1==t.x2 && y1==t.y2 && x2==t.x1 && y2==t.y1) isFeasible = false;
  		if (!isFeasible) return isFeasible;
  	}

  	this.capSpiral.push(new WebThread(x1, y1, x2, y2));
  	this.lastAttachX = x2; this.lastAttachY = y2;
  	this.capSpiralLen += getPointDist(x1, y1, x2, y2);
  	c1 = this.radii[radId1].capNodes;
  	if ((c1.length==0) || ((c1[c1.length-1].x!=x1) || (c1[c1.length-1].y!=y1)))
  		this.radii[radId1].capNodes.push(new WebNode(x1, y1));
  	c2 = this.radii[radId2].capNodes;
  	if ((c2.length==0) || ((c2[c2.length-1].x!=x2) || (c2[c2.length-1].y!=y2)))
  		this.radii[radId2].capNodes.push(new WebNode(x2, y2));
  	return isFeasible;
  }


}
