const taskContainer = document.querySelector(".task__container");
let globalStore= [];
console.log(taskContainer);

const generateNewCard = (taskData) =>
`
  <div class="col-sm-12 col-md-6 col-lg-4">
    <div class="card h-100">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-primary"><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
      </div>
      <div class="card-body">
        <img src=${taskData.imageUrl} class="card-img-top"
          alt="...">
        <h5 class="card-title fw-bold text-primary">${taskData.taskTitle}</h5>
        <p class="card-text">${taskData.taskDescription}</p>
        <a href="#" class="btn btn-primary">${taskData.taskType}</a>
      </div>
    </div>
  </div>
  </div>
  `
;

const loadInitialCardData = () => {
  //local storage to get tasky cards taskData
const getCardData = localStorage.getItem("tasky");

  //convert to normal objects
const {cards} = JSON.parse(getCardData);//parse is reverse of stringify //cards is object //destructing is used

  //loop over thode array of task object to create html card, inject it to document
cards.map((cardObject)=>{
  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

  //update or globalStore
  globalStore.push(cardObject);
})

};


// Delete function
const deleteCard = (event) => {
  event = window.event;
  const targetID=event.target.id;
  const tagname = event.target.tagName;
  //tagName is inbuilt

  globalStore = globalStore.filter((cardObject)=> cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

  if (tagname ==="BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};

const saveChanges = () => {
  const taskData = {
    id : `${Date.now()}`,//dynamic variable
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value
  };
//  console.log(taskData);//debbugging purpose


taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData)); // adding cards adjacent to each other

globalStore.push(taskData); // storing cards in local storage
//localStorage.setItem("tasky",globalStore); //tasky is our id
//pushed in form of object of object
localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));//object of object converted into array of objects using stringify

};
