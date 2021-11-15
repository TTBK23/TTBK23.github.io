function AddButton(x, y, id, name, functionCall) {
    buttonInput = document.createElement("input");
    buttonInput.setAttribute("type", "button");
    buttonInput.setAttribute("id", "button_"+id);
    buttonInput.value = name;
    buttonInput.setAttribute("onclick", functionCall);
    buttonInput.setAttribute("style", "position:absolute;top:"+y+"px;left:"+x+"px; float:left;");
    document.body.appendChild(buttonInput);
}
