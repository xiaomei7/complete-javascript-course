/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

// function constrcutor capital letter by convention
let Question = function (question, options, anwser) {
    this.question = question;
    this.options = options;
    this.anwser = anwser;
};

let questions = [];

questions.push(new Question(
    'Which one of then are the 2nd game of the Elder Scrolls?: ',
    ['0: Skyrim', '1: Morrowind', '2: Daggerfall', '3: Oblivion'],
    2
));

questions.push(new Question(
    'Which race is non-playable in the Elder Scroll: Skyrim?: ',
    ['0: Dark Elf', '1: Snow Elf', '2: Wood Elf', '3: High Elf'],
    1
));

questions.push(new Question(
    'How many guild can you join in the Elder Scroll: Skyrim?: ',
    ['0: 1', '1: 2', '2: 3', '3: 4'],
    3
));

questions.push(new Question(
    'What is the first hold capital that a player would encounter in the Elder Scroll: Skyrim? Assume they follow the main quest.: ',
    ['0: Whiterun', '1: Riften', '2: Falkreath', '3: Winterhold'],
    0
));
 
questions.push(new Question(
    'How many volume does the book The Song of Ice and Fire have? (By 2018): ',
    ['0: 3', '1: 4', '2: 5', '3: 6'],
    2
));



//console.log(questions);

Question.prototype.questions = questions;
Question.prototype.getRandomQuestion = function () {
    let q = questions[Math.floor(Math.random() * questions.length)];
    console.log(q.question);
    // NOTE The join() method joins the elements of an array into a string, and returns the string.
    console.log(q.options.join('\r\n'));
    this.anwser = q.anwser;
};

Question.prototype.checkCorrectAnswer = function (index) {
    if (this.anwser === index) {
        score += 1;
        console.log('Congrats! Your answer is correct!');
        console.log('Your current score is ' + score);
    } else {
        console.log('Sorry, you missed that one :\(');
        console.log('Your current score is ' + score);
    }
};

let gamePlaying = true;
let score = 0;

while (gamePlaying) {
    Question.prototype.getRandomQuestion();
    
    do {
        userPrompt = prompt('Please Enter Your Anwser with Index: ');
    } while (userPrompt === null || userPrompt === "")

    if (userPrompt === 'exit') {
        gamePlaying = false;
        console.log('Sorry to see you go :\(! Your total score is ' + score);
        break;
    }
    
    Question.prototype.checkCorrectAnswer(Number(userPrompt));
}
