// tslint:disable
// Enums are basically values disguised in constant
// names for making code readable
enum KeyboardSignal {
    TAB = 7,
    SPACE = 48,
    UP = 53,
}

console.log(`Keyboard signal: ${KeyboardSignal.TAB}`)
// Using enums as parameters
enum Oven {
    OPEN,
    CLOSE
}

function bakeACake(recipient: string, oven: Oven): void {
    if (oven === Oven.OPEN) {
        console.log(recipient)
        console.log('Cake is ready!')
    } else {
        console.log('Oven is not working now:(')
    }
}

bakeACake('Stir the dough. Add sugar and oil. Put some chocolate', Oven.OPEN)
// If an enum value is computed others must be initialized too
function getRandomNumber(): number {
    return Math.floor(Math.random() * 100)
}

enum E {
    A = getRandomNumber(),
    // B, // Error: Enum member must have initializer.
}
// String enums
// As name implies their values are string
enum Direction {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
}
// Heterogenous enums
// Enums with different value classes
// You can only use numbers and strings for enum values
// Think about why is it like that?
enum HeterogenousAnswer {
    YES = 1,
    NO = "FALSE"
}
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
enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    // Computeds always the last members
    G = "123".length
}
// Union enums and enum member types
//  A literal enum member is a constant enum member with no initialized value
// or initialized with string or numeric literal
// Enums in runtime
enum E {
    X, Y, Z
}

function func(obj: { X: number }) {
    return obj.X
}

func(E)
// Enums in compile time
enum LogLevel {
    ERROR, WARN, INFO, DEBUG
}
type LogLevelString = keyof typeof LogLevel

function printImportant(key: LogLevelString, message: string) {
    const num = LogLevel[key]
    if (num <= LogLevel.WARN) {
        console.log('Log level key is', key)
        console.log('Log level value is', num)
        console.log('Log level message is', message)
    }
}

printImportant('ERROR', 'This is a message')
// Reverse mapping
// Only for number enums
enum Enum { A }
let a = Enum.A
let nameOfA = Enum[a]
console.log({nameOfA})
// const enums
// They have no computed members
// and they will be removed in compilation
const enum Alert {
    Mild,
    Crucial
}

const myAlert: Alert = Alert.Mild
// Ambient enums
// They used to describe the shape of a predifined enum