"use strict";
const myArr = new Array(9999).fill(0)
    .map(bla => Math.random() * window.innerWidth);
console.log(myArr.sort((a, b) => a - b));