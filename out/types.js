"use strict";
// A boolean type
const isTypeScript = true;
// A number (For octal put 0o at first,
// for hexadecimal 0x and for binary 0b)
const version = 3.9;
// string type
const compiler = '@TypeScript(3.9.7)';
// Template strings
console.log(`Current compiler: [${compiler}]`);
// [] array type
const list = [1, 2, 3];
// Generic array type
const values = [4, 9, 16];
// Tuple type: Tuples are length constrained arraylike
// structures. The advantage of using them is they 
// can contain multiple types unlike arrays
const tuple = ['apple', 2, true];
// Enum type
// First value is always zero then it increments one by one
// But we can set it with assingment operator
var CompilerState;
(function (CompilerState) {
    CompilerState[CompilerState["IDLE"] = 0] = "IDLE";
    CompilerState[CompilerState["WORKING"] = 1] = "WORKING";
    CompilerState[CompilerState["MULFUNCTIONED"] = -1] = "MULFUNCTIONED";
})(CompilerState || (CompilerState = {}));
const typeScriptCompilerState = CompilerState.WORKING;
// Enum can be retrieved by its value too
const v8CompilerState = CompilerState[0];
// If you want your variable to be dynamic like
// in vanilla JavaScript use any type
const unknownVariable = 'Which type do I belong?';
// void type is like the evil brother of any
// it has no types at all
const unusableVariable = undefined;
// undefined and null are dull types
// they can only be assign to themselves
// never type has two effects
// one for functions when a function have an unreachable end
// All functions that throw errors are in type never
// And all of them looping without a limit
function startMyCompiler() {
    throw new Error('You have no compiler!');
}
// never return type is inferred here
function loopForever() {
    while (true) { }
}
// object type
class NativeObject {
    static create() {
        return {};
    }
}
console.log(NativeObject.create());
// Type assertions
// First syntax: angle-bracket
const someValue = 'Hello World!';
const stringLength = someValue.length;
// Second syntax: as keyword
const reversedString = someValue.split('').reverse().join('');
// And as a final note use let and const over var always
// Due to the lexical ambiguity
