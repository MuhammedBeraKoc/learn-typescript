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
function logScript(scriptObject) {
    console.log(scriptObject.script);
}
function createHouse(house) {
    var isAvailable = false;
    if (house.numberOfRooms && house.area) {
        if (house.numberOfRooms > 2 && house.area > 30) {
            isAvailable = true;
        }
    }
    return isAvailable;
}
var victorianGlass = { price: '100£', productionId: 'a2543df8' };
// victorianGlass.productionId = 'NewId' // Oops!
// So concisely readonly == immutable
// There is a type in TS which is ReadonlyArray
var normalArray = [1, 2, 3];
var immutableArray = [1, 2, 3];
normalArray[1] = 7;
// immutableArray[1] = 11 // No way of doing this!
// All mutable operations are forbidden on immutableArray
// immutableArray.push(1)
// immutableArray.length = 20
// normalArray = immutableArray
// Above is error since ReadonlyArray is a specialised
// version of Array so that no overriding
// But luckily we have another solution
// Type interference
normalArray = immutableArray;
var miniProgram = { arguments: ['Hello', 'World!'], size: 12, language: 'TypeScript' };
// Fix: When interface has only one function use template below
// type LogFunction = (flag: string, message: string): void
var myLogFunction;
// Name of parameters can be anything
// You dont event have to write type names
// Since TS automatically fills it from interface
myLogFunction = function (flag, msg) {
    switch (flag) {
        case 'ERROR':
            console.error(msg);
            break;
        case 'LOG':
            console.log(msg);
            break;
    }
};
var NativeClass = /** @class */ (function () {
    function NativeClass(name) {
        this.name = "@" + name;
    }
    NativeClass.prototype.toString = function () {
        return "Classname: [" + name + "]";
    };
    return NativeClass;
}());
function newNativeClass(classConstructor, name) {
    return new classConstructor(name);
}
var nativeClassObject = newNativeClass(NativeClass, 'NativeClass');
console.log(nativeClassObject);
var cake = {};
cake.calorie = 300;
cake.ingridients = ['Sugar', 'Flour', 'Eggs'];
// Interfaces extending classes
// When we extend an interface with a class
// It takes all the members without implementation
var State = /** @class */ (function () {
    function State(state) {
        this.state = state;
    }
    return State;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.setState = function (state) {
        this.state = state;
    };
    return Button;
}(State));
