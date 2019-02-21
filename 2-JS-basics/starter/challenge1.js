/*
	Coding Challenge #1
*/

// BMI = mass / (height * height); mass in kgs, height in meters
function calculateBMI(mass, height)
{
	return mass / (height * height);
}

// store Mark and John's mass and height in variables 
let MarkMass, MarkHeight, JohnMass, JohnHeight, MarkBMI, JohnBMI, isMarkHigher;
MarkMass = 60;
MarkHeight = 1.68;
JohnMass = 90;
JohnHeight = 1.86;
// calculate both their BMIs
MarkBMI = calculateBMI(MarkMass, MarkHeight);
JohnBMI = calculateBMI(JohnMass, JohnHeight);
// create a boolean variable containing  information about whether Mark has a higher BMI than John
isMarkHigher = MarkBMI > JohnBMI;
// Print a String to the console containing the variable from the last step
console.log("Is Mark's BMI higher than John's? ", isMarkHigher);

if (MarkBMI > JohnBMI)
{
	console.log("Mark's BMI is higher than John's.");
}
else
{
	console.log("John's BMI is higher than Mark's.");
}