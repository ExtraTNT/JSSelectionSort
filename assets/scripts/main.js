"use strict"
let countOfValues = 150;
let sleepTime = 10;
const BORDER_SORT_DIV_DIV = 1;
const BUFFER = 16;
const MAX_VALUE_OF_NUMBER = window.innerWidth - BORDER_SORT_DIV_DIV - BUFFER;
const INVISIBLE = "invisible";
const SORT_DIV_DIV_ARRAY = [];
const BUTTON_SIZE = 25;
const TABLE_CLASS = "tabled";

const startDiv = document.getElementById('startView');
const inputFieldsDiv = document.getElementById('inputFields');
const startButton = document.getElementById('startButton');
const sortDiv = document.getElementById('sortView');
const reloadButton = document.getElementById('reloadButton');
const mainText = document.getElementById('mainText');

const toggle = function(element){
  element.classList.toggle('invisible');
}
const reload = function(){ //dirty way
  window.open('./index.html');
  window.close();
}
const draw = function(arr){
  for (var i = 0; i < SORT_DIV_DIV_ARRAY.length; i++) {
    SORT_DIV_DIV_ARRAY[i].style.width = (arr[i] + "px");
  }
}
const Sleep = function(milliseconds) {
   return new Promise(resolve => setTimeout(resolve, milliseconds));
}
// Selection sort with O(n^2) time complexity
async function Selection_Sort(arr) { //can't use const async function -> giu stops working

  const compare = function(a, b) {
    return a - b; // use b - a; for reverse sorting
  }
  let min = 0;
  let index = 0;
  let temp = 0;
  for (let i = 0; i < arr.length; i += 1) {
    index = i;
    min = arr[i];
    for (let j = i + 1; j < arr.length; j += 1) {
      if (compare(min, arr[j]) > 0) {
        min = arr[j];
        index = j;

        await Sleep(sleepTime);
        draw(arr);
      }
    }
    temp = arr[i];
    arr[i] = min;
    arr[index] = temp;
  }
  console.log(arr); //logs the final array in the consol
  draw(arr); //final draw
  return arr;
}

const setup = function(){
  const setButtonHeight = function(){
    let btns = document.getElementsByTagName('button');
    for (let btn of btns) {
      btn.style.height = BUTTON_SIZE + "px";
    }
  }
  const createInputFields = function(){
    for (var i = 1; i <= countOfValues; i++) {
      let br = document.createElement('br');
      br.class = "br";
      let element = document.createElement('input');
      element.id = "in" + i;
      element.type = 'number';
      element.value = (Math.random()*MAX_VALUE_OF_NUMBER).toFixed();
      inputFieldsDiv.append(br);
      inputFieldsDiv.append(element);
    }
  }
  const setupSortDiv = function(){
    for (var i = 1; i <= countOfValues; i++) {
      let element = document.createElement('div');
      element.id = "div" + i;

      element.style.borderWidth = BORDER_SORT_DIV_DIV + "px";
      element.classList.add(TABLE_CLASS);

      SORT_DIV_DIV_ARRAY.push(element);
      element.style.height = ((((window.innerHeight -
        (countOfValues * (BORDER_SORT_DIV_DIV * 2)) - (BUTTON_SIZE + BUFFER)) /
        countOfValues)) + "px");
      sortDiv.append(element);
    }
  }
  const askInt = function(message, value){
    let tmp = parseInt(prompt(message, value));
    if(!Number.isInteger(tmp)){
      alert(tmp + " is not a number " + value + " is chosen!")
      tmp = value;
    }
    return tmp;
  }
  /*The Setp*/
  countOfValues = askInt("How many values?: ", countOfValues);
  sleepTime = askInt("How fast? (Sleep in ms): ", sleepTime);
  mainText.textContent = "Enter " + countOfValues + " values to sort:";
  createInputFields();
  setupSortDiv();
  setButtonHeight();
  toggle(startDiv);
}
const start = function(){
  const getAllValues = function(){
    let allValues = [];
    for (var element of inputFieldsDiv.children) {
      if(element.class != "br"){
        allValues.push(validateUserInput(element.value));
      }
    }
    return  allValues;
  }
  const validateUserInput = function(value){
    let int = parseInt(value);
    if(int > MAX_VALUE_OF_NUMBER || !Number.isInteger(int)){
      alert("Found an invalid value (to high or not a number)! Instead this value a random number is chosen");
      int = parseInt((Math.random()*MAX_VALUE_OF_NUMBER).toFixed());
    }
    return int;
  }
  /*The start of the sorting process*/
  const startArray = getAllValues();
  draw(startArray);
  toggle(startDiv);
  toggle(sortDiv);
  Selection_Sort(startArray);
}
/*Code: */
setup();
startButton.addEventListener('click', start);
reloadButton.addEventListener('click', reload);
