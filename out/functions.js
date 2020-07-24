"use strict";
// Classic function
function add(a, b) {
    return a + b;
}
var myAdd = function (a, b) { return a + b; };
// Optional (?) and default (=) parameters
function f(o, s) {
    if (s === void 0) { s = 'World'; }
    if (o) {
        console.log(o);
    }
    console.log("Hello " + s + "!");
}
f({ name: '@f()' }, 'Adam');
function execute(command) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    console.log(command, args);
}
execute('ls', '-L', './');
// Using this keyword
// Example below will not work
// And since our noImplicitThis is true in tsconfig
// We will get an error
// const obj = {
//     value: 23,
//     m() {
//         return function() {
//             console.log(`Value: ${this.value}`)
//         }
//     }
// }
// Intiutive solution is saving this
// const self = this in the first line of m
// and using self instead of this
// Or we can bind m to the o like below
var objEnhanced = {
    value: 23,
    m: function () {
        var self = this;
        var _f = function () {
            // Don't care even if this keyword
            // Gives warning
            // But using arrow functions are
            // much more concise and clear
            // console.log(this)
            // console.log(`Value: ${this.value}`)
            console.log(self);
            console.log("Value: " + self.value);
        };
        // return _f.bind(objEnhanced)
        return _f;
    }
};
objEnhanced.m()();
var obj = {
    value: Math.floor(Math.random() * 100),
    self: this,
    // This parameter can be assert to a specific type
    m: function () {
        var _this = this;
        console.log(this);
        return function () {
            console.log("Value is " + _this.value);
        };
    }
};
obj.m()();
// Overloading: is changing function's arguments
// for a specific operation
// TS has a quirky way of doing this
// Since JavaScript doesn't let us
// to define a function multiple times
function convert(a) {
    if (typeof a === 'number') {
        return a;
    }
    else if (typeof a === 'object') {
        return a.value;
    }
    else if (typeof a === 'string') {
        return +a;
    }
    return -1;
}
console.log(convert(3));
console.log(convert('4'));
console.log(convert({ value: 5 }));
