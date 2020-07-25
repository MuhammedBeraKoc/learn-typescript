"use strict";
// tslint:disable
// Enums are basically values disguised in constant
// names for making code readable
var KeyboardSignal;
(function (KeyboardSignal) {
    KeyboardSignal[KeyboardSignal["TAB"] = 7] = "TAB";
    KeyboardSignal[KeyboardSignal["SPACE"] = 48] = "SPACE";
    KeyboardSignal[KeyboardSignal["UP"] = 53] = "UP";
})(KeyboardSignal || (KeyboardSignal = {}));
console.log("Keyboard signal: " + KeyboardSignal.TAB);
// Using enums as parameters
var Oven;
(function (Oven) {
    Oven[Oven["OPEN"] = 0] = "OPEN";
    Oven[Oven["CLOSE"] = 1] = "CLOSE";
})(Oven || (Oven = {}));
function bakeACake(recipient, oven) {
    if (oven === Oven.OPEN) {
        console.log(recipient);
        console.log('Cake is ready!');
    }
    else {
        console.log('Oven is not working now:(');
    }
}
bakeACake('Stir the dough. Add sugar and oil. Put some chocolate', Oven.OPEN);
// If an enum value is computed others must be initialized too
function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}
var E;
(function (E) {
    E[E["A"] = getRandomNumber()] = "A";
    // B, // Error: Enum member must have initializer.
})(E || (E = {}));
// String enums
// As name implies their values are string
var Direction;
(function (Direction) {
    Direction["UP"] = "UP";
    Direction["DOWN"] = "DOWN";
    Direction["LEFT"] = "LEFT";
    Direction["RIGHT"] = "RIGHT";
})(Direction || (Direction = {}));
// Heterogenous enums
// Enums with different value classes
// You can only use numbers and strings for enum values
// Think about why is it like that?
var HeterogenousAnswer;
(function (HeterogenousAnswer) {
    HeterogenousAnswer[HeterogenousAnswer["YES"] = 1] = "YES";
    HeterogenousAnswer["NO"] = "FALSE";
})(HeterogenousAnswer || (HeterogenousAnswer = {}));
// Computed and constant members
// If the first value of enum has no value
// Then it is assigned to 0(number)
// Others will go subsequently unless they are initialized
// Example: enum E {A, B, C} (A = 0, B = 1, C = 2)
// Example: enum E {A = 2, B, C} (A = 2, B = 3, C = 4)
// Example: enum E {A, B = 7, C} (A = 0, B = 7, C = 8)
// Constant enums
// There are a lot of rules for them
// https://www.typescriptlang.org/docs/handbook/enums.html#computed-and-constant-members
// Look here
var FileAccess;
(function (FileAccess) {
    // constant members
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    // computed member
    // Computeds always the last members
    FileAccess[FileAccess["G"] = "123".length] = "G";
})(FileAccess || (FileAccess = {}));
// Union enums and enum member types
//  A literal enum member is a constant enum member with no initialized value
// or initialized with string or numeric literal
// Enums in runtime
(function (E) {
    E[E["X"] = 0] = "X";
    E[E["Y"] = 1] = "Y";
    E[E["Z"] = 2] = "Z";
})(E || (E = {}));
function func(obj) {
    return obj.X;
}
func(E);
// Enums in compile time
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel || (LogLevel = {}));
function printImportant(key, message) {
    var num = LogLevel[key];
    if (num <= LogLevel.WARN) {
        console.log('Log level key is', key);
        console.log('Log level value is', num);
        console.log('Log level message is', message);
    }
}
printImportant('ERROR', 'This is a message');
// Reverse mapping
// Only for number enums
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[a];
console.log({ nameOfA: nameOfA });
var myAlert = 0 /* Mild */;
// Ambient enums
// They used to describe the shape of a predifined enum
