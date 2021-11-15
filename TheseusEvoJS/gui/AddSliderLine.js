function AddSliderLine(x, y, id, title, min, max, value) {

    AddText(x, y-13, "title"+id, title);
    let s = AddSlider(x+140, y, "slider_"+id, min, max, value);
    AddText(x+140+210, y-13, "value_"+id, value);

    s.oninput = function() {
        const parameterName = this.id.substring(7,this.id.length);
        // let ageData, wealthSeriesData, retirementWealth, annualWithdrawals, mu ,sigma;
        // [ageData, wealthSeriesData, retirementWealth, annualWithdrawals, mu ,sigma] = ParametersValueRange.Update(parameterName, this.value);
        // updateOutputs(ParametersValueRange.pvr, ageData, wealthSeriesData, retirementWealth, annualWithdrawals);
        // updateTextValuesAndSliders();
    }
}
