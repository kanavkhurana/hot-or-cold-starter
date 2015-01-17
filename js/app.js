/*global $ */ //EDIT: use the global directive to let JsLint know that $ exists already
//EDIT: check JS Lint errors (ctrl alt j in sublime)
/*
Range
1-10 : burning hot
10-30 : hot
30-50 : lukewarm
50-70 : cool
70-90 : cold
90-100 : ice cold
*/
"use strict"; //EDIT: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/ 
var rangeMap = {
    "1-10": "Burning Hot!",
    "11-20": "Very Hot",
    "21-30": "Hot",
    "31-50": "Cool",
    "51-70": "Cold",
    "71-90": "Very Cold",
    "91-100": "Ice Cold!",
    "0": "Got it! Please start a New Game!"
    };

var targetNumber;
var guessCount = 0;

$(document).ready(function() {

    /*--- Display information modal box ---*/
    $(".what").click(function() {
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function() {
        $(".overlay").fadeOut(1000);
    });

    /*
    Used .click() on the submit button earlier, in conjunction with returning a 'false'
    from the  validateAndSubmitGuess() method. However, this caused the HTML form validation
    to stop from triggering.
	*/
    //$("#guessButton").click(validateAndSubmitGuess);
    $('form').submit(function(event) {
        event.preventDefault();
        validateAndSubmitGuess($("#userGuess").val());
    });

   $('.new').click(newGame);

    newGame();

});

function newGame() {

    //Remove the 'glow' class if added
    if($('.new').hasClass('glow')){
    	$('.new').removeClass('glow');
    }
    //Clear the input text box
    $("#userGuess").val('');
    //Reset the 'Make your Guess' text
    $("#feedback").html('Make your Guess!');
    //Reset the counter to 0
    $("#count").html('0');
    //Clear all previous guesses
    $("#guessList").html('');
    //Generate random number between 1-100
    targetNumber = generateNumber();
    console.log("Generating new number for a new game. Don't peak!", targetNumber);
    //alert('target number: ' + targetNumber);
}

function generateNumber() {
    return Math.floor((Math.random() * 100) + 1); //EDIT:   Math.floor(Math.random()*(max-min+1)+min); max=100 min=1
}

function errorMessage(message) {
    $('.error').text(message).show();
    $('#userGuess').val('').focus(function() { $('.error').hide();}); //focus to input and hide error message
}
function validateAndSubmitGuess(submittedNumber) {
    //alert('giveFeedback was called!');
    console.log("Submitting guess with number = " , submittedNumber); //EDIT: debugging; see console error messages
    if (!submittedNumber) { 
        //EDIT: show error message
        $('.error').text('Please enter a number between 1 and 100!').show();
        $('#userGuess').val('').focus(function() { $('.error').hide();}); //EDIT: focus to input and hide error message
    }
    //Check if a valid number is entered
    else if (isNaN(submittedNumber)) {
        errorMessage('Please enter a valid number!'); //EDIT: use function to display error message        
    }
    //Check if the number is not a decimal
    else if (submittedNumber % 1 !== 0) { //EDIT: use !== to compare with 0
        errorMessage('Please enter a whole number!!'); //EDIT: use function to display error message        
    }
    //Check if number entered is between 1-100
    else if (submittedNumber < 0 || submittedNumber > 100) {
        errorMessage('Please enter a number between 1-100!'); //EDIT: use function to display error message        
    } else {

        //Check the range and print the result
        console.log("Guessing game has started...Guessing: ", submittedNumber);
        var difference = submittedNumber - targetNumber;
        //Correct guess
        if (difference === 0) {
            $("#feedback").html(rangeMap["0"]);
            //Deactivate 'Guess' button
            $("#guessButton").attr('disabled', 'disabled');
            //Add the glow effect on the 'New Game' button
            $(".new").addClass('glow');
        } 
        //Display appropriate message
        else {
            difference = (difference < 0) ? (difference * -1) : difference;

            giveFeedback(difference);
        }

        //Increase the count
        guessCount++;
        $("#count").html(guessCount);
        $("#guessList").append('<li>'+$("#userGuess").val()+'</li>');
    }

    //return false;
}

function giveFeedback(difference) {
    //Loop through all ranges in the rangeMap
    for (var range in rangeMap) {
        //alert(range);
        var lower = range.split('-')[0];
        var higher = range.split('-')[1];
        if (difference >= lower && difference <= higher) {
            $("#feedback").html(rangeMap[range]);
            break;
        }
    }
}
