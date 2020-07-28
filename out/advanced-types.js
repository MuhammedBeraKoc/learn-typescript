"use strict";
// Intersection types
// We use these types when we want to merge multiple types
// in on variable
// A rigid example
function extend(first, second) {
    const result = {};
    for (const prop in first) {
        if (first.hasOwnProperty(prop)) {
            result[prop] = first[prop];
        }
    }
    for (const prop in second) {
        if (second.hasOwnProperty(prop)) {
            result[prop] = second[prop];
        }
    }
    return result;
}
class Application {
    constructor(appName) {
        this.appName = appName;
    }
}
class ApplicationLogger {
    log(message) {
        console.log({
            message
        });
    }
}
const loggableApplication = extend(new Application('Facebook'), ApplicationLogger.prototype);
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
    let pet;
    const randomNumber = Math.floor(Math.random() * 2);
    if (randomNumber === 0) {
        pet = {
            swim: () => console.log('Swimming now!'),
            layEggs: () => console.log('Laying new eggs')
        };
    }
    else {
        pet = {
            fly: () => console.log('Flying now!'),
            layEggs: () => console.log('Laying new eggs')
        };
    }
    return pet;
}
const myPet = getSmallPet();
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
const randomInput = 'Hello';
if (isString(randomInput)) {
    console.log(randomInput + ' World!');
}
else if (isNumber(randomInput)) {
    console.log(randomInput + 23);
}
else {
    console.log('Given type is not specific');
}
class SportEngine {
    run() {
        console.log('Sport engine has started.');
    }
}
class TruckEngine {
    run() {
        console.log('Truck engine has started.');
    }
}
function getRandomEngine() {
    return Math.random() < 0.5 ? new SportEngine() : new TruckEngine();
}
// Types narrowed after instanceof guard
const randomEngine = getRandomEngine();
if (randomEngine instanceof SportEngine) {
    randomEngine.run();
}
else if (randomEngine instanceof TruckEngine) {
    randomEngine.run();
}
// Nullable types
// --strictNullChecks flag (or strictNullChecks: true in tsconfig)
// will give an error if you want to assign the value to null or undefined
let notNullableString = 'foo';
// notNullableString = null // Error
// To prevent this we can use union types
let nullableString = 'bar';
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
        optional
    });
}
foo('I am here now!');
foo(undefined);
// foo(null) // Error: Since it has only string and undefined in union type
// Same for optional class properties
class C {
}
const c = new C();
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
console.log(getDocument(() => 'Hello World!'));
console.log(getDocument('A pure string.'));
let numericLinkedList = {
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
class UIElement {
    changePosition(dx, dy, positionMode) {
        console.log({
            dx,
            dy
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
    }
}
const uiElement = new UIElement();
uiElement.changePosition(2, 3, 'absolute');
function rollDice() {
    function _(d) {
        return d;
    }
    const diceValue = Math.floor(Math.random() * 6) + 1;
    return _(diceValue);
}
console.log({
    diceValue: rollDice()
});
function assertNever(s) {
    throw new Error(`Unexpected shape: ${s}`);
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
class BasicCalculator {
    constructor(value = 0) {
        this.value = value;
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    add(operand) {
        this.value += operand;
        return this;
    }
    multiple(operand) {
        this.value *= operand;
        console.log(this);
        return this;
    }
}
const val1 = new BasicCalculator().add(3).multiple(7).getValue();
console.log({ val1 });
class ScientificCalculator extends BasicCalculator {
    constructor(value = 0) {
        super(value);
    }
    power(exponent) {
        var _a;
        (_a = this).value = Math.pow(_a.value, exponent);
        console.log(this);
        return this;
    }
}
const val2 = new ScientificCalculator(13).multiple(23).power(13);
console.log({ val2 });
// Index types
// Index type query operator (keyof) returns a union of string literals
// of the keys of object given
// Indexed access operator: T[K]
function pluck(o, propertyNames) {
    return propertyNames.map(p => o[p]);
}
const ferrari = {
    manufacturer: 'Italy',
    model: 'F2',
    year: 2008
};
console.log({ ferrari: pluck(ferrari, ['model', 'year']) });
function makeProxy(o, k) {
    return {
        get() {
            return o[k];
        },
        set(n) {
            o[k] = n;
        }
    };
}
function proxify(o) {
    const proxifiedObject = {};
    let k = '';
    for (k in o) {
        if (o.hasOwnProperty(k)) {
            Object.assign(proxifiedObject, Object.assign(Object.assign({}, proxifiedObject), { [k]: makeProxy(o, k) }));
        }
    }
    return proxifiedObject;
}
function unproxify(p) {
    const unproxifiedObject = {};
    for (const k in p) {
        if (p.hasOwnProperty(k)) {
            unproxifiedObject[k] = p[k].get();
        }
    }
    return unproxifiedObject;
}
const nativeObject = { name: '@NativeObject' };
const proxifiedNativeObject = proxify(nativeObject);
console.log(proxifiedNativeObject.name.get());
const unproxifiedNativeObject = unproxify(proxifiedNativeObject);
console.log(unproxifiedNativeObject.name);
function testIfTruthy(x) {
    return (x === true ? 'truthy' : 'falsy');
}
console.log(testIfTruthy(Math.random() > 0.5));
const getString = () => 'string';
const myFunction = () => true;
class Classy {
}
