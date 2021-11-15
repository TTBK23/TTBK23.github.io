function AddText(x, y, id, t) {
    let p = document.createElement("P");
    let s = document.createTextNode(t);
    p.appendChild(s);
    p.setAttribute("id", id);
    p.setAttribute("style", "position:absolute;top:"+y+"px;left:"+x+"px; float:left;");
    document.body.appendChild(p);
}
