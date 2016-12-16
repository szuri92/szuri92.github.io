let contentList = 0;
let myTask;
let taskHtml;
let myTaskList = document.querySelector('ul');
let addItem = document.querySelector('.add_task');
console.log(addItem);
let text = document.querySelector('.inputfield')

function getInputText () {
  myTask = text.value
}

function showAllTask() {
  myTaskList.innerHTML = ''
  if (contentList != 0){
    for(let i = 0; i < contentList.length; i++)  {
      let myListItem = document.createElement('li');
      let taskHtml = "<p class=" + contentList[i].id + ">"+contentList[i].text+"</p><div class = 'del_check'><button class="+contentList[i].id +"></button><div class =" +contentList[i].completed+ " id ="+contentList[i].id+ "></div>"
      myListItem.innerHTML = taskHtml;
      myTaskList.appendChild(myListItem)
    }
    deleteTask();
    completeTask();
  }
}

function getData() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://mysterious-dusk-8248.herokuapp.com/todos");
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      contentList = JSON.parse(xhr.response).reverse();
      showAllTask();
    }
  }
}

function postData() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST","https://mysterious-dusk-8248.herokuapp.com/todos");
  if ( myTask != '') {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({text: myTask}));
  }
}

function delData(id) {
  let xhr =  new XMLHttpRequest();
  xhr.open("DELETE", "https://mysterious-dusk-8248.herokuapp.com/todos/"+ id);
  xhr.send();
}

function changeData(data, bol, id) {
  let xhr = new XMLHttpRequest();
  xhr.open("PUT", "https://mysterious-dusk-8248.herokuapp.com/todos/"+ id);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({text: data, completed: bol}));
}

addItem.addEventListener('click', function(){
  getInputText();
  postData();
  getData();
  text.value = '';
});

function deleteTask() {
  let myDelButton = document.querySelectorAll('ul button');
  myDelButton.forEach(function(e){
    e.addEventListener('click', function(e){
      console.log(e.target)
      delData(e.target.className);
    });
  });
}

function completeTask() {
  let myCheckButton = document.querySelectorAll('.del_check div');
  let myTaskName = document.querySelectorAll('p');
  myCheckButton.forEach(function(e, i){
    e.addEventListener('click', function(e){
      if(e.target.className === 'true'){
        changeData(myTaskName[i].innerText, false, e.target.id);
      } else if(e.target.className ==='false') {
        changeData(myTaskName[i].innerText, true, e.target.id);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function(){
  getData();
  showAllTask();
});

setInterval(getData, 2000);
