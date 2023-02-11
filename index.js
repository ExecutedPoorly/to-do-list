const itemstop = document.querySelector(".topleftside");
let storageArray = [];
let ProjectArray = [];
const contentBody = document.querySelector(".maincontent-todo");

if (localStorage.getItem('Projects') !== null){
  storageArray = JSON.parse(localStorage.getItem('Projects'));
  refreshCards();
}
topleftsidePopulator();

function topleftsidePopulator(){
  const topleftside = document.querySelector('.topleftside');
  topleftside.innerHTML = `<div class="projects" id="leftitems">Projects</div>`;
  ProjectArray.forEach((element) => {
    const newProject = document.createElement('button');
    newProject.classList.add(element);
    newProject.id = "leftitems";
    newProject.innerText = element;
    topleftside.appendChild(newProject);
  })
  const leftSideItems = document.querySelectorAll('#leftitems');
  leftSideItems.forEach((element) => {
    element.addEventListener('click', () => {
      getProjectButton(element);
    })
  })
}


function getProjectButton(button){
  contentBody.innerText = "";
  if (button.innerText == "Projects"){
    refreshCards();
  }
  else {
  storageArray.forEach((entry, index) => {
    if (entry.project == button.innerText){
      console.log(entry.project, button.innerText, "aaah");
      buildCards(entry, index);
      
      
    }
  })
  }
}

function getProjects(){
  storageArray.forEach((item) => {
    if (item.project !== null && item.project !== NaN && item.project != "" && !ProjectArray.includes(item.project)){
      ProjectArray.push(item.project);
    }
    else {
      console.log(item.project, "error")
    }  
    }
  )
}

function mainFunction(currentButton) {
  if (currentButton.innerText === "Todo List") {
    console.log("todo");
  } else if (currentButton.innerText === "Projects") {
    console.log("project");
  } else {
    myform.parentNode.style.visibility = "visible";
  }
  console.log(currentButton);
}




function buildCards(element, index) {
  const createCard = document.createElement("div");
  createCard.classList.add("Card");
  createCard.innerHTML = `<p>Title: ${element.title}</p>${element.date}<p>${element.project}</p>`;
  //delete button
  const createDeleteButton = document.createElement("button");
  createDeleteButton.innerText = "x";
  createDeleteButton.style.backgroundColor = "red";
  createDeleteButton.className = "deletebutton";

  createDeleteButton.addEventListener('click', () => {
    console.log(index);
    onDelete(index);
  });
  createCard.appendChild(createDeleteButton);
  contentBody.appendChild(createCard);
}

function refreshCards() {
  contentBody.innerText = ""; //clears
  localStorage.setItem('Projects', JSON.stringify(storageArray));
  storageArray.forEach((element, index) => {
    buildCards(element, index);
  })

  ///call buildcards()
}

function dateConstructor(title, date, project) {
  this.title = title;
  this.date = date;
  this.project = project; 
}

function addBookToLibrary(title, date, project) {
  const newDate = new dateConstructor(title, date, project);
  storageArray.push(newDate);
  console.log(storageArray);
  getProjects();
  topleftsidePopulator();
  refreshCards();
}

function onDelete(index){
  storageArray.splice(index, 1);
  refreshCards();  
}


//////////////////////////////////////listener////////////////////////
document.getElementById("myform").onsubmit = function () {
  addBookToLibrary(myform.Title.value, myform.Date.value, myform.Project.value);
  myform.reset();
  myform.parentNode.style.visibility = "hidden";
  return false;
};

const ButtonList = document.querySelectorAll("#leftitems");
ButtonList.forEach((currentButton) => {
  currentButton.addEventListener("click", () => {
    mainFunction(currentButton);
  });
});


refreshCards(); //run once to display default