class Radius {
  constructor(x1, y1, x2, y2, angle, radType)  {
    this.capNodes = [];
    this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2;
    this.angle = angle;
    this.radType = radType;
    this.length=Math.sqrt(x2*x2+y2*y2)+0.5;
  }
}
