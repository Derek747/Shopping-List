// Shopping List

var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var liToggle = document.querySelectorAll("li"); // This is an array of all the items on the list.

// DELETE ITEM VIA DELETE BUTTON
function deleteItem(event) {
    event.target.parentNode.remove();
    // console.log(event.target);       used this as a check
}
// deleteItem is referenced once in the code below.
// event.target returns the element that was triggered by the event which is <button>Delete</button>. If I take out parentNode the code only removes the button when the delete button is clicked, the li item remains in place. By having parentNode, the code removes the parent of the delete button which is the li item, and consequentially the delete button.

// STRIKETHROUGH
function changeStyle() {
    this.classList.toggle("done");
}
// changeStyle is referenced twice in the code below. Once for the static items and once for the dynamic items.
// this is used instead of li because the function says li is undefined, which I still don't fully understand. However, with this, the function works as it should. From my understanding, this uses the element (li) from addEventListener where changeStyle is called. (I'm sure we'll learn more about this in the future.)

// LISTENS FOR CLICK FOR STRIKETHROUGH
liToggle.forEach(function(item) { 
    item.addEventListener("click", changeStyle);
});
// "item" is an arbitary term for each element in the array. Code reads: For each "item" in the list provided by the array liToggle, run the function item.addEventListener("click", changeStyle). If a click for an item if heard, it runs the changeStyle for that individual item.

// CREATE DEFAULT ITEMS
function LoadList() {
    createListElement("Apple")
    createListElement("Jello")
    createListElement("Spinach")
    createListElement("Rice")
    createListElement("Birthday")
    createListElement("Candles")
}
// LoadList is immediately exectued after index.html is loaded. (See notes in index.html file.) When the page is loaded, each of these default items are immediately run through the function createListElement as if it were a new item. This way, the default items are easily subjected to the same functions as the dynamic items that are created by entering items into the userinput bar. Otherwise, I'd have to create completely different functions specifically for the static items (loaded in index.html) and the dynamic items (created through script.js). This way is more efficent and clear.

// CREATE NEW ITEM
function createListElement(name) { // name is the input.value
    var li = document.createElement("li"); // Creates new li element
    li.appendChild(document.createTextNode(name)); // Appends input.value to a new li element
    ul.appendChild(li); // Appends li element to ul
    input.value = ""; // Returns the value of input.value to nothing
    li.addEventListener("click", changeStyle); // Listens for strikethrough


    var deleteButton = document.createElement("button"); // Creates a delete button
    deleteButton.appendChild(document.createTextNode("Delete")); // Appends "Delete" to button
    li.appendChild(deleteButton); // Appends button to li element
    deleteButton.onclick = deleteItem; // Calls the function deleteItem when the delete button is clicked.
}

// LENGTH OF INPUT
function inputLength() {
    return input.value.length;
}

// IF CLICK, RUN CREATELISTELEMENT
function addListAfterClick() {
        if (inputLength() > 0) {
            createListElement(input.value);
        }
}
// Runs createListElement using input.value

// IF KEYPRESS, RUN CREATELISTELEMENT
function addListAfterKeypress(event) {
        if (inputLength() > 0 && event.keyCode === 13) {
            createListElement(input.value);
        }
}
// Runs createListElement using input.value

// EVENT LISTENER FOR CLICK
button.addEventListener("click", addListAfterClick);

// EVENT LISTENER FOR KEYPRESS
input.addEventListener("keypress", addListAfterKeypress);