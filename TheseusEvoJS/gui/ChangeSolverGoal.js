function changeSolverGoal(v) {
    let newSolveGoal = -1;
    let ids = ["riskCategory", "initialDeposit", "regularSavings", "withdrawal"];
    for (let i=0; i<ids.length; i++) {
       if (v==ids[i]) {
            newSolveGoal = i;
        }
    }
    for (let i=0; i<ids.length;i++) {
        let slider = document.getElementById("slider_"+ids[i]);
        slider.style.visibility = i==newSolveGoal ? "hidden" : "visible";
        let radio = document.getElementById("radio_"+ids[i]);
        radio.checked = i==newSolveGoal;
    }

    let ageData, wealthSeriesData, retirementWealth, annualWithdrawals, mu ,sigma;
    [ageData, wealthSeriesData, retirementWealth, annualWithdrawals, mu ,sigma] = ParametersValueRange.Update("solveGoal", newSolveGoal);
    updateOutputs(ParametersValueRange.pvr, ageData, wealthSeriesData, retirementWealth, annualWithdrawals);
    updateTextValuesAndSliders();
}
