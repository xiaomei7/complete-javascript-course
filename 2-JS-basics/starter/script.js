console.log("Hello World!!");

var firstName = 'John';

console.log(firstName);

var lastName = 'Smith';
var age = 28;

// javascript datatype
// 1. Number, always floating point numbers
// 2. String
// 3. Boolean
// 4. Undefined, data type that does not have a value yet
// 5. Niull, non-existent 
// javascript is dynamic typing 

var fullAge = true;
console.log(fullAge);

var job; // undefined 
job = "junior engineer";

// automatically type conversion
console.log(firstName + ' ' + age);

var job2, isMarried;
job2 = 'teacher';
isMarried = false;

console.log(firstName + ' is a ' + age + ' year old.');

// variable mutation
age = 'twenty eight';
job = 'driver';

// pop-up
alert(firstName + ' is a ' + age + ' year old.');

lastName = prompt('What is his last name?');
console.log('You entered: ' + lastName);

/*******************
	Basic Operator
*/

// math operator 
var year = 2018;
var ageJohn, ageMark;
ageJohn = 28;
ageMark = 33;
var yearJohn = year - ageJohn;
var yearMark = year - ageMark;

console.log(yearJohn);

// logical operator 
var johnOlder = ageJohn > ageMark;
console.log(johnOlder);

// typeof operator
console.log(typeof johnOlder);

/***********************
	Operator Precedence 
*/

// always use () when you're unsure!

/************************
	If / else statements
*/

var firstName = 'John';
var civilStatus = 'single';

if (civilStatus === 'married')
{
	console.log(firstName, ' is married!')
}
else
{
	console.log(firstName + ' will hopefully marry soon :)');
}

/*
	Boolean Logic
*/

var firstName = 'John';
var age = 16;

if (age < 13)
{
	console.log(firstName + ' is a boy.');
}
else if (age >= 13 && age < 20) 
{
	console.log(firstName + ' is a teenager.');
}
else
{
	console.log(firstName + ' is a man.');
}

/**********************************************
	The Ternary Operator and Switch Statements
*/

var firstName = 'John';
var age = 16;

// ternary operator 
// condition ? if : else 
age >= 18 ? console.log(firstName + ' drinks beer.') : console.log(firstName + ' drinks juice.');

var drink = age >= 18 ? 'beer' : 'juice';
console.log(drink);

// switch 
// useful for if/else statement with lots of elses!
var job = 'cop';
switch (job) 
{
	case 'teacher':
		console.log(firstName + ' teaches kids how to code.');
		break;
	case 'driver':
		console.log(firstName + ' drives an uber in Lisbon.');
		break;
	case 'designer':
		console.log(firstName + ' designs beautiful websites.');
		break;
	default:
		console.log(firstName + ' does something else.'); // last case, does not need break
}

/***************************************************
	Truthy and Falsy values and equality operators 
*/

// falsy values: undefined, null, 0, '', NaN
	// NaN: Not-a-Number
// truthy values: NOT falsy values

// equality operators
var height = 23;

if (height == '23')
{
	console.log('The == operator does type coercion!');
}

/************************************************
	Functions (IMPORTANT: Never repeat yourself)
*/

function calculateAge(birthYear)
{
	return 2018 - birthYear;
}

var ageJohn = calculateAge(1994);
console.log(ageJohn);

function yearUntilRetirement(year, firstName)
{
	var age = calculateAge(year);
	var retirement = 65 - age;
	if (retirement > 0)
	{
		console.log(firstName + ' retires in ' + retirement + ' years.');
	}
	else
	{
		console.log(firstName + ' is already retired.')
	}
}

yearUntilRetirement(1994, 'Eunice');

/****************************************
	Function Statements and Expressions
*/


// function expression (when javascript expect a value(a return), a statement does not have a return)

var whatDoYouDo = function(job, firstName) {
	switch (job)
	{
		case 'teacher':
			return firstName + ' teaches kids how to code.';
		case 'driver':
			return firstName + ' drives a cab in Lisbon.';
		case 'designer':
			return firstName + ' designs beautiful websites';
		default:
			return firstName + ' does something else.'
	}
}

console.log(whatDoYouDo('teacher', 'Mike'));

/*************
	Arrays
*/

var names = ['John', 'Mark', 'Jane'];
var years = new Array(1990, 1969, 1948);

console.log(names[0]);
console.log(names);
console.log(names.length);

names[1] = 'Ben';
//names[5] = 'Mary'; // will result empty*2
names[names.length] = 'Mary';
console.log(names);

// different data types
var Iris = ['Iris', 'Smith', 1990, 'teacher', false];

// both push and unshift returns the new length
Iris.push('blue');
Iris.unshift('Ms. ');
console.log(Iris);

Iris.pop();
console.log(Iris);

// shift() method removes the first item of an array. return removed item
Iris.shift();
console.log(Iris);

// return -1 if it is not in an array
console.log(Iris.indexOf(1990));

/****************************
	Objects and Properties
*/

var john = {
	firstName: 'John',
	lastName: 'Smith',
	birthYear: 1990,
	family: ['Jane', 'Mark', 'Bob', 'Emily'],
	job: 'teacher',
	isMarried: false,
	calcAge: function() { // function expression
		return 2018 - this.birthYear;
	}
};

console.log(john);
console.log(john.firstName);
console.log(john['lastName']);

// john.job = 'designer';
// john['isMarried'] = true;
// console.log(john);

var jane = new Object();
jane.firstName = 'Jane';
jane.birthYear = 1969;
jane['lastName'] = 'Smith';
console.log(jane);

john.age = john.calcAge();
//console.log(john);

/************************
	Loops and iteration
*/ 

for (var i = 0; i < 10; i += 2)
{
	console.log(i);
}

var Iris = ['Iris', 'Lannister', 1990, 'mage', false];

for (var i = 0; i < Iris.length; i++)
{
	if (typeof Iris[i] !== 'string') continue;
	console.log(Iris[i]);
}

// looping backwards
//for (var i = Iris.length - 1; i >= 0; i--) {}


