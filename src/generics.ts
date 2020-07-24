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
function identity<T>(arg: T): T {
    return arg
}

const genericString = identity<string>('ShadowWalker12')
// TS is so smart that even if you dont give
// the generic type it will get it
const genericNumber = identity(12)
// Using generics for Collection types is a little cautious
// function printArrayLengthThenReturn<T>(t: T): T {
//     console.log(t.length) // Oops!
//     return t
// }
// To make it work we can use a different generic notation
function printArrayLengthThenReturn<T>(t: T[]): T[] {
    console.log(t.length) // Oops!
    return t
}
// Generic function type parameter
// Look how we changed the generic type name
// It is fine as long as we don't get messy with naming
const myIdentity: <U>(u: U) => U = identity
// Another way of return type declaration is using {}
// Like in an interface (Call Signature)
const anotherIdentity: {<S>(s: S): S} = identity
// Creating generic interfaces
interface GenericIdentityFunction {
    <T>(t: T): T
}
// See how it became more concise
const coolIdentity: GenericIdentityFunction = identity
// To make the generic parameter as a parameter of whole interface
interface GenericInterface<T> {
    (value: T): void
    key: T
}
// Generic Classes
class GenericNumber<T> {
    zeroValue!: T
    add!: (x: T, y: T) => T
}

const myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = (x: number, y: number) => x + y
// Let's use generic class for another type
const stringNumeric = new GenericNumber<string>()
stringNumeric.zeroValue = ''
stringNumeric.add = (x: string, y: string) => x + y
console.log(stringNumeric.add(stringNumeric.zeroValue, 'Hello!'))
// But what if we need generic type in a subset
// Then we use extend keyword
interface Lengthwise {
    length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log({length: arg.length})
    return arg
}

// loggingIdentity(3) // Not working
loggingIdentity([1, 'a', true])
loggingIdentity({length: 120})
// Using type parameters in generic constraints
// You can define the constraint of a generic
// type using another generic type
function getProperty<T extends object, K extends keyof T>(obj: T, key: K): any {
    return obj[key]
}

const newObject = {'cloneable': true, 'id': '@52a3bs'}
getProperty(newObject, 'cloneable')
// getProperty(newObject, 'name') // Error
// Class types in generic
// Factory methods
abstract class Prototype {
    id: string

    constructor() {
        this.id = 'ab23f81s'
    }

    abstract make(): void
}

class AugmentedPrototype extends Prototype {

    make(): void {
        console.log('Prototype is ready.')
    }
}

function create<T extends Prototype>(c: new() => T): T {
    return new c()
}

create(AugmentedPrototype).make()