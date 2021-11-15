function AddRadioButton(x, y, id, isSolverGoal) {
    radioInput = document.createElement("input");
    radioInput.setAttribute("type", "radio");
    radioInput.setAttribute("id", "radio_"+id);
    radioInput.setAttribute("onclick", "changeSolverGoal('"+id+"')");
    radioInput.setAttribute("style", "position:absolute;top:"+y+"px;left:"+x+"px; float:left;");
    document.body.appendChild(radioInput);
    let radio = document.getElementById("radio_"+id);
    radio.checked = isSolverGoal;
}
