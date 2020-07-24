// Classic function
function add(a: number, b: number): number {
    return a + b
}
// Function as a reference variable
// With a return type inference and an interface
type NumericFunction = (a: number, b: number) => number
let myAdd: NumericFunction = function(a, b) { return a + b }
// Optional (?) and default (=) parameters
function f(o?: object, s: string = 'World') {
    if (o) {
        console.log(o)
    }
    console.log(`Hello ${s}!`)
}

f({ name: '@f()' }, 'Adam')

function execute(command: string, ...args: string[]) {
    console.log(command, args)
}

execute('ls', '-L', './')
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
const objEnhanced = {
    value: 23,
    m() {
        const self = this
        const _f = function() {
            // Don't care even if this keyword
            // Gives warning
            // But using arrow functions are
            // much more concise and clear
            // console.log(this)
            // console.log(`Value: ${this.value}`)
            console.log(self)
            console.log(`Value: ${self.value}`)
        }
        // return _f.bind(objEnhanced)
        return _f
    }
}

objEnhanced.m()()
// To solve this we will use arrow functions
// Since they take this when they are created as the upper object
// m function since functions are objects
// This always refers to the upper object
// Except classic functions: this reference global object
interface MyObjectInterface {
    value: number,
    self: object,
    m(): () => void
}
const obj: MyObjectInterface = {
    value: Math.floor(Math.random() * 100),
    self: this,
    // This parameter can be assert to a specific type
    m(this: MyObjectInterface) {
        console.log(this)
        return () => {
            console.log(`Value is ${this.value}`)
        }
    }
}

obj.m()()
// Overloading: is changing function's arguments
// for a specific operation
// TS has a quirky way of doing this
// Since JavaScript doesn't let us
// to define a function multiple times
function convert(a: any): number {
    if (typeof a === 'number') {
        return a as number
    } else if (typeof a === 'object') {
        return a.value as number
    } else if (typeof a === 'string') {
        return +a as number
    }
    return -1
}

console.log(convert(3))
console.log(convert('4'))
console.log(convert({value: 5}))