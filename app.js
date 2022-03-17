let form = document.querySelector("#todoForm");
const input = document.getElementById('taskInput');


let resetButton = document.getElementById("resetButton");
let itemsArray = localStorage.getItem('items') ?
    JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));




form.addEventListener("submit", handleEvent);
// function randnum(min, max) {
//     return Math.round(Math.random() * (max - min) + min);
// }
const liDom = (task) => {
    let mainEl = document.createElement("div");
    mainEl.setAttribute("class", "d-flex bd-highlight  border border-dark rounded my-2 align-items-center container-task-elements");
    //Data Element
    let dataEl = document.createElement("div")
    dataEl.setAttribute("class", "p-2 w-100 bd-highlight taskContent");
    dataEl.innerText = ` ${task.toString().toUpperCase()} `
    // Close Element
    let closeEl = document.createElement("div");
    closeEl.setAttribute("class", "p-2 flex-shrink-1 bd-highlight border-left bg-danger taskRemove");
    let iconElonClickEl = document.createElement("i");
    iconElonClickEl.setAttribute("class", "bi bi-x-circle");
    let clickElonClose = document.createElement("a");
    clickElonClose.appendChild(iconElonClickEl);
    closeEl.appendChild(clickElonClose);
    // Add elements in main element
    mainEl.appendChild(dataEl);
    mainEl.appendChild(closeEl);
    return mainEl;

}



const inputValidation = (input) => {
    const result = input == "" ? true : false;
    return result;
}

const triggerToast = (text) => {

    let toastBody = document.querySelector(".toast-body");
    toastBody.innerText = `${text}`;
    return new bootstrap.Toast(document.querySelector('#basicToast')).show();

}
function addTask(input) {

    if (!inputValidation(input)) {

        itemsArray.push(input.toString().toLowerCase());
        localStorage.setItem('items', JSON.stringify(itemsArray));
        let ulDom = document.querySelector(".container-tasks");
        ulDom.appendChild(liDom(input));
        document.getElementById('taskInput').value = "";

    } else {
        triggerToast("Please fill all sections !");
    }

}
data.forEach((element) => {
    let containerTask = document.querySelector(".container-tasks");
    containerTask.appendChild(liDom(element));
})
resetButton.addEventListener('click', function () {
    localStorage.clear();
    const collection = document.querySelectorAll(".container-task-elements");
    for (const elem of collection) {
        elem.remove();
    }
    itemsArray = [];
    triggerToast("Task's removed!")
});
function handleEvent(event) {

    event.preventDefault();
    // let elDeadline = document.querySelector("#deadlineInput").value.toString().toUpperCase();
    addTask(input.value);

    setTimeout(() => {
        window.location.reload();
    }, 3000)


}



let removeElements = document.querySelectorAll(".taskRemove");
removeElements.forEach(re => {
    re.addEventListener('click', () => {

        let removeElement = re.parentNode.firstElementChild.innerText.toLowerCase();
        let removeidx = 0;
        const data = JSON.parse(localStorage.getItem('items'));
        data.forEach((element, index) => {

            element == removeElement ? removeidx = index : false;

        });
        data.splice(removeidx, 1);
        localStorage.setItem('items', JSON.stringify(data));

        window.location.reload();




    });
});