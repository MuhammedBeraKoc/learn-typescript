"use strict";
// Introduced in ES2015
// symbol is a primitive data type like number
// It can be constructed from Symbol class
const nativeSymbol = Symbol();
// Can be used with a key string
// it is immutable and unique
const keySymbolOne = Symbol('key');
const keySymbolTwo = Symbol('key');
// console.log(keySymbolOne === keySymbolTwo) // Error: no type overlap
// Since Symbol creates unique symbols with unique types
// Symbols are especially useful for object keys
const nameKey = Symbol('username');
const user = {
    [nameKey]: 'Herald White',
    age: 38
};
console.log(user[nameKey]);
// Since they are computed they can be used in classes as member
// Since there are no real classes in JS (Syntactic sugar)
// They are objects too!
const getClassNameSymbol = Symbol();
class SymbolOrientedClass {
    static [getClassNameSymbol]() {
        return '@SymbolOrientedClass';
    }
}
console.log({ className: SymbolOrientedClass[getClassNameSymbol]() });
// There are some cool built-in symbols that you can use
class NativeArray {
    static [Symbol.hasInstance](instance) {
        return Array.isArray(instance) && instance;
    }
}
console.log([] instanceof NativeArray);
const colorArray = ['Blue', 'Red', 'Yellow'];
const numberArray = ['1', '2', '3'];
console.log(colorArray.concat(numberArray));
// It gives an error because of the index type
// I am so lazy to solve it via interface indexable types
// So I asked in StackOverFlow
// https://stackoverflow.com/questions/63144649/how-to-use-symbol-isconcatspreadable-in-ts
numberArray[Symbol.isConcatSpreadable.toString()] = false;
console.log(colorArray.concat(numberArray));
const primitiveObject = {
    [Symbol.toPrimitive](typeSignal) {
        if (typeSignal === 'string') {
            return '@PrimitiveObject';
        }
        else if (typeSignal === 'number') {
            return Math.floor(Math.random() * 900000 + 100000);
        }
        return true;
    }
};
console.log(+primitiveObject);
console.log(`${primitiveObject}`);
console.log(primitiveObject + '');
