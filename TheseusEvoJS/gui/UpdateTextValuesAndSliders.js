function UpdateTextValuesAndSliders() {
    const pvr = ParametersValueRange.pvr;

    document.getElementById("value_currentAge").innerHTML = pvr.currentAge.value;
    document.getElementById("value_retirementAge").innerHTML = pvr.retirementAge.value;
    document.getElementById("value_lifeExpectancyAge").innerHTML = pvr.lifeExpectancyAge.value;
    document.getElementById("value_inflationRate").innerHTML = (100*pvr.inflationRate.value).toFixed(2) + " %";
    document.getElementById("value_taxRate").innerHTML = (100*pvr.taxRate.value).toFixed(2) + " %";

    document.getElementById("value_riskCategory").innerHTML = num2money(pvr.riskCategory.value);
    document.getElementById("value_initialDeposit").innerHTML = num2money(pvr.initialDeposit.value);
    document.getElementById("value_regularSavings").innerHTML = num2money(pvr.regularSavings.value);
    document.getElementById("value_withdrawal").innerHTML = num2money(pvr.withdrawal.value);

    // document.getElementById("sliderRiskCategory").max = pvr.riskCategory.fullgrid.length-1;
    // document.getElementById("sliderInitialDeposit").max = pvr.initialDeposit.fullgrid.length-1;
    // document.getElementById("sliderRegularSavings").max = pvr.regularSavings.fullgrid.length-1;
    //document.getElementById("sliderWithdrawal").max = pvr.withdrawal.fullgrid.length-1;

    let slider = [];
    slider[0] = document.getElementById("slider_riskCategory");
    slider[0].max = pvr.riskCategory.fullgrid.length-1;
    slider[0].value = pvr.riskCategory.Fullgridvalue2index();

    slider[1] = document.getElementById("slider_initialDeposit");
    slider[1].max = pvr.initialDeposit.fullgrid.length-1;
    slider[1].value = pvr.initialDeposit.Fullgridvalue2index();

    slider[2] = document.getElementById("slider_regularSavings");
    slider[2].max = pvr.regularSavings.fullgrid.length-1;
    slider[2].value = pvr.regularSavings.Fullgridvalue2index();

    slider[3] = document.getElementById("slider_withdrawal");
    slider[3].max = pvr.withdrawal.fullgrid.length-1;
    slider[3].value = pvr.withdrawal.Fullgridvalue2index();
}
