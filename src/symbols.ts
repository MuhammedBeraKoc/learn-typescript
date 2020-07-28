// Introduced in ES2015
// symbol is a primitive data type like number
// It can be constructed from Symbol class
const nativeSymbol = Symbol()
// Can be used with a key string
// it is immutable and unique
const keySymbolOne = Symbol('key')
const keySymbolTwo = Symbol('key')
// console.log(keySymbolOne === keySymbolTwo) // Error: no type overlap
// Since Symbol creates unique symbols with unique types
// Symbols are especially useful for object keys
const nameKey = Symbol('username')
const user = {
    [nameKey]: 'Herald White',
    age: 38
}
console.log(user[nameKey])
// Since they are computed they can be used in classes as member
// Since there are no real classes in JS (Syntactic sugar)
// They are objects too!
const getClassNameSymbol = Symbol()
class SymbolOrientedClass {
    static [getClassNameSymbol]() {
        return '@SymbolOrientedClass'
    }
}
console.log({className: SymbolOrientedClass[getClassNameSymbol]()})
// There are some cool built-in symbols that you can use
