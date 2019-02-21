/*****************************
* CODING CHALLENGE 4
*/

/*
Let's remember the first coding challenge where Mark and John compared their BMIs.
 Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height
2. Then, add a method to each object to calculate the BMI. 
	Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. 
	Don't forget they might have the same BMI.

Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

GOOD LUCK 😀
*/

let Mark, John;
Mark = {
	name: 'Mark Johnson',
	mass: 78,
	height: 1.78,
	BMI: function() {
		this.bmi = this.mass / (this.height * this.height);
		return this.bmi;
	}
}
John = {
	name: 'John Markson',
	mass: 67,
	height: 1.71,
	BMI: function() {
		this.bmi = this.mass / (this.height * this.height);
		return this.bmi;
	}
}

if (Mark.BMI() > John.BMI())
{
	console.log(Mark.name + ' has the higher BMI, and his BMI is ' + Mark.BMI());
}
else if (Mark.BMI() < John.BMI())
{
	console.log(John.name + ' has the higher BMI, and his BMI is ' + John.BMI());
}
else
{
	console.log('They both have the same BMI, which is ' + Mark.BMI());
}

