const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    "Elon Musk",
    "Bernard Arnault",
    "Gautam Adani",
    "Jeff Bezos",
    "Bill Gates",
    "Warren Buffett",
    "Larry Ellison",
    "Larry Page",
    "Mukesh Ambani",
    "Sergey Brin",
]

//store list items 
const listItems = [];

let dragStartIndex;

createList();

//insert list into DOM
function createList () {
    [...richestPeople]
        .map(a => ({value: a, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, i) => {
            let listItem = document.createElement('li');
            listItem.setAttribute('data-index', i);

            listItem.innerHTML = `
                <span class="number"> ${i + 1} </span>
                <div class="draggable" draggable="true">
                    <p class="person-name">${person} </p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        })
    //add drag and drop events
    addEventListeners();
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })

}

//drag start event
function dragStart(){
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    
}

function dragOver(e){
    e.preventDefault();
}

function dragDrop(){
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex)

    this.classList.remove('over');
}

//swap list items that are drag and drop
function swapItems (fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function dragEnter(){
    this.classList.add('over')
}

function dragLeave(){
    this.classList.remove('over')
}

//check list items that are button clicked
function checkOrder(){
    listItems.forEach((listItem, i) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richestPeople[i]){
            listItem.classList.add('wrong')
        }else{
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
}

check.addEventListener('click', checkOrder);