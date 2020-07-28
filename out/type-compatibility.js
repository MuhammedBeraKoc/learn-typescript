"use strict";
var Man = /** @class */ (function () {
    function Man(name) {
        this.name = name;
    }
    return Man;
}());
// Named and Man are structurally compatible
var man;
man = new Man('Adam');
// Theory
// Rule of thumb: x is compatible with y
// If y has at least the same members as x
// So y is a superset of x
var X;
var Y = { name: 'Angela', location: 'NY' };
X = Y;
function greet(n) {
    console.log("Greetings, " + n.name + "!");
}
// It is OK since Y is a superset of Named (n)
greet(Y);
// Comparing functions
// While looking for compatibility in basic types and objects
// is an easy task, for functions it becomes very opposite
// Functions with different paramater list (same body)
// Name of paramaters is not considered
var nullify = function (a) { return 0; };
var nullifySecondDegree = function (b, c) { return 0; };
nullifySecondDegree = nullify;
// nullify = nullifySecondDegree // Error: cannot be assigned
// You may ask why I should never used that
// Simple answer: callback functions with optional parameters
// Let's look an example for forEach function in array
var items = ['Beer', 'Apple', 'Bow'];
// Now you see that callback function of foreach accepts
// Both format and this is quite popular
items.forEach(function (item, index, array) { return console.log({ item: item }); });
items.forEach(function (item) { return console.log({ item: item }); });
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
var currentStatus = Status.Ready;
// currentStatus = Color.Red // Gives error
// Class compatibility
// Classes are nearly the same as objects in compatibility
// Except it only looks instant members
// Not constructors or static members
var Animal = /** @class */ (function () {
    function Animal(name, feet) {
        this.feet = feet;
        console.log(name);
    }
    return Animal;
}());
var Size = /** @class */ (function () {
    function Size(feet) {
        this.feet = feet;
    }
    return Size;
}());
var an = new Animal('lion', 3);
var s = new Size(2);
an = s;
s = an;
var e1 = {};
var e2 = {};
e1 = e2;
var numberDatum = { data: 3 };
var stringDatum = { data: 'tree' };
// numberDatum = stringDatum // Since different types it gives errors
// For different generic types (T, U, S, etc.) TS
// makes those types as if they are any
// let identity = function<T>(x: T): T {//Implementation}
// let reverse = function<U>(y: U): U {//Implementation}
// identity = reverse // Works since making U and T any
// makes those two function compatible
