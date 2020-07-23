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
// Normally JS has prototype based inheritance
// But for many developers it may seem uncomprehensible
// So using syntactic sugar is a good way
// Basic class example
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world");
var generateId = function () {
    var id = '';
    for (var i = 0; i < 8; ++i) {
        var randomValue = Math.floor(Math.random() * 2);
        if (randomValue === 0) {
            id = id + String.fromCharCode('a'.charCodeAt(0) + Math.floor(Math.random() * (26)));
        }
        else {
            id = id + String.fromCharCode('0'.charCodeAt(0) + Math.floor(Math.random() * 10));
        }
    }
    return id;
};
var NativeTerminal = /** @class */ (function () {
    function NativeTerminal() {
        this.id = generateId();
    }
    NativeTerminal.prototype.run = function () {
        console.log('\x1b[35m%s\x1b[0m', this.toString());
        console.log('\x1b[32m%s\x1b[0m', 'Script is has been loaded.');
    };
    NativeTerminal.prototype.toString = function () {
        return "@" + this.constructor.name + "[" + this.id + "]";
    };
    return NativeTerminal;
}());
var WindowsTerminal = /** @class */ (function (_super) {
    __extends(WindowsTerminal, _super);
    function WindowsTerminal(script, version) {
        var _this = _super.call(this) || this;
        _this.version = version;
        _this.script = script;
        return _this;
    }
    WindowsTerminal.prototype.run = function () {
        _super.prototype.run.call(this);
        console.log('\x1b[37m\x1b[44m%s\x1b[0m', this.script);
        console.log('\x1b[32m%s\x1b[0m', 'Script executed.');
    };
    WindowsTerminal.prototype.toString = function () {
        return "@" + this.constructor.name + "v" + this.version + "[" + this.id + "]";
    };
    return WindowsTerminal;
}(NativeTerminal));
// When a class is a child for another class we can use
// parent as type
var CMD = new WindowsTerminal('echo "Hello World!" > out.txt', '1.5');
CMD.run();
// Visibility modifiers
// public, private and protected
// When a class member is public
// We can reach it from whereever we want
// All members are public by default
// A private member is only accessible within the class
// With the version 3.8 of TS
// it now supports new JS syntax for private fields (syntax: #member)
// If you want to use them change target to es2015
// But for normal case we will use private identifier
var PrivateClass = /** @class */ (function () {
    function PrivateClass(privateField) {
        this.privateField = privateField;
    }
    PrivateClass.prototype.print = function () {
        console.log('\x1b[33m%s\x1b[0m', "Private value: \"" + this.privateField + "\"");
    };
    return PrivateClass;
}());
var privateClass = new PrivateClass('Secret');
privateClass.print();
// privateClass.privateField // Oops!
// protected is only visible for children of a class
var Parent = /** @class */ (function () {
    function Parent() {
        this.inheritedValue = Math.floor(Math.random() * 100);
    }
    return Parent;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Child.prototype.print = function () {
        console.log('\x1b[37m\x1b[45m%s\x1b[0m', "Inherited value: " + child.inheritedValue);
    };
    return Child;
}(Parent));
var child = new Child();
child.print();
// We can make a constructor protected
// Which makes the class cannot be instantiated
// But it is still expendable
// Hint: Very similar to abstract class that we will see later
var ExpandableClass = /** @class */ (function () {
    function ExpandableClass() {
        this.secretKey = 'I cannot be instantiated.';
    }
    return ExpandableClass;
}());
var ARandomClass = /** @class */ (function (_super) {
    __extends(ARandomClass, _super);
    function ARandomClass() {
        var _this = _super.call(this) || this;
        console.log('\x1b[37m\x1b[41m%s\x1b[0m', "The secret is \"" + _this.secretKey + "\"");
        return _this;
    }
    return ARandomClass;
}(ExpandableClass));
var aRandomObject = new ARandomClass();
// readonly modifier: Like we said earlier
// If a property is readonly it can only be
// assigned during creation (in our case constructor)
var StubbornClass = /** @class */ (function () {
    // Classic way of defining readonly variables
    // readonly isChangable: boolean
    // Parameter property for readonly
    // That also works for public, private and protected
    // Look how concise is the code now
    function StubbornClass(isChangable) {
        if (isChangable === void 0) { isChangable = false; }
        this.isChangable = isChangable;
        // A quirky way of controlling input variable
        this.isChangable = isChangable ? !isChangable : isChangable;
    }
    return StubbornClass;
}());
var stubbornObject = new StubbornClass();
// stubbornObject.isChangable = true // Compile time error
// Accessors (or getters and setters)
// To organise the flow of data in our class
// Or to obtain private and protected data
// We use accessors
// A short example
// Note: Never use setters for private members of a class
// Since it messes all the logic behind the private keyword
// Below is just for an example
var Person = /** @class */ (function () {
    function Person(name) {
        this._name = name;
    }
    Object.defineProperty(Person.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (newName) {
            this._name = newName;
        },
        enumerable: false,
        configurable: true
    });
    return Person;
}());
var person = new Person('Henry');
person.name = 'Jane';
console.log(person.name);
// Static members: Let's assume we need
// Some value or method from a class
// But we don't need the instance
// Math class is a fine example
// Since we use it for utility
// And all of its methods are static
// So we use static keyword
// And access the member directly from the class
var StaticClass = /** @class */ (function () {
    function StaticClass() {
    }
    StaticClass.IP_ADDRESS = '192.0.3.12';
    return StaticClass;
}());
console.log('\x1b[30m\x1b[42m%s\x1b[0m', "Current IP: " + StaticClass.IP_ADDRESS);
// Abstract classes: One the best use cases of abstract classes
// is that. Assume you need shapes like triangle, square or circle.
// They all differentiate in some way. But they have
// a lot in common like color and area
// So they have an ancestor as Shape let's say
// But shape doesn't implement any of these features
// Then we can easily say Shape is abstract
// And implement abstract features in offsprings
var Shape = /** @class */ (function () {
    function Shape(color) {
        this.color = color;
    }
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(color, radius) {
        var _this = _super.call(this, color) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.calculateArea = function () {
        var rawResult = (Math.PI * Math.pow(this.radius, 2)).toString();
        // Tip: To convert string to number use + unary operator
        // At the beginning of the string
        return +rawResult.slice(0, rawResult.indexOf('.') + 6);
    };
    Circle.prototype.print = function () {
        console.log('\x1b[30m\x1b[47m%s\x1b[0m', "@Circle:[Color: " + this.color + ", Area: " + this.calculateArea() + "]");
    };
    return Circle;
}(Shape));
var blueCircle = new Circle('blue', 2);
blueCircle.print();
// Advanced Techniques
// Constructor Function
// Tip: To create a variable for constructor do like below
var SoundAPI = /** @class */ (function () {
    function SoundAPI() {
        this._key = generateId();
    }
    Object.defineProperty(SoundAPI.prototype, "key", {
        get: function () {
            return this._key;
        },
        enumerable: false,
        configurable: true
    });
    SoundAPI.company = 'Solaris LTD';
    return SoundAPI;
}());
var soundAPIMaker = SoundAPI;
console.log(soundAPIMaker.company);
var soundAPIObject = new soundAPIMaker();
console.log('\x1b[30m\x1b[43m%s\x1b[0m', "Key: [" + soundAPIObject.key + "]");
// Like I said before
// You can use a class as an interface
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var point3d = { x: 1, y: 2, z: 3 };
