/**
 * Created by nikko on 6/15/2017.
 */
var editing  = false;

if (document.getElementById && document.createElement) {
    var butt = document.createElement('BUTTON');
    var buttext = document.createTextNode('Ready!');
    butt.appendChild(buttext);
    butt.onclick = saveEdit;
}

function catchIt(e) {
    if (editing) return;
    if (!document.getElementById || !document.createElement) return;
    if (!e) var obj = window.event.srcElement;
    else var obj = e.target;
    while (obj.nodeType != 1) {
        obj = obj.parentNode;
    }
    if (obj.tagName == 'TEXTAREA' || obj.tagName == 'A') return;
    while (obj.nodeName != 'BUTTON' &&obj.nodeName != 'P' && obj.nodeName != 'HTML') {
        obj = obj.parentNode;
    }
    if (obj.nodeName == 'HTML') return;
    var x = obj.innerHTML;
    var y = document.createElement('TEXTAREA');
    var z = obj.parentNode;
    z.insertBefore(y,obj);
    z.insertBefore(butt,obj);
    z.removeChild(obj);
    y.setAttribute("id","editArea")
    y.value = x;
    y.focus();
    editing = true;
}

function saveEdit() {
    var area = document.getElementById('editArea');
    var y = document.createElement('P');
    var z = area.parentNode;
    y.innerHTML = area.value;
    z.insertBefore(y,area);
    z.removeChild(area);
    z.removeChild(document.getElementsByTagName('button')[0]);
    editing = false;
}
document.ondblclick = catchIt;

//$(document).click(function(){
 //   if(editing == true){
  //      saveEdit();
 //   }
//});
//document.onclick = catchIt;