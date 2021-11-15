function setupLayout(ctx) {
  ctx.canvas.width  = window.innerWidth - 450;
  ctx.canvas.height = window.innerHeight;
  ctx.fillStyle = "black";
  const x0 =  ctx.canvas.width + 20;
  const y0 = 80;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function translateGUI(ctx) {
}

function windowSizeChanged() {
  var canvas = document.getElementById("myCanvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    setupLayout(ctx);
    renderSimulator(ctx);
  }
}
