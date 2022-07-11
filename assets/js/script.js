M.AutoInit();

$(".dropdown-trigger").dropdown();
var containerEl = document.querySelector('.container');
var newStringSubmitEl = document.getElementById('newStringSubmit');
// addedStrings = JSON.parse(localStorage.getItem())
newStringSubmitEl.addEventListener('click', addString);
function addString(event) {
    // event.preventDefault();
    var newStringKeyInputEl = document.getElementById('newStringKeyInput');
    var newStringValueInputEl = document.getElementById('newStringValueInput');
    var newStringName = newStringKeyInputEl.value;
    var newStringContent = newStringValueInputEl.value;
    localStorage.setItem(newStringName, newStringContent);
}
for (i=0; i<localStorage.length; i++) {
    newString = document.createElement('a');
    newString.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red');
    newString.setAttribute('href', localStorage.getItem(localStorage.key(i)));
    newString.innerHTML = localStorage.key(i)
    newString.setAttribute('target', '_blank');
    containerEl.appendChild(newString);
}
