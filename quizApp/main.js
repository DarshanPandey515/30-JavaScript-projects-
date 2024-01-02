const apiUrl = 'https://quiz-rmlg.onrender.com/questions';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function getQuestionData() {
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();

    const shuffledData = shuffleArray(data);
    const randomTenQuestions = shuffledData.slice(0, 10);

    const questionList = randomTenQuestions.map(question => {
        const answers = [];

        for (const key in question) {
            if (key !== 'question' && key !== 'answer') {
                answers.push({
                    answerOption: question[key],
                    correct: key === question.answer
                });
            }
        }

        return {
            question: question.question,
            answers: answers
        };
    });

    return questionList;
}

async function initializeQuiz() {
    try {
        const questions = await getQuestionData();
        const questionElement = document.getElementById('question');
        const answerBtn = document.getElementById('answerBtn');
        const nextButton = document.getElementById('next-button');

        let currentQuestionIndex = 0;
        let currentScore = 0;

        function startQuiz() {
            currentQuestionIndex = 0;
            currentScore = 0;
            nextButton.innerHTML = "Next";
            showQuestion();
        }

        function showQuestion() {
            resetState();
            let currentQuestion = questions[currentQuestionIndex];
            let questionNo = currentQuestionIndex + 1;
            questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}.`;

            currentQuestion.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerHTML = answer.answerOption;
                button.classList.add('answer-btn');
                answerBtn.appendChild(button);

                if (answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener('click', selectAnswer);
            });
        }

        function resetState() {
            nextButton.style.display = 'none';
            while (answerBtn.firstChild) {
                answerBtn.removeChild(answerBtn.firstChild);
            }
        }

        function selectAnswer(e) {
            const selectBtn = e.target;
            const isCorrect = selectBtn.dataset.correct === 'true';
            if (isCorrect) {
                selectBtn.classList.add('correct');
                currentScore++;
            } else {
                selectBtn.classList.add('incorrect');
            }

            Array.from(answerBtn.children).forEach(button => {
                if (button.dataset.correct === 'true') {
                    button.classList.add('correct');
                }
                button.disabled = true;
            });
            nextButton.style.display = 'block';
        }

        function showScore() {
            resetState();
            questionElement.innerHTML = `You scored ${currentScore} out of ${questions.length}!`;
            nextButton.innerHTML = 'Play Again';
            nextButton.style.display = 'block';
        }

        function handleNextButton() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showScore();
            }
        }

        nextButton.addEventListener('click', () => {
            if (currentQuestionIndex < questions.length) {
                handleNextButton();
            } else {
                startQuiz();
            }
        });

        startQuiz();
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

initializeQuiz();
