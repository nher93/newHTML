/**
 * Created by nikko on 6/15/2017.
 */
$(document).ready(function() {

    var editing = false;
    //Check compatibility
    /*if (document.getElementById && document.createElement) {
        var butt = document.createElement('BUTTON');
        var buttext = document.createTextNode('Ready!');
        butt.appendChild(buttext);
        butt.onclick = saveEdit;
    }*/

    function catchIt(e) {
        if (editing) return;
        if (!document.getElementById || !document.createElement) return;
        if (!e) var obj = window.event.srcElement;
        else var obj = e.target;

        while (obj.nodeType != 1) {
            obj = obj.parentNode;
        }
        //If still on text area, do nothing
        if (obj.tagName == 'TEXTAREA' || obj.tagName == 'A') return;
        //Select the HTML elements that are classified as valid to edit, else keep tranverse up its parents
        while (obj.nodeName != 'BUTTON' && obj.nodeName != 'P' && obj.nodeName != 'HTML') {
            obj = obj.parentNode;
        }
        if (obj.nodeName == 'HTML') return;

        var style = obj.style;//Get initial style
        var x = obj.innerHTML;//Get the current inner HTML
        var y = document.createElement('TEXTAREA');
        var z = obj.parentNode;

        z.insertBefore(y, obj);//Insert the text area before current object
        //z.insertBefore(butt, obj);
        //z.removeChild(obj);
        obj.style.display = "none";//hide the current object
        y.setAttribute("id", "editArea");
        y.value = x;
        y.focus();
        $("#editArea").blur(function(){
            saveEdit(obj,style);
        });
        editing = true;

    }

    function saveEdit(obj,style) {
        var area = document.getElementById('editArea');
        var z = area.parentNode;
        obj.innerHTML = area.value;
        obj.style = style;
        z.removeChild(area);
        editing = false;
    }

    document.ondblclick = catchIt;



// target elements with the "draggable" class
    interact('.draggable')
        .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            // enable autoScroll
            autoScroll: true,

            // call this function on every dragmove event
            onmove: dragMoveListener,
            // call this function on every dragend event
            onend: function (event) {
                var textEl = event.target.querySelector('p');

                textEl && (textEl.textContent =
                    'moved a distance of '
                    + (Math.sqrt(event.dx * event.dx +
                        event.dy * event.dy)|0) + 'px');
            }
        });

    function dragMoveListener (event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;



    interact('.resize-drag')
        .draggable({
            onmove: window.dragMoveListener
        })
        .resizable({
            preserveAspectRatio: true,
            edges: { left: true, right: true, bottom: true, top: true }
        })
        .on('resizemove', function (event) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);

            // update the element's style
            target.style.width  = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            //target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
        });




});
