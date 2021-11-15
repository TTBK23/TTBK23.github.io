function	degToRad(x) { return x * 0.0174532925199432957692 }; // x*pi/180
function	radToDeg(x)	{ return x * 57.2957795130823208768 };    // x*180/pi

function getPointDist (x1, y1, x2, y2) {
  let xd = x2-x1, yd = y2-y1;
  return Math.sqrt(xd*xd + yd*yd);
}

function getTranslatedPoint(x, y, anAngle, aDist) {
  return [x + aDist*Math.cos(anAngle), y + aDist*Math.sin(anAngle)];
}
