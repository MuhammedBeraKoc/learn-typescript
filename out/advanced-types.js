"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// Intersection types
// We use these types when we want to merge multiple types
// in on variable
// A rigid example
function extend(first, second) {
    var result = {};
    for (var prop in first) {
        if (first.hasOwnProperty(prop)) {
            result[prop] = first[prop];
        }
    }
    for (var prop in second) {
        if (second.hasOwnProperty(prop)) {
            result[prop] = second[prop];
        }
    }
    return result;
}
var Application = /** @class */ (function () {
    function Application(appName) {
        this.appName = appName;
    }
    return Application;
}());
var ApplicationLogger = /** @class */ (function () {
    function ApplicationLogger() {
    }
    ApplicationLogger.prototype.log = function (message) {
        console.log({
            message: message
        });
    };
    return ApplicationLogger;
}());
var loggableApplication = extend(new Application('Facebook'), ApplicationLogger.prototype);
loggableApplication.log('Application is ready to start.');
// Union types: They are used to limit parameter type
function addPaddingLeft(value, padding) {
    if (typeof padding === 'string') {
        return padding + value;
    }
    else if (typeof padding === 'number') {
        return Array(padding + 1).join(' ') + value;
    }
    throw new Error('Invalid padding');
}
console.log({
    padding: addPaddingLeft('30', '2')
});
function getSmallPet() {
    var pet;
    var randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber === 0) {
        pet = {
            swim: function () { return console.log('Swimming now!'); },
            layEggs: function () { return console.log('Laying new eggs'); }
        };
    }
    else {
        pet = {
            fly: function () { return console.log('Flying now!'); },
            layEggs: function () { return console.log('Laying new eggs'); }
        };
    }
    return pet;
}
var myPet = getSmallPet();
// pet.swim() // Error since swim is not common
// Type guards
// How to get a specific method of a fish then?
// if ((myPet as Fish).swim) {
//     (myPet as Fish).swim()
// } else if ((myPet as Bird).fly) {
//     (myPet as Bird).fly()
// }
// Or with an advanced way
// User-defined type guards
// Using type predicates
// Using predicate narrows the given object
// To the predicate type
// This is only for compile time
// In .js file there will be no difference
function isFish(pet) {
    return pet.swim !== undefined;
}
if (isFish(myPet)) {
    myPet.swim();
}
else {
    myPet.fly();
}
// Another way is to use in operator
// For specific object properties
function move(pet) {
    if ('swim' in pet) {
        return pet.swim();
    }
    pet.fly();
}
// typeof type guards
function isNumber(x) {
    return typeof x === 'number';
}
function isString(x) {
    return typeof x === 'string';
}
var randomInput = 'Hello';
if (isString(randomInput)) {
    console.log(randomInput + ' World!');
}
else if (isNumber(randomInput)) {
    console.log(randomInput + 23);
}
else {
    console.log('Given type is not specific');
}
var SportEngine = /** @class */ (function () {
    function SportEngine() {
    }
    SportEngine.prototype.run = function () {
        console.log('Sport engine has started.');
    };
    return SportEngine;
}());
var TruckEngine = /** @class */ (function () {
    function TruckEngine() {
    }
    TruckEngine.prototype.run = function () {
        console.log('Truck engine has started.');
    };
    return TruckEngine;
}());
function getRandomEngine() {
    return Math.random() < 0.5 ? new SportEngine() : new TruckEngine();
}
// Types narrowed after instanceof guard
var randomEngine = getRandomEngine();
if (randomEngine instanceof SportEngine) {
    randomEngine.run();
}
else if (randomEngine instanceof TruckEngine) {
    randomEngine.run();
}
// Nullable types
// --strictNullChecks flag (or strictNullChecks: true in tsconfig)
// will give an error if you want to assign the value to null or undefined
var notNullableString = 'foo';
// notNullableString = null // Error
// To prevent this we can use union types
var nullableString = 'bar';
nullableString = null;
// nullableString = undefined // Error since undefined !== null
// To prevent complicated code optional chaining can be used
// Only TS 3.7 or higher
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining
// For parameters strictNullChecks automatically
// adds | undefined at the end of each parameter
// For class properties and functions
function foo(optional) {
    console.log({
        optional: optional
    });
}
foo('I am here now!');
foo(undefined);
// foo(null) // Error: Since it has only string and undefined in union type
// Same for optional class properties
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c = new C();
c.a = 23;
c.a = undefined;
// c.a = null // Oopsy doopsy!
// Type guards and type assertions
function removeNull(s) {
    if (s === null)
        return 'default';
    return s;
    // return s || 'default' // or like that with terser operator
}
// To eliminate null and undefined manually
// Use type assertion: (!) as postfix
// Compiler can't eliminate nulls in a nested function
// Except it is a IIFE
function addPostfix(noun) {
    function nestedF(postfix) {
        return noun.charAt(0) + postfix;
    }
    noun = noun || 'tree';
    return nestedF(' ship');
}
console.log(addPostfix('glass'));
function getDocument(d) {
    if (typeof d === 'string')
        return d;
    return d();
}
console.log(getDocument(function () { return 'Hello World!'; }));
console.log(getDocument('A pure string.'));
var numericLinkedList = {
    value: 1,
    next: {
        value: 2,
        next: null
    }
};
console.log(numericLinkedList.value);
console.log(numericLinkedList.next);
console.log(numericLinkedList.next.value);
console.log(numericLinkedList.next.next);
var UIElement = /** @class */ (function () {
    function UIElement() {
    }
    UIElement.prototype.changePosition = function (dx, dy, positionMode) {
        console.log({
            dx: dx,
            dy: dy
        });
        if (positionMode === 'absolute') {
            console.log('Absolute position set.');
        }
        else if (positionMode === 'relative') {
            console.log('Relative position set.');
        }
        else if (positionMode === 'fixed') {
            console.log('Fixed position set.');
        }
        else {
            console.error('Unknown position mode');
        }
    };
    return UIElement;
}());
var uiElement = new UIElement();
uiElement.changePosition(2, 3, 'absolute');
function rollDice() {
    function _(d) {
        return d;
    }
    var diceValue = Math.floor(Math.random() * 6) + 1;
    return _(diceValue);
}
console.log({
    diceValue: rollDice()
});
function assertNever(s) {
    throw new Error("Unexpected shape: " + s);
}
function area(s) {
    switch (s.kind) {
        case 'circle': return s._radius * s._radius * Math.PI;
        case 'square': return s.size * s.size;
        case 'rectangle': return s.width * s.height;
        default: return assertNever(s); // For missing cases
    }
}
console.log({ area: area({ kind: 'circle', _radius: 1 }) });
// Exhaustiveness checking
// When we add a new type it gives an error
// If we dont handle it
// I have added Triangle type but not checked in switch
// To handle it we use never keyword
// console.log(area({kind: 'triangle', height: 2, baseLength: 3} as Triangle))
// Polymorphic this types
var BasicCalculator = /** @class */ (function () {
    function BasicCalculator(value) {
        if (value === void 0) { value = 0; }
        this.value = value;
        this.value = value;
    }
    BasicCalculator.prototype.getValue = function () {
        return this.value;
    };
    BasicCalculator.prototype.add = function (operand) {
        this.value += operand;
        return this;
    };
    BasicCalculator.prototype.multiple = function (operand) {
        this.value *= operand;
        console.log(this);
        return this;
    };
    return BasicCalculator;
}());
var val1 = new BasicCalculator().add(3).multiple(7).getValue();
console.log({ val1: val1 });
var ScientificCalculator = /** @class */ (function (_super) {
    __extends(ScientificCalculator, _super);
    function ScientificCalculator(value) {
        if (value === void 0) { value = 0; }
        return _super.call(this, value) || this;
    }
    ScientificCalculator.prototype.power = function (exponent) {
        var _a;
        (_a = this).value = Math.pow(_a.value, exponent);
        console.log(this);
        return this;
    };
    return ScientificCalculator;
}(BasicCalculator));
var val2 = new ScientificCalculator(13).multiple(23).power(13);
console.log({ val2: val2 });
// Index types
// Index type query operator (keyof) returns a union of string literals
// of the keys of object given
// Indexed access operator: T[K]
function pluck(o, propertyNames) {
    return propertyNames.map(function (p) { return o[p]; });
}
var ferrari = {
    manufacturer: 'Italy',
    model: 'F2',
    year: 2008
};
console.log({ ferrari: pluck(ferrari, ['model', 'year']) });
function makeProxy(o, k) {
    return {
        get: function () {
            return o[k];
        },
        set: function (n) {
            o[k] = n;
        }
    };
}
function proxify(o) {
    var _a;
    var proxifiedObject = {};
    var k = '';
    for (k in o) {
        if (o.hasOwnProperty(k)) {
            Object.assign(proxifiedObject, __assign(__assign({}, proxifiedObject), (_a = {}, _a[k] = makeProxy(o, k), _a)));
        }
    }
    return proxifiedObject;
}
function unproxify(p) {
    var unproxifiedObject = {};
    for (var k in p) {
        if (p.hasOwnProperty(k)) {
            unproxifiedObject[k] = p[k].get();
        }
    }
    return unproxifiedObject;
}
var nativeObject = { name: '@NativeObject' };
var proxifiedNativeObject = proxify(nativeObject);
console.log(proxifiedNativeObject.name.get());
var unproxifiedNativeObject = unproxify(proxifiedNativeObject);
console.log(unproxifiedNativeObject.name);
function testIfTruthy(x) {
    return (x === true ? 'truthy' : 'falsy');
}
console.log(testIfTruthy(Math.random() > 0.5));
var getString = function () { return 'string'; };
var myFunction = function () { return true; };
var Classy = /** @class */ (function () {
    function Classy() {
    }
    return Classy;
}());
