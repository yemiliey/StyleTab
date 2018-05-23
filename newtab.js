// function Todo(id,task){
//     this.id = id;
//     this.task = task;
//     this.checked = false;
// }
// var todos =new Array();

// window.onload = init;
// function init(){
//     getTodoItems();
// }


////////////////////////////////////////////////////////////
// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
////////////////////////////////////////////
  // var id = todos.length;
  // var todoItem = new Todo(id,inputValue);
  // todos.push(todoItem);

  // if (localStorage){
  //   var key = "todo" + id;
  //   var item = JSON.stringify(todoItem);
  //   localStorage.setItem(key,item);
  // } else {
  //   console.log("Error: you don't have localStorage!");
  // }
////////////////////////////////////////////
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  
  //hide the element when clicked
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

//////////////////////////////////////////////////////////////////

// function getTodoItems(){
//     if (localStorage) {
//         for (var i = 0; i < localStorage.length; i ++) {
//             var key = localStorage.key(i);
//             if (key.substring(0,4)=="todo") {
//                 var item = localStorage.getItem(key);
//                 var todoItem = JSON.parse(item);
//                 todos.push(todoItem);
//             }
//         }
//         addTodosToPage();
//     }
//     else {
//         console.log("Error: you don't have localStorage!")
//     }
// }
// function addTodosToPage() {
//     for (var i = 0; i < todos.length; i++) {
//       var todoItem = todos[i];
//       var li = document.createElement("li");
//       var t = document.createTextNode(todoItem);
//       li.appendChild(t);
//       document.getElementById("myUL").appendChild(li);
//       var span = document.createElement("SPAN");
//       var txt = document.createTextNode("\u00D7");
//       span.className = "close";
//       span.appendChild(txt);
//       li.appendChild(span);
//     }
// }


// tttttttttttttttt    this is the division for weather forecast   tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt

var queryURL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%2023396898&format=json&env=store/";

$.getJSON(queryURL, function (data) {
    
function FtoC(temp) {
    return Math.round((temp - 32) / (9 / 5));
}
  var results = data.query.results.channel;
  var city = results.location.city;
  var region = results.location.region;
  var time = results.item.condition.date;
  var temp = FtoC(results.item.condition.temp);
  var text = results.item.condition.text;

var i = 0;
var item = results.item.forecast[0];
var prevbtn = document.querySelector("#prev");
var nextbtn = document.querySelector("#next");

prevbtn.addEventListener("click",function(){
    if(i != 0){
        i -= 1;
        var item = results.item.forecast[i];
        $('#date').html(item.day + ". " + item.date);
        $('#low').html(FtoC(item.low));
        $('#high').html(FtoC(item.high)); 
        $('#text').html(item.text);
}
})

nextbtn.addEventListener("click",function(){
    if(i != 9){
        i += 1;
        var item = results.item.forecast[i];
        $('#date').html(item.day + ". " + item.date);
        $('#low').html(FtoC(item.low));
        $('#high').html(FtoC(item.high)); 
        $('#text').html(item.text);
}
})

  // var weather = document.getElementById("weather");
$('#location').append(city + ". " + region);
$('#time').append(time);
$('#date').html(item.day + ". " + item.date);
$('#low').html(FtoC(item.low));
$('#high').html(FtoC(item.high)); 
$('#text').html(item.text);

})


// eeeeeeeeeeeee  this is the division line for time  eeeeeeeeeeeeeeeeeeeeeee
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  $('#curtime').html(h + ":" + m + ":" + s);
  t = setTimeout(function() {
    startTime()
  }, 500);
}
startTime();

// rrrrrrrrrrrr       this is the division line for changing header    rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
// randomly select quotes from the array according to different time zone user is in
// and every refresh of the page triggers the function to run and a random quote will be selected

var titlequotes=[
'Good Morning Emily!',
'You will never have this day again',
'Check the weather and don\'t catch cold!',
'Check Piazza Often!',
'Good Afternoon Emily!',
'Smile! :)',
'Good Evening Emily!',
'Never regret a day in your life',
'Sweet Dream ~',
'Don\'t stay up too late!'
]

var subquotes=[
'Start your day listing Todo\'s',
'so make it count',
'To see the world, things dangerous to come to, to see behind walls, to draw closer, to find each other and to feel.',
'Be clear of where you really want to head for.',
'Why are you trying so hard to fit in when you were born to stand out?',
'To find something, anything, a great truth or a lost pair of glasses, you must first believe there will be some advantage in finding it.',
'In the end it\'s all nice',
'Let it be',
'Good job today',
'Think about tomorrow\'s menu !'
]
var j;
function changeQuote(){
  var today = new Date();
  var h = today.getHours();
  if ((h > 4)&&(h < 12)) {
    j = 0;
  } else if ((h >=12)&& (h < 18)) {
    j = 3;
  } else j = 6;
    var randNum = Math.floor(Math.random()*3+j); //generate integers from 0 to 2 ??? can we hit 3???
    $('#header').text(titlequotes[randNum]);
    $('#subheader').text(subquotes[randNum]);
}

changeQuote();