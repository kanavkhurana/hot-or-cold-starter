/*
Range
1-10 : burning hot
10-30 : hot
30-50 : lukewarm
50-70 : cool
70-90 : cold
90-100 : ice cold
*/
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
        validateAndSubmitGuess();
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

    //alert('target number: ' + targetNumber);

}

function generateNumber() {
    return Math.floor((Math.random() * 100) + 1);
}

function validateAndSubmitGuess() {
    //alert('giveFeedback was called!');

    if (!$("#userGuess").val()) {

    }
    //Check if a valid number is entered
    else if (isNaN($("#userGuess").val())) {
        alert('Please enter a valid number!');
    }
    //Check if the number is not a decimal
    else if ($("#userGuess").val() % 1 != 0) {
        alert('Please enter a whole number!');
    }
    //Check if number entered is between 1-100
    else if ($("#userGuess").val() < 0 || $("#userGuess").val() > 100) {
        alert('Please enter a number between 1-100!');
    } else {

        //Check the range and print the result
        var difference = $("#userGuess").val() - targetNumber;
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
