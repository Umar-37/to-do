const listsContainer=document.querySelector('[data-lists]')
const newListForm=document.querySelector(`[data-new-list-form]`)
const newListInput=document.querySelector(`[data-new-list-input]`)


let lists=[{
id:1,
name: "solve homework"
},{
id:2,
name:"sleep"}]

newListForm.addEventListener(`submit`,e=>{
    e.preventDefault()
    const listName=newListInput.value;
    console.log(listName)
    if(listName==null || listName==="")return
    const list=createList(listName)
    newListInput.Value=null
    lists.push(list)
    console.log(lists[2].id)
    render()
})

function createList(name){
    // this.element={
    //     id:lists.length,
    //     name:element.Value}
    // lists.push(this.element)
    // console.log(this.element)
    return {id:Date.now().toString,
            name:name,
            tasks:[]}

}

function render(){
    clearElement(listsContainer);
    lists.forEach(list =>{
        const listElement=document.createElement('li');
        listElement.dataset.listId=list.id
        listElement.classList.add('list-name');
        listElement.innerText=list.name;
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