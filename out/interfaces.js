"use strict";
function logScript(scriptObject) {
    console.log(scriptObject.script);
}
function createHouse(house) {
    let isAvailable = false;
    if (house.numberOfRooms && house.area) {
        if (house.numberOfRooms > 2 && house.area > 30) {
            isAvailable = true;
        }
    }
    return isAvailable;
}
const victorianGlass = { price: '100£', productionId: 'a2543df8' };
// victorianGlass.productionId = 'NewId' // Oops!
// So concisely readonly == immutable
// There is a type in TS which is ReadonlyArray
let normalArray = [1, 2, 3];
let immutableArray = [1, 2, 3];
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
const miniProgram = { arguments: ['Hello', 'World!'], size: 12, language: 'TypeScript' };
// Fix: When interface has only one function use template below
// type LogFunction = (flag: string, message: string): void
let myLogFunction;
// Name of parameters can be anything
// You dont event have to write type names
// Since TS automatically fills it from interface
myLogFunction = (flag, msg) => {
    switch (flag) {
        case 'ERROR':
            console.error(msg);
            break;
        case 'LOG':
            console.log(msg);
            break;
    }
};
class NativeClass {
    constructor(name) {
        this.name = `@${name}`;
    }
    toString() {
        return `Classname: [${name}]`;
    }
}
function newNativeClass(classConstructor, name) {
    return new classConstructor(name);
}
const nativeClassObject = newNativeClass(NativeClass, 'NativeClass');
console.log(nativeClassObject);
const cake = {};
cake.calorie = 300;
cake.ingridients = ['Sugar', 'Flour', 'Eggs'];
// Interfaces extending classes
// When we extend an interface with a class
// It takes all the members without implementation
class State {
    constructor(state) {
        this.state = state;
    }
}
class Button extends State {
    setState(state) {
        this.state = state;
    }
}
