//-----------main array for storing data in local storage.-------
var arrayItem = [];


//-----------submit button to add new item------------
var btn = document.getElementById('button');
btn.addEventListener('click', addItem);


//------------enter key submit-------------
textItem.onkeypress = function () {

    if (event.which == 13) {
        var inItemText = textItem.value;
        if (inItemText == "" || inItemText == " ") {
            alert("text box is empty");
            return false;
        }


        addItem();
        inItemText.value = "";
    }
};
updateItem();


//----------------counting to give id to item storing----------- 
var count = 1;
if (window.localStorage.todos) {
    arrayItem = JSON.parse(localStorage.getItem('todos'));
    for (i = 0; i < arrayItem.length; i++) {
        if (arrayItem[i].itemId > count) {
            count = arrayItem[i].itemId;
        }
    }
    count++;
}



//-------------adding checkbox event for strikethrough effect------ 

document.body.addEventListener("click", function () {

    //checkbox
    if (event.target.getAttribute("type") == "checkbox") {
        var chekb = document.getElementById(event.target.id);
        // console.log(chekb.checked);
        var arr = JSON.parse(localStorage.getItem('todos'));
        for (var i = 0; i < arr.length; i++) {
            if (event.target.id == arr[i].itemId) {
                if (arr[i].checkb) {
                    arr[i].checkb = false;
                } else {
                    arr[i].checkb = true;
                }
            }
        }
        localStorage.setItem('todos', JSON.stringify(arr));
        updateItem();
    }
});


//----------code for removing item--------------------

document.body.addEventListener("click", function (ev) {
    if (ev.target.tagName == 'IMG') {
        //console.log(ev.target.id);
        var arr = JSON.parse(localStorage.getItem('todos'));

        for (var i = 0; i < arr.length; i++) {

            if (event.target.id == arr[i].itemId) {
                arr.splice(i, 1);
            }
        }
        arrayItem = arr;
        localStorage.setItem('todos', JSON.stringify(arr));
        updateItem();
    }
});



//function to add item
function addItem() {
    var textInput = document.getElementById('textItem').value;
    if (textInput == '') {
        alert('please enter text in input');
    } else {
        document.getElementById('textItem').value = "";

        //creating object to store data
        var itemId = count++;
        let obj = {
            itemId: itemId,
            checkb: false,
            items: textInput
        };
        arrayItem.push(obj);
        localStorage.setItem('todos', JSON.stringify(arrayItem));

    }
    updateItem();
    //location.reload();
}

//updating item in the list
function updateItem() {
    var ul = document.getElementById('todoUl');
    ul.innerHTML = "";
    var arr = JSON.parse(localStorage.getItem('todos'));
    if (arr != null) {
        for (var i = 0; i < arr.length; i++) {
            var ul = document.getElementById('todoUl');
            var listItem = document.createElement('li');
            listItem.id = arr[i].itemId;
            listItem.draggable = true;
            listItem.setAttribute('ondragstart', 'dragstart_handler(event)');
            listItem.setAttribute('ondragover', 'dragover_handler(event)');
            listItem.setAttribute('ondrop', 'drop_handler(event)');

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = arr[i].checkb;
            checkbox.id = arr[i].itemId;
            var itemSpan = document.createElement('Span');
            itemSpan.innerText = arr[i].items;

            if (checkbox.checked) {
                itemSpan.className = 'checked';

            }


            //remove icon
            var rmIcon = document.createElement('img');
            rmIcon.setAttribute('src', 'remove.png');
            rmIcon.setAttribute('width', '14px');
            rmIcon.setAttribute('height', '14px');
            rmIcon.setAttribute('align', 'right');
            rmIcon.className = 'imgIcon';
            rmIcon.id = arr[i].itemId;

            ul.appendChild(listItem);
            listItem.appendChild(checkbox);
            listItem.appendChild(itemSpan);
            listItem.appendChild(rmIcon);
        }
    }
    //progress bar
    if (arr.length !== 0) {
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].checkb == true) {
                count++;
            }
        }
        var progress = Math.round(count / arr.length * 100);

        document.querySelector(".completion").style.width = progress + "%";
        document.querySelector(".task-completion").innerHTML = progress + "%" + " completed";
        document.querySelector(".task-completion").style.color = "white";
    } else {
        document.querySelector(".completion").style.width = "100%";
        document.querySelector(".task-completion").style.color = "transparent";
    }


}

//dragging operations
var index1;

function dragstart_handler(ev) {
    start = ev.target.id;
}

function dragover_handler(ev) {
    ev.preventDefault();
    drop = ev.target.id;
}

function drop_handler(ev) {
    let startIndex = 0;
    let dropIndex = 0;
    var arr = JSON.parse(localStorage.getItem('todos'));
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].itemId == start) {
            startIndex = i;
        }
        if (arr[i].itemId == drop) {
            dropIndex = i;
        }
    }
    var temp = arr[startIndex];
    arr.splice(startIndex, 1);
    arr.splice(dropIndex, 0, temp);
    localStorage.setItem('todos', JSON.stringify(arr));
    updateItem();
}