// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/ES6main.js":[function(require,module,exports) {
"use strict";

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

const toggle = function (element) {
  element.classList.toggle(INVISIBLE);
};

const reload = function () {
  //dirty way
  window.open('./index.html');
  window.close();
};

const draw = function (arr) {
  for (var i = 0; i < SORT_DIV_DIV_ARRAY.length; i++) {
    SORT_DIV_DIV_ARRAY[i].style.width = arr[i] + "px";
  }
};

const Sleep = function (milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}; // Selection sort with O(n^2) time complexity


async function Selection_Sort(arr) {
  //can't use const async function -> giu stops working
  const compare = function (a, b) {
    return a - b; // use b - a; for reverse sorting
  };

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

const setup = function () {
  const setButtonHeight = function () {
    let btns = document.getElementsByTagName('button');

    for (let btn of btns) {
      btn.style.height = BUTTON_SIZE + "px";
    }
  };

  const createInputFields = function () {
    for (var i = 1; i <= countOfValues; i++) {
      let br = document.createElement('br');
      br.class = "br";
      let element = document.createElement('input');
      element.id = "in" + i;
      element.type = 'number';
      element.value = (Math.random() * MAX_VALUE_OF_NUMBER).toFixed();
      inputFieldsDiv.append(br);
      inputFieldsDiv.append(element);
    }
  };

  const setupSortDiv = function () {
    for (var i = 1; i <= countOfValues; i++) {
      let element = document.createElement('div');
      element.id = "div" + i;
      element.style.borderWidth = BORDER_SORT_DIV_DIV + "px";
      element.classList.add(TABLE_CLASS);
      SORT_DIV_DIV_ARRAY.push(element);
      element.style.height = (window.innerHeight - countOfValues * (BORDER_SORT_DIV_DIV * 2) - (BUTTON_SIZE + BUFFER)) / countOfValues + "px";
      sortDiv.append(element);
    }
  };

  const askInt = function (message, value) {
    let tmp = parseInt(prompt(message, value));

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

const start = function () {
  const getAllValues = function () {
    let allValues = [];

    for (var element of inputFieldsDiv.children) {
      if (element.class != "br") {
        allValues.push(validateUserInput(element.value));
      }
    }

    return allValues;
  };

  const validateUserInput = function (value) {
    let int = parseInt(value);

    if (int > MAX_VALUE_OF_NUMBER || !Number.isInteger(int)) {
      alert("Found an invalid value (to high or not a number)! Instead this value a random number is chosen");
      int = parseInt((Math.random() * MAX_VALUE_OF_NUMBER).toFixed());
    }

    return int;
  };
  /*The start of the sorting process*/


  const startArray = getAllValues();
  draw(startArray);
  toggle(startDiv);
  toggle(sortDiv);
  Selection_Sort(startArray);
};
/*Code: */


setup();
startButton.addEventListener('click', start);
reloadButton.addEventListener('click', reload);
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "39673" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/ES6main.js"], null)
//# sourceMappingURL=/ES6main.53808c2d.js.map