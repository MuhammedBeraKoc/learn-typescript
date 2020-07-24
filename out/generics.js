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
// Generics let's us to create
// functions and classes that is reusable
// Starting with a basic example
// We can give the identity function a definite type
// or any which is loosely defined
// and can cause losing data
// function identity(arg: number): number {
//     return arg
// }
// To solve this issue which makes the
// code very rigid (not reusable)
// We first need to capture the type
// Then use this type in function
function identity(arg) {
    return arg;
}
var genericString = identity('ShadowWalker12');
// TS is so smart that even if you dont give
// the generic type it will get it
var genericNumber = identity(12);
// Using generics for Collection types is a little cautious
// function printArrayLengthThenReturn<T>(t: T): T {
//     console.log(t.length) // Oops!
//     return t
// }
// To make it work we can use a different generic notation
function printArrayLengthThenReturn(t) {
    console.log(t.length); // Oops!
    return t;
}
// Generic function type parameter
// Look how we changed the generic type name
// It is fine as long as we don't get messy with naming
var myIdentity = identity;
// Another way of return type declaration is using {}
// Like in an interface (Call Signature)
var anotherIdentity = identity;
// See how it became more concise
var coolIdentity = identity;
// Generic Classes
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
// Let's use generic class for another type
var stringNumeric = new GenericNumber();
stringNumeric.zeroValue = '';
stringNumeric.add = function (x, y) { return x + y; };
console.log(stringNumeric.add(stringNumeric.zeroValue, 'Hello!'));
function loggingIdentity(arg) {
    console.log({ length: arg.length });
    return arg;
}
// loggingIdentity(3) // Not working
loggingIdentity([1, 'a', true]);
loggingIdentity({ length: 120 });
// Using type parameters in generic constraints
// You can define the constraint of a generic
// type using another generic type
function getProperty(obj, key) {
    return obj[key];
}
var newObject = { 'cloneable': true, 'id': '@52a3bs' };
getProperty(newObject, 'cloneable');
// getProperty(newObject, 'name') // Error
// Class types in generic
// Factory methods
var Prototype = /** @class */ (function () {
    function Prototype() {
        this.id = 'ab23f81s';
    }
    return Prototype;
}());
var AugmentedPrototype = /** @class */ (function (_super) {
    __extends(AugmentedPrototype, _super);
    function AugmentedPrototype() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AugmentedPrototype.prototype.make = function () {
        console.log('Prototype is ready.');
    };
    return AugmentedPrototype;
}(Prototype));
function create(c) {
    return new c();
}
create(AugmentedPrototype).make();
