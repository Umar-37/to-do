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

let lists=JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY))
|| [];//get local storge if have,if not then create empty array
let selectedList={
    Id:localStorage.getItem
(LOCAL_STORAGE_SELECTED_LIST_ID_KEY),// return null if not exisit or empty
    name:''}

listsContainer.addEventListener('click',e=>{ //put listener to the container (ul) ,
    if(e.target.tagName.toLowerCase() == 'li'){ //any element in this container compair it and see if it's li elment
        selectedList.Id=e.target.dataset.listId;
        selectedList.name=e.target.innerText;
        saveAndRrender();
    }
})
newListForm.addEventListener(`submit`,e=>{
    e.preventDefault()
    const listName=newListInput.value;

    if(listName==null || listName==="")return

    const list=createList(listName)
    selectedList.tasks=list.tasks
    console.table(selectedList)
    newListInput.value=null
    lists.push(list)
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
function renderTasks(selectedList){
    selectedList.tasks.forEach(task=>{
        const taskElement =document.importNode(taskTemplate.content,true)// true very important to import all template content not just the first tag
        const checkbox =taskElement.querySelector('input')
        checkbox.id=task.Id
        checkbox.checked=task.complete 
        const label =taskElement.querySelector('label')
        label.htmlFor=task.Id
        label.append(task.name)//apend text after the last child of the Element
        tasksContainer.appendChild(taskElement)
    })
}

function renderTaskCount(selectedList){
    const incompleteTasksCount = selectedList.tasks.filter(task=> {
        return task.complete==false }
        ).length //convert to number 
    console.log(incompleteTasksCount)
    //
    const taskString=incompleteTasksCount === 1 ? "task" : "tasks"
    listCountElement.innerText=`${incompleteTasksCount} ${taskString}`
}
function renderLists(){
    lists.forEach(list =>{
        const listElement=document.createElement('li');
        listElement.dataset.listId=list.id
        listElement.classList.add('list-name');
        listElement.innerText=list.name;

        if(list.id===selectedList.Id) {
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