// Type compability in TS is based on structural typing
// Which means relating types only based on their structure
interface Named {
    name: string
}

class Man {
    name: string

    constructor(name: string) {
        this.name = name
    }
}

// Named and Man are structurally compatible
let man: Named
man = new Man('Adam')
// Theory
// Rule of thumb: x is compatible with y
// If y has at least the same members as x
// So y is a superset of x
let X: Named
const Y = { name: 'Angela', location: 'NY' }
X = Y
function greet(n: Named) {
    console.log(`Greetings, ${n.name}!`)
}
// It is OK since Y is a superset of Named (n)
greet(Y)
// Comparing functions
// While looking for compatibility in basic types and objects
// is an easy task, for functions it becomes very opposite
// Functions with different paramater list (same body)
// Name of paramaters is not considered
let nullify = (a: number) => 0
let nullifySecondDegree = (b: number, c: string) => 0
nullifySecondDegree = nullify
// nullify = nullifySecondDegree // Error: cannot be assigned
// You may ask why I should never used that
// Simple answer: callback functions with optional parameters
// Let's look an example for forEach function in array
const items = ['Beer', 'Apple', 'Bow']
// Now you see that callback function of foreach accepts
// Both format and this is quite popular
items.forEach((item, index, array) => console.log({item}))
items.forEach(item => console.log({item}))
// For function return types it behaves same as object
// const f = () => {x: 3}
// const g = () => {x: 5, y: 10}
// f = g // Viable
// g = f // Error since y is not defined in f's return object
// Functions with overloads
// Enums are compatible with numbers and numbers are compatible with enums
// But values of different enum types are incompatible
enum Status {
    Ready,
    Waiting
}

enum Color {
    Red,
    Blue,
    Green
}

let currentStatus = Status.Ready
// currentStatus = Color.Red // Gives error
// Class compatibility
// Classes are nearly the same as objects in compatibility
// Except it only looks instant members
// Not constructors or static members
class Animal {
    feet: number

    constructor(name: string, feet: number) {
        this.feet = feet
        console.log(name)
    }
}

class Size {
    feet: number
    constructor(feet: number) {
        this.feet = feet
    }
}

let an: Animal = new Animal('lion', 3)
let s: Size = new Size(2)

an = s
s = an
// Private and protected members also affects compatibility
// Generics compatibility
interface Empty<T> {}

let e1: Empty<number> = {}
let e2: Empty<string> = {}
e1 = e2

interface NotEmpty<T> {
    data: T
}

let numberDatum: NotEmpty<number> = {data : 3}
let stringDatum: NotEmpty<string> = {data : 'tree'}
// numberDatum = stringDatum // Since different types it gives errors
// For different generic types (T, U, S, etc.) TS
// makes those types as if they are any
// let identity = function<T>(x: T): T {//Implementation}
// let reverse = function<U>(y: U): U {//Implementation}
// identity = reverse // Works since making U and T any
// makes those two function compatible
