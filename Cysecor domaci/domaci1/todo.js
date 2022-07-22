//promenljive
var addNewItem = document.querySelector('#add-new');
var newTask = document.querySelector('#new-task');
var todoList = document.querySelector('#todo-list')

addNewItem.addEventListener('click', dodaj)

function dodaj() {
    if(newTask.value.trim().length !== 0) {
        let newEl = document.createElement("div")
        newEl.className = "item"
    
        let newSpan = document.createElement("span")
        newSpan.className = "task"
        newSpan.innerText = newTask.value
    
        let newBtn = document.createElement("button")
        newBtn.classList.add("material-icons")
        newBtn.classList.add('delete')
        newBtn.innerText = "delete"
    
        newBtn.addEventListener("click", obrisi);

        newEl.appendChild(newSpan)
        newEl.appendChild(newBtn)
    
        todoList.appendChild(newEl)
    
        newTask.value = ""
    }
    else {
        alert("Morate upisati task da bi ste ga dodali")
    }
}

function obrisi() {
    if(confirm("Da li zelite da obrisete izabrani task?")) {
        var div = this.parentElement
        todoList.removeChild(div)
    }
}