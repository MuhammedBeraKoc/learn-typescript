/* tslint:disable */
// Interfaces are roughly the shape of the data
// Let us start with an easy example
// Script object may have more than script property
// Or in any order
// TS only checks given props
// function logScript(scriptObject: { script: string }) {
//     console.log(scriptObject.script)
// }
// But what about when we need another function
// with the same object type
// So this is the use of interfaces
// They give us the tools to create reusable and maintainable code
interface ScriptObject {
    script: string
}

function logScript(scriptObject: ScriptObject) {
    console.log(scriptObject.script)
}
// Optional properties in Interfaces
// Not all properties meant to be given
// We use ? after those properties
interface House {
    numberOfRooms?: number
    area?: number
}

function createHouse(house: House): boolean {
    let isAvailable: boolean = false
    if (house.numberOfRooms && house.area) {
        if (house.numberOfRooms > 2 && house.area > 30) {
            isAvailable = true
        }
    }
    return isAvailable
}
// Readonly properties in interfaces
// Generally a readonly property is a property
// That can only be changed in creation
interface Glass {
    price: string
    // Since the id is only set when the product is created
    readonly productionId: string
}

const victorianGlass: Glass = { price: '100£', productionId: 'a2543df8'}
// victorianGlass.productionId = 'NewId' // Oops!
// So concisely readonly == immutable
// There is a type in TS which is ReadonlyArray
let normalArray: number[] = [1, 2, 3]
let immutableArray: ReadonlyArray<number> = [1, 2, 3]
normalArray[1] = 7
// immutableArray[1] = 11 // No way of doing this!
// All mutable operations are forbidden on immutableArray
// immutableArray.push(1)
// immutableArray.length = 20
// normalArray = immutableArray
// Above is error since ReadonlyArray is a specialised
// version of Array so that no overriding
// But luckily we have another solution
// Type interference
normalArray = immutableArray as number[]
// Readonly vs Const
// Const only makes the reference immutable
// readonly makes the properties immutable
// What about if we add more properties than the
// defined interface? Then TS will give an error
// To prevent this there are two ways
// Easy one is type interference
// Better one is using indexable properties
interface Program {
    arguments: string[]
    size: number
    [propName: string]: any // If you remove this line it will fail
}

const miniProgram: Program = {arguments: ['Hello', 'World!'], size: 12, language: 'TypeScript'}
// Function types
interface LogFunction {
    // Below you will see a problem
    (flag: string, message: string): void
}
// Fix: When interface has only one function use template below
// type LogFunction = (flag: string, message: string): void
let myLogFunction: LogFunction
// Name of parameters can be anything
// You dont event have to write type names
// Since TS automatically fills it from interface
myLogFunction = (flag, msg) => {
    switch (flag) {
        case 'ERROR': console.error(msg);break
        case 'LOG': console.log(msg);break
    }
}
// Indexable Types
// Used for mapping types (Objects, Arrays, Maps etc.)
interface StringMap {
    [key: string]: string
    // You can only use value type
    // For other variables in interface
    name: string
    // length: number // Error
    // Why does this happen?
    // Well because interfaces with
    // indexable types are monomorphic
    // Which means they include only one
    // key value pair for interface
    // Since interfaces are basically
    // Object shapes
    // We declare only one way of creating
    // properties.
}
// You may ask how to solve this problem
// Since we need to hold the map length
// We can use | operator to give alternative value types
interface NativeMap {
    // The proplem here is value can be number
    // But no worry using the toString on the value
    // just works like a magic
    // Creating a wrapper for NativeMap is a good idea
    [key: string]: string | number
    length: number
}
// We can use readonly on indexable types
interface ReadonlyStringArray {
    readonly [index: number]: string
}
// Class types with interfaces
// Constructors are static beware!
interface ClassInterface {
    name: string
    toString(): string
}

interface ClassConstructor {
    new (name: string): ClassInterface
}

class NativeClass implements ClassInterface {
    name: string

    constructor(name: string) {
        this.name = `@${name}`
    }

    toString(): string {
        return `Classname: [${name}]`
    }
}

function newNativeClass(classConstructor: ClassConstructor, name: string) {
    return new classConstructor(name)
}

const nativeClassObject: NativeClass = newNativeClass(NativeClass, 'NativeClass')
console.log(nativeClassObject)
// We can extend interfaces with extend keyword
interface Edible {
    calorie: number
}

interface Cake extends Edible {
    ingridients: string[]
}

const cake = {} as Cake
cake.calorie = 300
cake.ingridients = ['Sugar', 'Flour', 'Eggs']
// Interfaces extending classes
// When we extend an interface with a class
// It takes all the members without implementation
class State {
    protected state: object

    constructor(state: object) {
        this.state = state
    }
}

interface DynamicState extends State {
    setState(state: object): void
}

class Button extends State implements DynamicState {
    setState(state: object) {
        this.state = state
    }
}