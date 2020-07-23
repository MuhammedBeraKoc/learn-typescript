"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Do NOT use var
// USE let and const
// If a value is likely to change later => let
// If a value is meant to be a constant => const
// Since later two works with block-scoping
// If a variable declared in a {}
// It can be only used in this column
// There are no hoisting like in var
// Hoisting is basically taking an entity
// in the code an elevating it to the top of a scope
// Like function hoisting in JS
run();
function run() {
    console.log('Program started to run.');
}
// A neat example of block scope with let
var isReady = true;
function configureSystem() {
    var getOS = function () { return ''; };
    if (isReady) {
        var OS_1 = 'Windows';
        getOS = function () { return OS_1; };
    }
    return getOS();
}
// Array destructuring
var input = ['Hello', 'World!'];
var inputFirst = input[0], inputSecond = input[1];
// Object spread
// You lose methods
var A = /** @class */ (function () {
    function A() {
        this.a = 23;
    }
    A.prototype.m = function () {
        console.log(this.a);
    };
    return A;
}());
var aObject = new A();
var clonedA = __assign({}, aObject);
console.log(clonedA.a);
// console.log(clonedA.m()) // Gives error
