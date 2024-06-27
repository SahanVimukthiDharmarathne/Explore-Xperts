const questions = [
			{
				question: "What is the tallest mountain in SriLanka?",
				answers: [
					{text: "Riverston", correct: false},
					{text: "Everest Mountain", correct: false},
					{text: "Piduruthalagala Mountain", correct: true},
					{text: "Knuckles Mountain", correct: false},
				]
			},
			{
				question: "Who is the father of tourism?",
				answers: [
					{text: "Galileo Galilei", correct: false},
					{text: "Thomas Cook", correct: true},
					{text: "Thomas Edison", correct: false},
					{text: "Thomas Paine", correct: false},
				]
			},
			{
				question: "What is the tallest mountain in World?",
				answers: [
					{text: "Mount Elbrus", correct: false},
					{text: "Mount fuji", correct: false},
					{text: "Everest", correct: true},
					{text: "Nuckeles", correct: false},
				]
			},
			{
				question: "What is the longest river in World?",
				answers: [
					{text: "Congo River", correct: false},
					{text: "Yellow River", correct: false},
					{text: "Amazon", correct: false},
					{text: "Nile", correct: true},
				]
			},
			{
				question: "What is the biggest island in World?",
				answers: [
					{text: "Sri Lanka", correct: false},
					{text: "Greenland", correct: true},
					{text: "Maldives", correct: false},
					{text: "Seychelles", correct: false},
				]
			},
			{
				question: "What is the longest river in SriLanka?",
				answers: [
					{text: "Mahawali River", correct: true},
					{text: "Walawe River", correct: false},
					{text: "Kelani Riveri", correct: false},
					{text: "Nilwala River", correct: false},
				]
			},
			{
				question: "What is the tallest waterfall in SriLanka?",
				answers: [
					{text: "Diyaluma Falls", correct: false},
					{text: "Bambarakanda Falls", correct: true},
					{text: "Ravana Falls", correct: false},
					{text: "Dunhinda Falls", correct: false},
				]
			},
			{
				question: "How many waterfalls are there in SriLanka ?",
				answers: [
					{text: "500", correct: false},
					{text: "222", correct: false},
					{text: "456", correct: false},
					{text: "382", correct: true},
				]
			},
			{
				question: "What is the biggest forest in World?",
				answers: [
					{text: "Amazon Forest", correct: true},
					{text: "Daintree Forest", correct: false},
					{text: "Sinharaja Forest", correct: false},
					{text: "Sundarbans", correct: false},
				]
			},
			{
				question: "When did tourism starts?",
				answers: [
					{text: "19th century", correct: false},
					{text: "17th century", correct: true},
					{text: "21th century", correct: false},
					{text: "20th century", correct: false},
				]
			},
			];
			
			const questionElement = document.getElementById("question");
			const answerButtons = document.getElementById("answer-buttons");
			const nextButton = document.getElementById("next-button");
			
			
			let currentQusetionIndex = 0;
			let score = 0;
			
			
			function startQuiz(){
				currentQusetionIndex = 0;
				score = 0;
				nextButton.innerHTML = "Next";
				showQuestion();
			}
			
			function showQuestion(){
				resetState();
				let currentQuestion = questions[currentQusetionIndex];
				let QusetionNumber = currentQusetionIndex + 1;
				let totalQuestions = questions.length;
				questionElement.innerHTML = QusetionNumber + ". " + currentQuestion.
				question;
				
				const questionCounterElement = document.getElementById("question-counter");
				questionCounterElement.innerHTML = `${QusetionNumber}/${totalQuestions}`;
				
				
				currentQuestion.answers.forEach(answer => {
				const button = document.createElement("button");
				button.innerHTML = answer.text;
				button.classList.add("btn");
				answerButtons.appendChild(button);
				if (answer.correct) {
					button.dataset.correct = answer.correct;
				}
				button.addEventListener("click", selectAnswer);
				});
			}
			
			function resetState(){
				nextButton.style.display = "none";
				while(answerButtons.firstChild){
					answerButtons.removeChild(answerButtons.firstChild);
				}
			}
			
			function selectAnswer(e){
				const selectedBtn = e.target;
				const isCorrect = selectedBtn.dataset.correct === "true";
				if(isCorrect){
					selectedBtn.classList.add("correct");
					score++;
				}
				else {
					selectedBtn.classList.add("incorrect");
				}
				
				Array.from(answerButtons.children).forEach(button =>{
					if (button.dataset.correct === "true"){
						button.classList.add("correct");
					}
					button.disabled = true;
				});
				nextButton.style.display = "block";
			}
			
			function performanceDetails(){
				resetState();
				questionElement.innerHTML = `Score ${score}`;
				nextButton.innerHTML = "Start Again";
				nextButton.style.display = "block";
			}
			
			function handleNextButton(){
				currentQusetionIndex++;
				if (currentQusetionIndex < questions.length){
					showQuestion();
				}
				else {
					performanceDetails();
				}
			}
			
			nextButton.addEventListener("click", ()=>{
				if (currentQusetionIndex < questions.length){
					handleNextButton();
				}
				else {
					startQuiz();
				}
			});
			
			let timerElement = document.getElementById("timer");
			let countdown;
			let timeLeft = 60;
			
			function startTimer(){
				countdown = setInterval(updateTimer, 1000);
			}
			
			function updateTimer(){
				if (timeLeft > 0){
					timeLeft--;
					timerElement.textContent = formatTime(timeLeft);
				}
				else{
					clearInterval(countdown);
					timerElement.textContent = "Times up!";
					performanceDetails();
				}
			}
			
			function formatTime(seconds){
				let minutes = Math.floor(seconds/60);
				let remainingSeconds = seconds % 60;
				return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
			}
			
			startTimer();
			
			startQuiz();