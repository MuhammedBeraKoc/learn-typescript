"use strict";
// In TS we don't always have to explicitly
// declare the type
// Most of the times TS does that for us
const value = 23;
// Here value is inferred as number
// Best common type
// TS thankfully finds the best common type for an array
// with different types
// Generally a super type
// or a union type
const x = [2, 3, null];
class Furniture {
    constructor(name) {
        this.name = name;
    }
}
class Table extends Furniture {
    constructor() {
        super('Table');
    }
}
class Chair extends Furniture {
    constructor() {
        super('Chair');
    }
}
class Sofa extends Furniture {
    constructor() {
        super('Sofa');
    }
}
// Now here you have to be explicit
// Since it will not make the common type Furniture
// But union of 3 types
// const furnitures = [new Table(), new Chair(), new Sofa()]
// So the right way
const furnitures = [new Table(), new Chair(), new Sofa()];
// Contextual typing
// TS can infer a type when in a specific context
// Generally events, and generic types
function createFurnitures() {
    return [new Table(), new Chair(), new Sofa()];
}
// Unlike the first example now it Furniture[]
const furnitureSet = createFurnitures();
