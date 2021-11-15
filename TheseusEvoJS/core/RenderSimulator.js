function renderSimulator(ctx) {
  let webSize = ctx.canvas.width/4;
  let numCols = 4;
  let numRows = 4;
  for (let row = 0; row < numRows; row++)
  	for (let col = 0; col < numCols; col++) {
      let s = new Spider();
      s.web.initRendering(ctx, webSize, col*webSize, row*webSize);
      s.web.setColorsAndLineWidth(CP.Normal);
      s.buildWholeWeb();
      s.web.render();
    }
}


// function renderSimulator(ctx) {
//   let numRows = 3;
//   let numCols = 4;
//
//   let population = [];
//   for (let i=0; i<popSize; i++) {
//     let s = new Spider();
//     s.web.initRendering(ctx, ctx.canvas.width/4,0,0);
//     s.web.setColorsAndLineWidth(CP.Normal);
//     s.buildWholeWeb();
//     population.push(s);
//   }
//
//   for (let row = 0; row < numRows; row++)
// 		for (let col = 0; col < numCols; col++) {
// 			let i = row * numCols + col;
//       // let spider = EA.population[i];
// 			// spider.web.isMadeByManualSelectionParent = (evoMode == EVOMODE_MANUAL_SELECTION) && (i == manualSelectionParentId);
//
//       let spider == population[i];
// 			// Render web
// 			spider.web.render();
// 			// if (showGenes) RenderGenes(spider, 0);
//
// 			// Render spider
// 			spider.render();
//
// 			// Render prey
// 			// if ((showLastPrey || leavePreyInWeb) && EA.population[0].fitnessEvaluated)
// 			// 	RenderPrey(spider);
//
// 			// Render fitness and inheritance data
// 			// if (EA.population[0].fitnessEvaluated && showFitness && evoMode == EVOMODE_NATURAL_SELECTION) {
// 			// 	Spider s = EA.population[i];
// 			// 	sprintf_s(str, "[%i] Fit=%.0f  %s(%i, %i)", i + 1, s.fitness, s.inheritanceCode.c_str(), s.parentId1 + 1, s.parentId2 + 1);
// 			// 	if (useDarkBackground) font.setColor_rp(1.0f, 1.0f, 1.0f); else font.setColor_rp(0.0f, 0.0f, 0.0f);
// 			// 	font.writeAt_rp(5 - maxWebSize_x, +15 - maxWebSize_y, string(str));
// 			// }
// 			// glScalef(1 / spider.web.scaleF, 1 / spider.web.scaleF, 1);
// 			// glTranslatef(-spider.web.xOff, -spider.web.yOff, 0);
// 		}
//
//
//
//
// }
