let log=console.log //ease of use console.log()

const listsContainer=document.querySelector('[data-lists]')
const newListForm=document.querySelector(`[data-new-list-form]`)
const newListInput=document.querySelector(`[data-new-list-input]`)

const LOCAL_STORAGE_LIST_KEY='task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY='task.selectedListId'

const deleteListButton =document.querySelector(`[data-delete-list-button]`)

const listDisplayContainer=document.querySelector(`[data-list-display-container]`)
const listTitleElement =document.querySelector(`[data-list-titile]`)
const listCountElement =document.querySelector(`[data-list-count]`)
const tasksContainer   =document.querySelector(`[data-tasks]`)
const taskTemplate =document.getElementById('task-template') //for adding tasks

const newTaskForm =document.querySelector('[data-new-task-form]')
const newTaskInput =document.querySelector('[data-new-task-input]')

let lists=JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY))
|| [];//get local storge if have,if not then create empty array
    
let selectedList={
    Id:localStorage.getItem
(LOCAL_STORAGE_SELECTED_LIST_ID_KEY),// return null if not exisit or empty
    name:'',
    tasks:[]
}
listsContainer.addEventListener('click',e=>{ //put listener to the container (ul) ,
    if(e.target.tagName.toLowerCase() == 'li'){ //any element in this container compair it and see if it's li elment
        selectedList.Id=e.target.dataset.listId;
        selectedList.name=e.target.innerText;
        selectedList.tasks=lists[theSelected(lists,selectedList.Id)].tasks
        log(selectedList)
        saveAndRrender();
    }
})
newListForm.addEventListener(`submit`,e=>{ //use this code again in 
    e.preventDefault()                     //any project
    const listName=newListInput.value;      //it check whether you submit valid input and not empty string
    if(listName==null || listName==="")return //and not empty string

    const list=createList(listName)
    //selectedList.tasks=list.tasks
    newListInput.value=null//clear the input field
    lists.push(list)
    saveAndRrender()
})

newTaskForm.addEventListener(`submit`,e=>{ //use this code again in 
    e.preventDefault()                     //any project
    const taskName=newTaskInput.value;      //it check whether you submit valid input and not empty string
    if(taskName==null || taskName=="")return //and not empty string

    const task=createTask(taskName)//omar please check whether this done in the else or not
    let theIndex=theSelected(lists,selectedList.Id)
    lists[theIndex].tasks.push(task)
    selectedList.tasks=lists[theIndex].tasks
    newTaskInput.value=null //clear the input field

    saveAndRrender()
})
deleteListButton.addEventListener('click',e=>{// this myway to write the function
   lists.forEach((e,index)=>{
       if(e.id==selectedList.Id){
           lists.splice(index,1) 
       }
   })
   selectedList.Id=null
    saveAndRrender()
}
)

function createList(name){
    // this.name={
    //     id:lists.length+1,
    //     name:name}
    return {id:Date.now().toString(),
            name:name,
            tasks:[{
                Id:1,
                name:'dfdkfdkfjdkf',
                complete:true
            }]}

}
function createTask(name){
    return {id:Date.now().toString(),name:name, complete:false }

}

function saveAndRrender(){
    save()
    render()
}

function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedList.Id)
}
function render(){
    clearElement(listsContainer);
    renderLists();    
    if(selectedList.Id==null){ //if we dont select any element in list
        listDisplayContainer.style.display=`none` //then hide the list
    }else{
        listDisplayContainer.style.display=``// put it as it was
        listTitleElement.innerText=selectedList.name
        //listCountElement.innerText=tasksContainer.childElementCount
        renderTaskCount(selectedList)
        clearElement(tasksContainer)//this and 
        renderTasks(selectedList)//this 
    }
}
//------------------------ Funtion area ---------------
function theSelected(lists,theIndex){//return index of the element we selected
        return lists.findIndex(e=> e.id==theIndex)
        }

function renderTasks(selectedList){
    console.table(selectedList)
    selectedList.tasks.forEach(task=>{
        const taskElement =document.importNode(taskTemplate.content,true)// true very important to import all template content not just the first tag
        const checkbox =taskElement.querySelector('input')
        checkbox.id=task.Id
        log(task.Id)
        log(task.name)
        checkbox.checked=task.complete 
        const label =taskElement.querySelector('label')
        label.htmlFor=task.Id
        label.append(task.name)//apend textg after the last child of the Element
        tasksContainer.appendChild(taskElement)
    })
}

function renderTaskCount(selectedList){
    const incompleteTasksCount = selectedList.tasks.filter(task=> {
        return task.complete==false }
        ).length //convert to number 
    const taskString=incompleteTasksCount === 1 ? "task" : "tasks"
    listCountElement.innerText=`${incompleteTasksCount} ${taskString}  remaining`
}
function renderLists(){
    lists.forEach(list =>{
        const listElement=document.createElement('li');
        listElement.dataset.listId=list.id
        listElement.classList.add('list-name');
        listElement.innerText=list.name;

        if(list.id===selectedList.Id){
        listElement.classList.add('active-list')
        }
        listsContainer.appendChild(listElement);
    })
}

function clearElement(element){
   while(element.firstChild){
        element.removeChild(element.firstChild)
      //or just use element.innerHTML='' without loop not sure about that
    }
    

}
render()