
$(document).ready(function(){

var triviaQuestions = [{
	question: "What is Peter Parkers middle name?",
	answerList: ["Michael", "Miles", "Benjamin", "Ben"],
	answer: 2
},
{
	question: "Who has played DareDevil?",
	answerList: ["Charlie Cox and Ben Affleck", "Rex Smith and Michael Keaton", "Ben Affleck and Charlie Day", "George Clooney and Val Kilmer"],
	answer: 0
},
{
	question: "What was Thors alter ego?",
	answerList: ["Chris Pine", "Chris Hemsworth", "Thor", "Donald Blake"],
	answer: 3
},
{
	question: "what issue did Spider-Man first appear in?",
	answerList: ["Spider-Man #1", "Amazing Fantasy #15", "Fantastic Four #4", "Amazing Fantasy #20"],
	answer: 1
},
{
	question: "Who is credited for creating most of the Marvel Heroes?",
	answerList: ["Steve Ditko", "Jack Kirby", "Kevin Smith", "Stan Lee"],
	answer: 3
},
{
	question: "What is Wolverines real name?",
	answerList: ["Logan", "James Howlett", "Victor Creed", "Hugh Jackman"],
	answer: 1
},
{
	question: "Who was not a founding X-Men?",
	answerList: ["Cyclops", "Marvel Girl", "Wolverine", "Beast"],
	answer: 2
},
{
	question: "Who created the Punisher?",
	answerList: ["Gerry Conway", "John Romita Sr", "Ross Andru", "All the above"],
	answer: 3
},
{
	question: "What was Jessic Jones super hero name?",
	answerList: ["Jewel", "Power Girl", "Pulse", "All the above"],
	answer: 0
},
{
	question: "What was Tony Stark addicted to?",
	answerList: ["Pot", "LSD", "Alchol", "None of the above"],
	answer: 2
},
{
	question: "Who is Jessica Jones Married to?",
	answerList: ["Luke Cage", "Peter Parker", "Tony Stark", "Danny Rand"],
	answer: 0
},
{
	question: "Who is Captain America's arch enemy?",
	answerList: ["Green Goblin", "Red Skull", "Baron Von Struker", "Iron Man"],
	answer: 1
},
{
	question: "When Magneto and Charles Xaviar combined, who did they become?",
	answerList: ["Onslaught", "Warpath", "Legion", "X-Man"],
	answer: 0
},
{
	question: "Who was the orginal Captain Marvel?",
	answerList: ["Carol Danvers", "Gwen Stacey", "Mar-vel", "Jessica Drew"],
	answer: 2
},
{
	question: "Who is the current Captain Marvel",
	answerList: ["Mar-vel", "Carol Danvers", "Kara Kent", "Jessica Jones"],
	answer: 1
}];


var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Great Job, that is correct!",
	incorrect: "Sorry, that's the wrong answer.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how much you know about Marvel!"
}

$('#start').on('click', function(){
	$(this).hide();
	newGame();
});

$('#playAgain').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#final').empty();
	$('#correct').empty();
	$('#incorrect').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
    unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html(`Question # ${currentQuestion+1} of ${triviaQuestions.length}`);
	$('.question').html(`<h2> ${triviaQuestions[currentQuestion].question}</h2>`);
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.html(`<button class='btn btn-secondary space-btn'>${triviaQuestions[currentQuestion].answerList[i]}</button>`);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
    countdown();
    
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html(`<h3>Time Remaining: ${seconds}</h3>`);
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html(`<h3>Time Remaining: ${seconds}</h3>`);
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(`<h3>${messages.correct}</h3>`);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(`<h3>${messages.incorrect}</h3>`);
		$('#correctedAnswer').html(`<h3>The correct answer was: <span class="f">${rightAnswerText}</span></h3>`);
	} else{
		unanswered++;
		$('#message').html(`<h4>${messages.endTime}</h4>`);
		$('#correctedAnswer').html(`<h3>The correct answer was: <span class="f">${rightAnswerText}</span></h3>`);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#final').html(`<h4>${messages.finished}</h4>`);
	$('#correct').html(`<h3>Correct Answers: ${correctAnswer}</h3>`);
	$('#incorrect').html(`<h3>Incorrect Answers: ${incorrectAnswer}</h3>`);
	$('#unanswered').html(`<h3>Unanswered: ${unanswered}</h3>`);
	$('#playAgain').addClass('reset');
	$('#playAgain').show();
	$('#playAgain').html(`<button class='btn btn-primary b-btn'>Start Over</button>`);
}
});