"use strict";

var countOfValues = 150;
var sleepTime = 10;
var BORDER_SORT_DIV_DIV = 1;
var BUFFER = 16;
var MAX_VALUE_OF_NUMBER = window.innerWidth - BORDER_SORT_DIV_DIV - BUFFER;
var INVISIBLE = "invisible";
var SORT_DIV_DIV_ARRAY = [];
var BUTTON_SIZE = 25;
var TABLE_CLASS = "tabled";
var startDiv = document.getElementById('startView');
var inputFieldsDiv = document.getElementById('inputFields');
var startButton = document.getElementById('startButton');
var sortDiv = document.getElementById('sortView');
var reloadButton = document.getElementById('reloadButton');
var mainText = document.getElementById('mainText');

var toggle = function toggle(element) {
  element.classList.toggle(INVISIBLE);
};

var reload = function reload() {
  //dirty way
  window.open('./index.html');
  window.close();
};

var draw = function draw(arr) {
  for (var i = 0; i < SORT_DIV_DIV_ARRAY.length; i++) {
    SORT_DIV_DIV_ARRAY[i].style.width = arr[i] + "px";
  }
};

var Sleep = function Sleep(milliseconds) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, milliseconds);
  });
}; // Selection sort with O(n^2) time complexity


async function Selection_Sort(arr) {
  //can't use const async function -> giu stops working
  var compare = function compare(a, b) {
    return a - b; // use b - a; for reverse sorting
  };

  var min = 0;
  var index = 0;
  var temp = 0;

  for (var i = 0; i < arr.length; i += 1) {
    index = i;
    min = arr[i];

    for (var j = i + 1; j < arr.length; j += 1) {
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

var setup = function setup() {
  var setButtonHeight = function setButtonHeight() {
    var btns = document.getElementsByTagName('button');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = btns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var btn = _step.value;
        btn.style.height = BUTTON_SIZE + "px";
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  var createInputFields = function createInputFields() {
    for (var i = 1; i <= countOfValues; i++) {
      var br = document.createElement('br');
      br.class = "br";
      var element = document.createElement('input');
      element.id = "in" + i;
      element.type = 'number';
      element.value = (Math.random() * MAX_VALUE_OF_NUMBER).toFixed();
      inputFieldsDiv.append(br);
      inputFieldsDiv.append(element);
    }
  };

  var setupSortDiv = function setupSortDiv() {
    for (var i = 1; i <= countOfValues; i++) {
      var element = document.createElement('div');
      element.id = "div" + i;
      element.style.borderWidth = BORDER_SORT_DIV_DIV + "px";
      element.classList.add(TABLE_CLASS);
      SORT_DIV_DIV_ARRAY.push(element);
      element.style.height = (window.innerHeight - countOfValues * (BORDER_SORT_DIV_DIV * 2) - (BUTTON_SIZE + BUFFER)) / countOfValues + "px";
      sortDiv.append(element);
    }
  };

  var askInt = function askInt(message, value) {
    var tmp = parseInt(prompt(message, value));

    if (!Number.isInteger(tmp)) {
      alert(tmp + " is not a number " + value + " is chosen!");
      tmp = value;
    }

    return tmp;
  };
  /*The Setp*/


  countOfValues = askInt("How many values?: ", countOfValues);
  sleepTime = askInt("How fast? (Sleep in ms): ", sleepTime);
  mainText.textContent = "Enter " + countOfValues + " values to sort:";
  createInputFields();
  setupSortDiv();
  setButtonHeight();
  toggle(startDiv);
};

var start = function start() {
  var getAllValues = function getAllValues() {
    var allValues = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = inputFieldsDiv.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var element = _step2.value;

        if (element.class != "br") {
          allValues.push(validateUserInput(element.value));
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return allValues;
  };

  var validateUserInput = function validateUserInput(value) {
    var int = parseInt(value);

    if (int > MAX_VALUE_OF_NUMBER || !Number.isInteger(int)) {
      alert("Found an invalid value (to high or not a number)! Instead this value a random number is chosen");
      int = parseInt((Math.random() * MAX_VALUE_OF_NUMBER).toFixed());
    }

    return int;
  };
  /*The start of the sorting process*/


  var startArray = getAllValues();
  draw(startArray);
  toggle(startDiv);
  toggle(sortDiv);
  Selection_Sort(startArray);
};
/*Code: */


setup();
startButton.addEventListener('click', start);
reloadButton.addEventListener('click', reload);
