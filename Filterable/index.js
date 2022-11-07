//get input elements
let filterInput = document.getElementById('filterinput');
//add event listener
filterInput.addEventListener('keyup', filterNames);

function filterNames() {
    //get value of input
    let filterInput = document.getElementById('filterinput').value.toUpperCase();
    //get name ui
    let ui = document.getElementById('names');
    //get li from ui
    let li = ui.querySelectorAll('li.collection-item');

    //loop through collectionslis
    for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName('a')[0];
        
        //if matched
        if(a.innerHTML.toUpperCase().indexOf(filterInput) > -1){
            li[i].style.display = '';
        }else{
            li[i].style.display = 'none';
        }
        
    }

}