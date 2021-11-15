function AddSlider(x, y, id, min, max, value) {
    let s = document.createElement("INPUT");
    s.setAttribute("id", id);
    s.setAttribute("type", "range");
    s.setAttribute("min", min);
    s.setAttribute("max", max);
    s.setAttribute("value", value);
    s.setAttribute("style", "position:absolute;top:"+y+"px;left:"+x+"px; float:left;");
    document.body.appendChild(s);
    return s;
}
