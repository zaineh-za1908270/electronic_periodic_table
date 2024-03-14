// Fetch questions from JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;
        let currentQuestionIndex = 0;
        let score = 0;

        const questionContainer = document.getElementById('question-container');
        const feedbackContainer = document.getElementById('feedback-container');
        const scoreContainer = document.getElementById('score-container');
        const submitButton = document.getElementById('submit-btn');
        const nextButton = document.getElementById('next-btn');
        const quizContainer = document.querySelector('.quiz-container');

        // Create "Go to homepage" link
        const goHomeLink = document.createElement('a');
        goHomeLink.href = "/new_pt/home/home.html";
        goHomeLink.classList.add('go-home');
        goHomeLink.innerHTML = `
            <div class="arrow"></div>
            <span>عودة للصفحة الرئيسة</span>
        `;

        function loadQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            questionContainer.innerHTML = `
                <h2>${currentQuestion.question}</h2>
                <ul>
                    ${currentQuestion.options.map(option => `
                        <li>
                            <input type="radio" name="option" value="${option}">
                            <label>${option}</label>
                        </li>`).join('')}
                </ul>
            `;
            feedbackContainer.textContent = '';
            submitButton.style.display = 'block';
            nextButton.style.display = 'none';
            goHomeLink.style.display = 'none';
        }

        function checkAnswer() {
            const selectedOption = document.querySelector('input[name="option"]:checked');
            if (!selectedOption) {
                alert('قم باختيار إجابة');
                return;
            }
            const currentQuestion = questions[currentQuestionIndex];
            if (selectedOption.value === currentQuestion.answer) {
                feedbackContainer.textContent = "!أحسنت... إجابة صحيحة";
                score++;
            } else {
                feedbackContainer.textContent = `إجابة خاطئة... الإجابة الصحيحة هي: ${currentQuestion.answer}`;
            }
            const radioOptions = document.querySelectorAll('input[name="option"]');
            radioOptions.forEach(option => {
                option.disabled = true;
            });
            submitButton.style.display = 'none';
            nextButton.style.display = 'block';
            goHomeLink.style.display = 'none';
        }

        function showScore() {
            questionContainer.innerHTML = '';
            feedbackContainer.innerHTML = '';
            scoreContainer.textContent = `لقد حصلت على : ${score} من ${questions.length}`;
            nextButton.style.display = 'none';
            goHomeLink.style.display = 'block';
        }

        loadQuestion();

        submitButton.addEventListener('click', checkAnswer);

        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showScore();
            }
        });

        quizContainer.appendChild(goHomeLink); // Append the link to the quiz container
    })
    .catch(error => console.error('Error fetching questions:', error));
