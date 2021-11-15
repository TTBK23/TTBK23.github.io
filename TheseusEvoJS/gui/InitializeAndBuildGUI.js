function initializeAndBuildGUI(ctx) {

    const x0 =  ctx.canvas.width + 20;
    const y0 = 80;
    const step = 25;

    AddButton(x0, y0+0*step, "New", "New Population", "NewPopulation()");
    AddSliderLine(x0, y0+1*step, "PopSize", "PopulationSize", 6, 200, 0);

    AddButton(x0, y0+3*step, "Run", "Run/Stop", "RunEvolution()");
    AddButton(x0, y0+4*step, "Run100Gen", "Run 100 Gen", "RunEvolution(100)");
    AddButton(x0, y0+5*step, "Run1Gen", "Run 1 Gen", "RunEvolution(1)");
    AddButton(x0, y0+6*step, "Feed", "Feed", "FeedSpiders()");
    AddButton(x0, y0+7*step, "Backward", "Backward", "SimTimeBackward()");
    AddButton(x0, y0+8*step, "Forward", "Forward", "SimTimeForward()");

    AddSliderLine(x0, y0+10*step, "NumPrey", "Number of Prey", 0, 80, 80);
    AddSliderLine(x0, y0+11*step, "PreySize", "Prey Size", 0, 80, 80);
    AddSliderLine(x0, y0+12*step, "PreyValue", "Prey Value", 0, 80, 80);
    AddSliderLine(x0, y0+13*step, "AttackSim", "Attack Sim", 0, 2, 0);

    AddSliderLine(x0, y0+15*step, "SilkCostFactor", "Silk Cost Factor", 0, 2, 0);
    AddSliderLine(x0, y0+16*step, "SilkLimit", "Silk Limit (0=no limit)", 0, 2, 0);
    AddSliderLine(x0, y0+17*step, "TimePenaltyFactor", "Time Penalty Factor", 0, 2, 0);

    AddSliderLine(x0, y0+19*step, "CrossoverRate", "CrossoverRate", 0, 2, 0);
    AddSliderLine(x0, y0+20*step, "MutationRate", "MutationRate", 0, 2, 0);

    AddButton(x0, y0+22*step, "RuleBrowser", "Browse Rules", "BrowseRules()");
    AddButton(x0, y0+23*step, "FossilBrowser", "Browse Fossils", "BrowseFossils()");


//    <button onclick="myFunction()">Click me</button>

    // updateTextValuesAndSliders();
    // updateOutputs(pvr, ageData, wealthSeriesData, retirementWealth, annualWithdrawals);
}
