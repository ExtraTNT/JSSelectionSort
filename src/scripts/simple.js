"use strict";
const myArr = new Array(9999).fill(0)
    .map(()=> Math.random() * window.innerWidth);
console.log(myArr.sort((a, b) => a - b));