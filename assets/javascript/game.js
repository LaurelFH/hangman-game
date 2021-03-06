//Javascript file for Hangman-game		
///////Global variables to track score and words and guesses 
var guessWord = "";
var wordBank = ["cat", "yokai", "tempura", "fire", "sushi", "street", "watch", "coin", "tree", "shrine", "ghost","spirit", "devil", "school"];
var wins = 0;
var losses = 0;
var chancesLeft = 10;//give the player 5 chances over the number of letters in the word?
var incorrectLetters = [];
var correctLetters = [];

////////////Events

//starts the game by selecting a word from the wordlist and recording info from the player 

document.onkeyup = function (event){
	if(guessWord == ""){
		pickWord();
		
	}
	//make sure the letter the player picked is inside of the selected word; includes key from the player
	var playerEntry = event.key;
	//alert(playerEntry);
	checkLetter(playerEntry.toLowerCase());

	//makes the player's letter visible and the tracking info for score and correct/incorrect letters visible 
	displayGuessedLetters();
	displayScore();
	
	//when there are no more chances left, the game will reset and select a new word 
	if(chancesLeft == 0){
		resetGame();
		losses++;
	}


}

/////////////Functions

//chooses random word from the wordbank array 

function pickWord () {
	guessWord = wordBank[Math.floor(Math.random() * wordBank.length)];

}



//this will check to see if the letter the player selected is present in the word the computer selects and puts it in the guessed letter section
//have to give this one a letter (parameter) to check!!! 
function checkLetter(letterToCheck){
	var hasLetter = guessWord.includes(letterToCheck);

		//check if the letter that the player selected is in the random word 
	if (hasLetter){
		//if it is in the word, put the letter in the correct letter collection
		correctLetters.push(letterToCheck);
	}
	else{
		//else in the word, put the letter in the incorrrect letter collection, then chances left goes down by 1
		incorrectLetters.push(letterToCheck); 
		chancesLeft--;
	}

}


//function to display all letters

function displayGuessedLetters(){

	displayCorrectLetters();
	displayIncorrectLetters();

}

//displays the incorrects letters

function displayIncorrectLetters(){
	var displayIncorrectLetters = "<p>You have guessed: " + incorrectLetters.toString() + "</p>";
 
	document.getElementById("incorrectLettersDisplay").innerHTML = displayIncorrectLetters;
}


//displays the correct letters and dashes 
function displayCorrectLetters(){
	//letter in my word string 
	var wordString= "";
	//all of correct letters in the word
	var countLetter = 0; 
	//loops through to check if the letter is in correct letter array 
	for(var indexOfLetter = 0; indexOfLetter < guessWord.length; indexOfLetter++){
		
		//if the letter is in the correct letter array, then I want it to show this letter 
		//assume that the player has not picked the letter wordString.charAt(i) until we find it in the correct letters array 
		var correctArrStr = correctLetters.toString();
		var hasPlayerCorrectlyGuessed = false;
		if(correctArrStr.length > 0)
		{
			hasPlayerCorrectlyGuessed = correctArrStr.includes(guessWord.charAt(indexOfLetter));
		}

		if (hasPlayerCorrectlyGuessed){
			wordString = wordString + guessWord.charAt(indexOfLetter);
			//counts the number of letters that the player guesses correctly by 1
			countLetter++;
		}
				//for anything else, it should put a dash instead 
		else {
			wordString = wordString + "_ ";

		}
	}
	//if the player guesses all of the letters and it matches all the letters in the word then I want the game to add 1 to wins and reset 
	if (countLetter == guessWord.length){
		wins++;
		resetGame();
	}
	//the function should also show the letters or dashes to the player in the reveal section div  
	
	document.getElementById("revealSection").innerHTML = wordString;
}





//	}

//}


//updates the score and other info on the display

function displayScore(){
	var score = "<p>wins: " + wins + "</p>" +
	"<p>losses: " + losses + "</p>"+
	"<p>Chances Left: " + chancesLeft +"</p>"; 

//document.querySelector("scoredisplay").innerHTML = score;
//how to display the score to player
document.getElementById("scoreDisplay").innerHTML = score;
}




//resets the game for the player
function resetGame(){
	chancesLeft = 10;
	guessWord = "";
	incorrectLetters = [];
	correctLetters = [];
}
