// NOTE function constructor (with capital letter)

/*var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};*/

var Person = function(name, yearofBirth, job) {
    this.name = name;
    this.yearOfBirth = yearofBirth;
    this.job = job;
}

Person.prototype.calculateAge = 
function() {
    console.log(2018 - this.yearOfBirth);
};

Person.prototype.lastName = 'Smith';

// new enable this point to object instead of global 
var johnFC = new Person('John', 1990, 'teacher');
var janeFC = new Person('Jane', 1969, 'designer');
var markFC = new Person('Mark', 1948, 'retired');

johnFC.calculateAge();
janeFC.calculateAge();
markFC.calculateAge();

console.log(johnFC);

// NOTE object.create

// TODO figure out the inheritance relationship here
/*let personProto = {
    calculateAge: function () {
        console.log(2018 - this.yearOfBirth);
    }
};

let john = Object.create(personProto);
john.name = 'john';
john.yearOfBirth = 1990;
john.job = 'teacher';

let jane = Object.create(personProto, {
    name: {
        value: 'Jane'
    },
    yearOfBirth: {
        value: 1969
    },
    job: {
        value: 'designer'
    },
    gender: {
        value: 'female'
    }
});*/

// primitives vs objects

/*let age = 27;
let obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b) {
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);

console.log(age);
console.log(obj.city);*/

// function (is an object!), pass and return 

let years = [1990, 1965, 1937, 2005, 1998, 1994];

function arrayCalc(arr, fn) {
    let arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(limit, el) {
    return el >= limit;
}

function maxHeartRate(el) {
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1;
    }
}

let ages = arrayCalc(years, calculateAge);
let fullAges = arrayCalc(ages, isFullAge);
let rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(rates);
// bind usage
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));

console.log(fullJapan);

function interviewQuestion(job) {
    if (job === 'designer') {
        return function (name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function (name) {
            console.log('Waht subject do you teach, ' + name + '?');
        }
    } else {
        return function (name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

let teacherQuestion = interviewQuestion('teacher');

// NOTE the pass and the return of functions
teacherQuestion('John');
interviewQuestion('designer')('Mark');

// NOTE Immediately Invoked Functions Expressions, IIFE

/*function game() {
    let score = Math.random() * 10;
    console.log(score >= 5);
}
game();*/

(function () { // treat as expression not declaration
    let score = Math.random() * 10;
    console.log(score >= 5);
})();

(function (goodLuck) {
    let score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);

/* NOTE Closures
    the returned (inner) function uses variables that belongs to the function (outer) that returns it, which is already gone.
    Summary: an inner function has alwaus access to the variables and parameters of it's outer funtion, even after the outer function has returned.
    
    The scope chain always remain intact.
    Lesson 68
*/

// TODO [x]search for more materials on closure
function retirement(retirementAge) {
    let a = ' years left until retirement.';
    return function (yearOfBirth) {
        let age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

let retirementUS = retirement(66);
retirementUS(1990);

retirement(66)(1990);

function interviewQuestionWithClosure(job) {
    return function (name) {
        if (job === 'designer') {
            console.log(name + ', can you please explain what UX design is?');
        } else if (job === 'teacher') {
            console.log('Waht subject do you teach, ' + name + '?');
        } else {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

interviewQuestionWithClosure('teacher')('John');

// NOTE bind call and apply 

let john1 = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function (style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' + this.name + ', I\'m a ' + this.job + ', and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ', and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

let emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john1.presentation('formal', 'morning');
// method borrowing; the call allows us to set this variable to other object (in this case, emily)
john1.presentation.call(emily, 'friendly', 'afternoon');
// won't work, since the method does not accept array
//john1.presentation.apply(emily, ['friendly', 'afternoon']);

let johnFriendly = john1.presentation.bind(john1, 'friendly'); // carring 

johnFriendly('morning');
