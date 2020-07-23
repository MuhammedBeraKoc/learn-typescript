// Do NOT use var
// USE let and const
// If a value is likely to change later => let
// If a value is meant to be a constant => const
// Since later two works with block-scoping
// If a variable declared in a {}
// It can be only used in this column
// There are no hoisting like in var
// Hoisting is basically taking an entity
// in the code an elevating it to the top of a scope
// Like function hoisting in JS
run()

function run(): void {
    console.log('Program started to run.')
}

// A neat example of block scope with let
const isReady = true

function configureSystem(): string {
    let getOS: () => string = () => ''
    if (isReady) {
        const OS = 'Windows'
        getOS = () => OS
    }
    return getOS()
}
// Array destructuring
const input = ['Hello', 'World!']
const [inputFirst, inputSecond] = input
// Object spread
// You lose methods
class A {
    a = 23
    m() {
        console.log(this.a)
    }
}
let aObject = new A()
let clonedA = {...aObject}
console.log(clonedA.a)
// console.log(clonedA.m()) // Gives error