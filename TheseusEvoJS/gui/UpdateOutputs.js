function UpdateOutputs(pvr, ageData, wealthSeriesData, retirementWealth, annualWithdrawals) {

    let html = "";
    html += printGrids(pvr);

    plotWealthData(ageData, wealthSeriesData);

    let monthlyWithdrawals = [];
    for(let i=0; i<annualWithdrawals.length; i++) monthlyWithdrawals[i] = "  "+num2money(annualWithdrawals[i]/12);
    for(let i=0; i<annualWithdrawals.length; i++) annualWithdrawals[i] = "  "+num2money(annualWithdrawals[i]);
    for(let i=0; i<retirementWealth.length; i++) retirementWealth[i] = "  "+num2money(retirementWealth[i]);

    html += "ageData: " + ageData + "<br><br>";
    html += "wealthSeriesData:<br>";
    html += "<table>";
    for (let t=0; t < wealthSeriesData[0].length; t++) {
        html += "<tr>";
        for (let q=0; q<5; q++) {
            html += "<td>" + wealthSeriesData[q][t].toFixed(0)+"</td>";
        }
        html += "</tr>";
    }
    html += "</table>";
    html += "<br>";
    html += "initialDeposit: " + num2money(pvr.initialDeposit.value) + "<br>";
    html += "regularSavings: " + num2money(pvr.regularSavings.value) + "<br>";
    html += "monthlyWithdrawals: " + monthlyWithdrawals + "<br>";
    html += "annualWithdrawals: " + annualWithdrawals + "<br>";
    html += "retirementWealth: " + retirementWealth + "<br>";

//    document.getElementById("textoutput").innerHTML = html;
    document.getElementById("textoutput").innerHTML = "";

}
