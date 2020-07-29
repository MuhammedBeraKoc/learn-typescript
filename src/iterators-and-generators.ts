// If an object implements Symbol.iterator it is deemed to be iterable
// Some built-in types like Map, Array etc. is iterable
// The easiest way to test it is to use hasOwnProperty method
function isIterable(o: object): boolean {
    if (o === null) return false
    return typeof o[Symbol.iterator] === 'function'
}

console.log(isIterable(['a', 'b', 'c']))
// Let's create our iterable object
class IterableObject implements Iterable<number> {

    [Symbol.iterator]() {
        let value = 0
        const iterator = {
            next() {
                ++value
                if (value < 5) {
                    return { value, done: false }
                }
                return { value, done: true }
            }
        }
        return iterator
    }
}

const iterableObject = new IterableObject()
// Traversing an iterable object
for (const value of iterableObject) {
    console.log({value})
}

// The difference between for ... of and for ... in is that
// First iterates over values, second over keys
// Also for in works on every object whereas for of is for iterables only
// Generator functions are the concise way to define iterators
// They uses *(star) as an indicator
// And instead of return they use yield
// They behave as constructor functions
function* idMaker() {
    let id = 0
    while (id < 3) {
        yield 100 + id++
    }
}

for (const id of idMaker()) {
    console.log({id})
}

// Or they can be constructed in protocol based
function* generatorWithLogs() {
    console.log('Generator started')
    console.log('First value is being yielded')
    yield 0
    console.log('Second value is being yielded')
    yield 1
    console.log('Generator finished')
}

const iterator = generatorWithLogs()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
// We can also inject yield values from outside
console.log('----------------------------------------------------------------')
function* stringGenerator() {
    const stringValue = yield 'String value'
    console.log({stringValue})
}

const stringIterator = stringGenerator()
console.log(stringIterator.next())
console.log(stringIterator.next('Unexpected string'))