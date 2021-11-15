function AddSliderBox(x, y, id, title, valueRange, isSolverGoal) {

    AddRadioButton(x-20, y-40, id, isSolverGoal);
    AddText(x, y-40, "title"+id, title);
    let s = AddSlider(x, y, "slider_"+id, 0, valueRange.fullgrid.length-1, valueRange.Fullgridvalue2index());
    s.style.visibility = isSolverGoal ? "hidden" : "visible";

    addText(x, y+10, "value_"+id, valueRange.value);

    s.oninput = function() {
        const parameterName = this.id.substring(7,this.id.length);
        let ageData, wealthSeriesData, retirementWealth, annualWithdrawals, mu ,sigma;
        [ageData, wealthSeriesData, retirementWealth, annualWithdrawals, mu ,sigma] = ParametersValueRange.Update(parameterName, this.value);
        updateOutputs(ParametersValueRange.pvr, ageData, wealthSeriesData, retirementWealth, annualWithdrawals);
        updateTextValuesAndSliders();
    }
}
