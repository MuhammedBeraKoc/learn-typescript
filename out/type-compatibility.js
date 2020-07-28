"use strict";
class Man {
    constructor(name) {
        this.name = name;
    }
}
// Named and Man are structurally compatible
let man;
man = new Man('Adam');
// Theory
// Rule of thumb: x is compatible with y
// If y has at least the same members as x
// So y is a superset of x
let X;
const Y = { name: 'Angela', location: 'NY' };
X = Y;
function greet(n) {
    console.log(`Greetings, ${n.name}!`);
}
// It is OK since Y is a superset of Named (n)
greet(Y);
// Comparing functions
// While looking for compatibility in basic types and objects
// is an easy task, for functions it becomes very opposite
// Functions with different paramater list (same body)
// Name of paramaters is not considered
let nullify = (a) => 0;
let nullifySecondDegree = (b, c) => 0;
nullifySecondDegree = nullify;
// nullify = nullifySecondDegree // Error: cannot be assigned
// You may ask why I should never used that
// Simple answer: callback functions with optional parameters
// Let's look an example for forEach function in array
const items = ['Beer', 'Apple', 'Bow'];
// Now you see that callback function of foreach accepts
// Both format and this is quite popular
items.forEach((item, index, array) => console.log({ item }));
items.forEach(item => console.log({ item }));
// For function return types it behaves same as object
// const f = () => {x: 3}
// const g = () => {x: 5, y: 10}
// f = g // Viable
// g = f // Error since y is not defined in f's return object
// Functions with overloads
// Enums are compatible with numbers and numbers are compatible with enums
// But values of different enum types are incompatible
var Status;
(function (Status) {
    Status[Status["Ready"] = 0] = "Ready";
    Status[Status["Waiting"] = 1] = "Waiting";
})(Status || (Status = {}));
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Blue"] = 1] = "Blue";
    Color[Color["Green"] = 2] = "Green";
})(Color || (Color = {}));
let currentStatus = Status.Ready;
// currentStatus = Color.Red // Gives error
// Class compatibility
// Classes are nearly the same as objects in compatibility
// Except it only looks instant members
// Not constructors or static members
class Animal {
    constructor(name, feet) {
        this.feet = feet;
        console.log(name);
    }
}
class Size {
    constructor(feet) {
        this.feet = feet;
    }
}
let an = new Animal('lion', 3);
let s = new Size(2);
an = s;
s = an;
let e1 = {};
let e2 = {};
e1 = e2;
let numberDatum = { data: 3 };
let stringDatum = { data: 'tree' };
// numberDatum = stringDatum // Since different types it gives errors
// For different generic types (T, U, S, etc.) TS
// makes those types as if they are any
// let identity = function<T>(x: T): T {//Implementation}
// let reverse = function<U>(y: U): U {//Implementation}
// identity = reverse // Works since making U and T any
// makes those two function compatible
