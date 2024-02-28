let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars"
    },
    // Add more questions as needed
];

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    const currentQuestionData = questions[currentQuestion];
    questionText.textContent = currentQuestionData.question;

    optionsList.innerHTML = "";
    currentQuestionData.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.addEventListener('click', () => checkAnswer(option));
        optionsList.appendChild(li);
    });

    quizContainer.style.display = 'block';
    feedbackContainer.style.display = 'none';
    nextBtn.style.display = 'none';
}


function endQuiz() {
    quizContainer.innerHTML = `<h2>Your Score: ${score} out of ${questions.length}</h2>`;
}

// ... (existing code)

// Function to show feedback as a popup
function showFeedbackPopup() {
    const overlay = document.getElementById('popup-overlay');
    const feedbackPopup = document.getElementById('feedback-container');

    // Display overlay and popup
    overlay.style.display = 'block';
    feedbackPopup.style.display = 'block';
}

// Function to hide feedback popup
function hideFeedbackPopup() {
    const overlay = document.getElementById('popup-overlay');
    const feedbackPopup = document.getElementById('feedback-container');

    // Hide overlay and popup
    overlay.style.display = 'none';
    feedbackPopup.style.display = 'none';
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
    const currentQuestionData = questions[currentQuestion];

    // Check if the selected option is correct
    if (selectedOption === currentQuestionData.answer) {
        score++;
        feedbackText.textContent = "Correct!";
    } else {
        feedbackText.textContent = "Incorrect. The correct answer is: " + currentQuestionData.answer;
    }

    // Show feedback as a popup
    showFeedbackPopup();
}

// Function to move to the next question
function nextQuestion() {
    // Hide feedback popup
    hideFeedbackPopup();

    // Move to the next question index
    currentQuestion++;

    // Check if there are more questions
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        // If no more questions, end the quiz
        endQuiz();
    }
}

// Start the quiz when the page loads
startQuiz();