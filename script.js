const listsContainer=document.querySelector('[data-lists]')
const newListForm=document.querySelector(`[data-new-list-form]`)
const newListInput=document.querySelector(`[data-new-list-input]`)

const LOCAL_STORAGE_LIST_KEY='task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY='task.selectedListId'

const deleteListButton =document.querySelector(`[data-delete-list-button]`)
//
let ss=[1,2,3,4,"om"]
let omar=ss.filter(e=>{
    return e===e.toString();
})
//
let lists=JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY))
|| [];//get local storge if have,if not then create empty array
let selectedListId=localStorage.getItem
(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);// return null if not exisit or empty

listsContainer.addEventListener('click',e=>{ //put listener to the container (ul) ,
    if(e.target.tagName.toLowerCase()=='li'){ //any element in this container compair it and see if it's li elment
        selectedListId=e.target.dataset.listId;
        saveAndRrender();
    }
})
newListForm.addEventListener(`submit`,e=>{
    e.preventDefault()
    const listName=newListInput.value;

    if(listName==null || listName==="")return

    const list=createList(listName)
    newListInput.value=null
    lists.push(list)
    saveAndRrender()
})

deleteListButton.addEventListener('click',e=>{// this myway to write the function
   lists.forEach((e,index)=>{
       if(e.id==selectedListId){
           lists.splice(index,1) 
       }
   })
   selectedListId=null
    saveAndRrender()
}
)

function createList(name){
    // this.name={
    //     id:lists.length+1,
    //     name:name}
    return {id:Date.now().toString(),
            name:name,
            tasks:[]}

}

function saveAndRrender(){
    save()
    render()
}

function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

function render(){
    clearElement(listsContainer);
    lists.forEach(list =>{
        const listElement=document.createElement('li');
        listElement.dataset.listId=list.id
        listElement.classList.add('list-name');
        listElement.innerText=list.name;

        if(list.id===selectedListId) {
        listElement.classList.add('active-list')
        }
        listsContainer.appendChild(listElement);
    })
}

function clearElement(element){
   while(element.firstChild){
        element.removeChild(element.firstChild)
      //or just use element.innerHTML='' without loop
    }
    

}
render()