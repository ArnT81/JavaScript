var sum = 0;
var numbers = ['0', '0', '0'];
console.log('___________________________________');
console.log(' Guess on a number between 1 and 3');
console.log(numbers);

function guess(answer) {
    var randomNr = (Math.round(Math.random() * (3 - 1)) + 1);
    var numbers = ['X', 'X', 'X'];
    var theV = randomNr - 1;
    numbers.splice(theV, 1, 'V');
    console.log(numbers);
    if (answer == randomNr) {
        console.log('Congratulations, you found the diamond!');
        sum = sum + 5;
    } else {
        console.log('Sorry, try again');
        sum = sum - 5;
    }

    var numbers = ['0', '0', '0'];
    console.log('Your total score: ' + sum + 'p');
    console.log('___________________________________');
    console.log('           Guess again');
    console.log(numbers);
}