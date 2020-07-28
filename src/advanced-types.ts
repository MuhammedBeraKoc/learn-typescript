// Intersection types
// We use these types when we want to merge multiple types
// in on variable
// A rigid example
function extend < First extends object, Second extends object > (first: First, second: Second): First & Second {
    const result: Partial < First & Second > = {}
    for (const prop in first) {
        if (first.hasOwnProperty(prop)) {
            (result as First)[prop] = first[prop]
        }
    }
    for (const prop in second) {
        if (second.hasOwnProperty(prop)) {
            (result as Second)[prop] = second[prop]
        }
    }
    return result as First & Second
}

class Application {
    appName: string

    constructor(appName: string) {
        this.appName = appName
    }
}

interface Logger {
    log(message: string): void
}

class ApplicationLogger implements Logger {

    log(message: string): void {
        console.log({
            message
        })
    }
}

const loggableApplication = extend(new Application('Facebook'), ApplicationLogger.prototype)
loggableApplication.log('Application is ready to start.')
// Union types: They are used to limit parameter type
function addPaddingLeft(value: string, padding: number | string): (string | Error) {
    if (typeof padding === 'string') {
        return padding + value
    } else if (typeof padding === 'number') {
        return Array(padding + 1).join(' ') + value
    }
    throw new Error('Invalid padding')
}

console.log({
    padding: addPaddingLeft('30', '2')
})
// In unions we can only access the common types
interface Bird {
    fly(): void
    layEggs(): void
}

interface Fish {
    swim(): void
    layEggs(): void
}

function getSmallPet(): Fish | Bird {
    let pet: Fish | Bird
    const randomNumber = Math.floor(Math.random() * 2)
    if (randomNumber === 0) {
        pet = {
            swim: () => console.log('Swimming now!'),
            layEggs: () => console.log('Laying new eggs')
        }
    } else {
        pet = {
            fly: () => console.log('Flying now!'),
            layEggs: () => console.log('Laying new eggs')
        }
    }
    return pet
}

const myPet = getSmallPet()
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
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined
}

if (isFish(myPet)) {
    myPet.swim()
} else {
    myPet.fly()
}
// Another way is to use in operator
// For specific object properties
function move(pet: Fish | Bird): void {
    if ('swim' in pet) {
        return pet.swim()
    }
    pet.fly()
}
// typeof type guards
function isNumber(x: any): x is number {
    return typeof x === 'number'
}

function isString(x: any): x is string {
    return typeof x === 'string'
}

const randomInput = 'Hello'
if (isString(randomInput)) {
    console.log(randomInput + ' World!')
} else if (isNumber(randomInput)) {
    console.log(randomInput + 23)
} else {
    console.log('Given type is not specific')
}

// instanceof type guards
interface Engine {
    run(): void
}

class SportEngine implements Engine {
    run(): void {
        console.log('Sport engine has started.')
    }
}

class TruckEngine implements Engine {
    run(): void {
        console.log('Truck engine has started.')
    }
}

function getRandomEngine(): Engine {
    return Math.random() < 0.5 ? new SportEngine() : new TruckEngine()
}
// Types narrowed after instanceof guard
const randomEngine = getRandomEngine()
if (randomEngine instanceof SportEngine) {
    randomEngine.run()
} else if (randomEngine instanceof TruckEngine) {
    randomEngine.run()
}
// Nullable types
// --strictNullChecks flag (or strictNullChecks: true in tsconfig)
// will give an error if you want to assign the value to null or undefined
let notNullableString = 'foo'
// notNullableString = null // Error
// To prevent this we can use union types
let nullableString: string | null = 'bar'
nullableString = null
// nullableString = undefined // Error since undefined !== null
// To prevent complicated code optional chaining can be used
// Only TS 3.7 or higher
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining
// For parameters strictNullChecks automatically
// adds | undefined at the end of each parameter
// For class properties and functions
function foo(optional ? : string) {
    console.log({
        optional
    })
}

foo('I am here now!')
foo(undefined)
// foo(null) // Error: Since it has only string and undefined in union type
// Same for optional class properties
class C {
    a ? : number
}

const c = new C()
c.a = 23
c.a = undefined
// c.a = null // Oopsy doopsy!
// Type guards and type assertions
function removeNull(s: string | null): string {
    if (s === null) return 'default'
    return s
    // return s || 'default' // or like that with terser operator
}
// To eliminate null and undefined manually
// Use type assertion: (!) as postfix
// Compiler can't eliminate nulls in a nested function
// Except it is a IIFE
function addPostfix(noun: string | null): string {
    function nestedF(postfix: string): string {
        return noun!.charAt(0) + postfix
    }
    noun = noun || 'tree'
    return nestedF(' ship')
}

console.log(addPostfix('glass'))
// Type alias: creates a new name for a type
type document = string
type documentGenerator = () => string
type documentUnion = document | documentGenerator

function getDocument(d: documentUnion): document {
    if (typeof d === 'string') return d
    return d()
}

console.log(getDocument(() => 'Hello World!'))
console.log(getDocument('A pure string.'))
// Aliases don't create a new type they create a new name refer to this type
// We can create new names for interfaces, functions etc
type Store < T > = {
    data: T[]
}
// We can also refer a type inside of it
// A basic binary tree implementation
type BinaryTree < T > = {
    value: T
    left: BinaryTree < T >
        right: BinaryTree < T >
}
// With intersection types they create magic
type LinkedList < T > = T & {
    next: LinkedList < T > | null
}

interface Value {
    value: number
}

let numericLinkedList: LinkedList < Value > = {
    value: 1,
    next: {
        value: 2,
        next: null
    }
}
console.log(numericLinkedList.value)
console.log(numericLinkedList.next)
console.log(numericLinkedList.next!.value)
console.log(numericLinkedList.next!.next)
// But type cannot be seen on the right side
// Other than in an object
// Since that make no sense
// And it causes an infinite loop
// Even though it is a silent error
type NumberArray = NumberArray[] // That seems ok but BEWARE!
// The difference between interface and alias is that
// Aliases don't create an intrinsic name
// Instead just a place holder
type Alias = {
    num: number
}
interface Interface {
    num: number
}
// Hover over the Alias and Interface
// you will see the difference
declare function aliased(arg: Alias): Alias
declare function interfaced(arg: Interface): Interface
// String literal types
type PositionMode = 'absolute' | 'relative' | 'fixed'
class UIElement {
    changePosition(dx: number, dy: number, positionMode: PositionMode): void {
        console.log({
            dx,
            dy
        })
        if (positionMode === 'absolute') {
            console.log('Absolute position set.')
        } else if (positionMode === 'relative') {
            console.log('Relative position set.')
        } else if (positionMode === 'fixed') {
            console.log('Fixed position set.')
        } else {
            console.error('Unknown position mode')
        }
    }
}

const uiElement = new UIElement()
uiElement.changePosition(2, 3, 'absolute')
// uiElement.changePosition(12, -7, 'upper') // Error upper is not a PositionMode
// Numeric literal types
type OneToSix = 1 | 2 | 3 | 4 | 5 | 6

function rollDice(): OneToSix {
    function _(d: OneToSix): OneToSix {
        return d
    }
    const diceValue = (Math.floor(Math.random() * 6) + 1 as OneToSix)
    return _(diceValue)
}

console.log({
    diceValue: rollDice()
})
// Discriminated unions: Very useful in functional programming
// 3 things we need
// Types that have a common singleton property: Discriminant
// An alias that merges those types into one: Union
// Type guards on the common property
// An example below
interface Square {
    kind: 'square'
    size: number
}
interface Rectangle {
    kind: 'rectangle'
    width: number
    height: number
}
interface Circle {
    kind: 'circle'
    _radius: number
}

interface Triangle {
    kind: 'triangle'
    height: number
    baseLength: number
}

type Shape2D = Square | Rectangle | Circle | Triangle

function assertNever(s: Shape2D): never {
    throw new Error(`Unexpected shape: ${s}`)
}

function area(s: Shape2D) {
    switch (s.kind) {
        case 'circle': return s._radius * s._radius * Math.PI
        case 'square': return s.size * s.size
        case 'rectangle': return s.width * s.height
        default: return assertNever(s) // For missing cases
    }
}

console.log({area: area({kind: 'circle', _radius: 1} as Circle)})
// Exhaustiveness checking
// When we add a new type it gives an error
// If we dont handle it
// I have added Triangle type but not checked in switch
// To handle it we use never keyword
// console.log(area({kind: 'triangle', height: 2, baseLength: 3} as Triangle))
// Polymorphic this types
class BasicCalculator {
    constructor(protected value: number = 0) {
        this.value = value
    }

    getValue() : number {
        return this.value
    }

    add(operand: number) {
        this.value += operand
        return this
    }

    multiple(operand: number) {
        this.value *= operand
        console.log(this)
        return this
    }
}

const val1 = new BasicCalculator().add(3).multiple(7).getValue()
console.log({val1})

class ScientificCalculator extends BasicCalculator {
    constructor(value = 0) {
        super(value)
    }

    power(exponent: number) {
        this.value **= exponent
        console.log(this)
        return this
    }
}

const val2 = new ScientificCalculator(13).multiple(23).power(13)
console.log({val2})
// Index types
// Index type query operator (keyof) returns a union of string literals
// of the keys of object given
// Indexed access operator: T[K]
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
    return propertyNames.map(p => o[p])
}

interface Car {
    manufacturer: string
    model: string
    year: number
}

const ferrari: Car = {
    manufacturer: 'Italy',
    model: 'F2',
    year: 2008
}
console.log({ferrari: pluck(ferrari, ['model', 'year'])})
// Index types and index signatures
// For string keys it can be both number and string
// Since o[2] is viable for o = { 2: 2 }
// Mapped types
// May you want all props optional or readonly in Objects
// TS has interfaces for those called mapped types
type ReadOnly<T> = {
    readonly [P in keyof T]: T[P]
}

// Commenting since it is defined in DOM also
// type Partial<T> = {
//     [P in keyof T]?: T[P]
// }

// To add members to them use intersection types
type PartialWithNewMember<T> = {
    [P in keyof T]?: T[P]
} & { newMember: boolean }

// An easy implementation of mapped types
type Keys = 'option1' | 'option2'
type Flags= {[K in Keys]: boolean}
// This is equal of below
// type Flags = {
//     option1: boolean,
//     option2: boolean
// }
// In real applications
// We use keys since we use objects
type NullablePerson = {[P in keyof Person]: Person[P] | null}
type PartialPerson = {[P in keyof Person]?: Person[P]}
// But making them generic is much more reusable
type Nullable<T> = {[K in keyof T]: T[K] | null}
// Another cool example
type Proxy<T> = {
    get(): T
    set(t: T): void
}

type Proxify<T> = {
    [K in keyof T]: Proxy<T[K]>
}

declare interface ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}

function makeProxy<T extends object, K extends keyof T>(o: T, k: K): Proxy<T[K]> {
    return {
        get(): T[K] {
            return o[k]
        },
        set(n: T[K]): void {
            o[k] = n
        }
    } as Proxy<T[K]>
}

function proxify<T extends object, K extends keyof T>(o: T): Proxify<T> {
    const proxifiedObject = {} as T
    let k: string = ''
    for (k in o) {
        if (o.hasOwnProperty(k)) {
            Object.assign(proxifiedObject, {...proxifiedObject, [k]: makeProxy(o, k as K)})
        }
    }
    return proxifiedObject as Proxify<T>
}

function unproxify<T>(p: Proxify<T>): T {
    const unproxifiedObject = {} as T
    for (const k in p) {
        if (p.hasOwnProperty(k)) {
            unproxifiedObject[k] = p[k].get()
        }
    }
    return unproxifiedObject
}

interface NativeObject {
    [key: string]: string
    name: string
}

type NativeObjectKey = keyof NativeObject

const nativeObject = {name: '@NativeObject'}
const proxifiedNativeObject = proxify<NativeObject, NativeObjectKey>(nativeObject)
console.log(proxifiedNativeObject.name.get())
const unproxifiedNativeObject = unproxify<NativeObject>(proxifiedNativeObject)
console.log(unproxifiedNativeObject.name)
// Conditional types
// For typescript > 2.8
type conditionalReturnType<T> = T extends true ? string : number
function testIfTruthy<T extends boolean>(x: T): conditionalReturnType<T> {
    return (x === true ? 'truthy' : 'falsy') as conditionalReturnType<T>
}

console.log(testIfTruthy(Math.random() > 0.5))
// Distributive conditional types
type BoxedValue<T> = { value: T }
type BoxedArray<T> = { array: T }
type Boxed<T> = T extends any[] ? BoxedArray<T> : BoxedValue<T>
type T20 = Boxed<string>
type T21 = Boxed<number[]>
type T22 = Boxed<string | number[]>
// Now two main functionality types
type Diff<T, U> = T extends U ? never : T // Returns the types that T has but U doesn't
type Filter<T, U> = T extends U ? T : never // Returns types that both T and U have
type T30 = Diff<string | number | (() => void), Function>
type T31 = Filter<string | number | (() => void), Function>
type NonNullableWithDiff<T> = Diff<T, null | undefined> // Clears the null and undefined from the given type
type T32 = NonNullableWithDiff<number | string | undefined>
// Type inference in conditional types
type FunctionReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : undefined
const getString = () => 'string'
type T40 = FunctionReturnType<typeof getString>
// Can't use infer in contraint clauses
type DeriveParameters<T> = T extends {a: infer U; b: infer U} ? U: never
type T41 = DeriveParameters<{a: string; b:number}>
// Predifined conditional types
type T42 = Exclude<number | string | never, never>
type T43 = Extract<number | string | object, object>
type T44 = NonNullable<number | string | null | undefined>
const myFunction = () => true
type T45 = ReturnType<typeof myFunction>
class Classy {
    a!: number
}
type T46 = InstanceType<typeof Classy>