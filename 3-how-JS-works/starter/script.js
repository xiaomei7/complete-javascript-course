///////////////////////////////////////
// Lecture: Hoisting

//calculateAge(2001); // works because of hoisting

function calculateAge(year)
{
    console.log(2018 - year);
}

//calculateAge(1994);


// can't execute
//retirement(1994);

// hoisting only works for function declaration, not function expression
var retirement = function(year)
{
    console.log(65 - (2018 - year));
}


//retirement(1990);



// variables
//console.log(age); // during hoisting, all variables are setted to undefined 
var age = 23;
//console.log(age);


function foo() 
{
    var age = 65;
    console.log(age);
}
foo();
console.log(age);



///////////////////////////////////////
// Lecture: Scoping
// in javascript, the only way to create new scope is to create a function
// scope chian works from small to large scopes


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword
// stores at execution context object

//console.log(this); // window object

function calcAge() 
{
    console.log(2018 - year);
    console.log(this); // in the regular funtion call, this is always point to the global object
}

var John = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        console.log(this);
        console.log(2018 - this.yearOfBirth);

        /*
        function innerFunction() {
            console.log(this); // still a regular function, not a method in object!!
        }
        innerFunction();
        */
    }
}

John.calculateAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1984
}

// method borrowing; no ()
mike.calculateAge = John.calculateAge;
mike.calculateAge();









