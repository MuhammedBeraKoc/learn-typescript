"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// In TS we don't always have to explicitly
// declare the type
// Most of the times TS does that for us
var value = 23;
// Here value is inferred as number
// Best common type
// TS thankfully finds the best common type for an array
// with different types
// Generally a super type
// or a union type
var x = [2, 3, null];
var Furniture = /** @class */ (function () {
    function Furniture(name) {
        this.name = name;
    }
    return Furniture;
}());
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        return _super.call(this, 'Table') || this;
    }
    return Table;
}(Furniture));
var Chair = /** @class */ (function (_super) {
    __extends(Chair, _super);
    function Chair() {
        return _super.call(this, 'Chair') || this;
    }
    return Chair;
}(Furniture));
var Sofa = /** @class */ (function (_super) {
    __extends(Sofa, _super);
    function Sofa() {
        return _super.call(this, 'Sofa') || this;
    }
    return Sofa;
}(Furniture));
// Now here you have to be explicit
// Since it will not make the common type Furniture
// But union of 3 types
// const furnitures = [new Table(), new Chair(), new Sofa()]
// So the right way
var furnitures = [new Table(), new Chair(), new Sofa()];
// Contextual typing
// TS can infer a type when in a specific context
// Generally events, and generic types
function createFurnitures() {
    return [new Table(), new Chair(), new Sofa()];
}
// Unlike the first example now it Furniture[]
var furnitureSet = createFurnitures();
