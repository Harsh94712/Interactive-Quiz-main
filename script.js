// Load questions and set up form event listeners when the page loads
window.onload = function () {
    loadQuizQuestions();
    setupFormValidation();
};

// Function to load quiz questions dynamically
function loadQuizQuestions() {
    const quizQuestionsDiv = document.getElementById('quiz-questions');
    quizQuestionsDiv.innerHTML = '';

    const storedQuestions = JSON.parse(localStorage.getItem('quizQuestions'));
    if (!storedQuestions || storedQuestions.length === 0) {
        alert('No questions available. Please add questions first.');
        return;
    }

    storedQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('quiz-question');
        questionDiv.innerHTML = `
            <p><strong>${q.question}</strong></p>
            <input type="radio" name="question${index}" value="${q.options[0]}"> ${q.options[0]}<br>
            <input type="radio" name="question${index}" value="${q.options[1]}"> ${q.options[1]}<br>
            <input type="radio" name="question${index}" value="${q.options[2]}"> ${q.options[2]}<br>
            <input type="radio" name="question${index}" value="${q.options[3]}"> ${q.options[3]}<br>
        `;
        quizQuestionsDiv.appendChild(questionDiv);
    });
}

// Function to start the quiz after verifying all information is provided
function startQuiz() {
    const userInfoFields = ['user-name', 'user-roll-no', 'user-gmail', 'user-college'];
    const allFilled = userInfoFields.every(id => document.getElementById(id).value.trim() !== '');

    if (allFilled) {
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('quiz-questions').style.display = 'block';
        document.getElementById('submit-button').style.display = 'inline-block';
    } else {
        alert('Please fill out all information fields.');
    }
}

// Enable "Start Quiz" button if all fields are filled
function setupFormValidation() {
    const fields = document.querySelectorAll('#user-info input');
    const startQuizButton = document.getElementById('start-quiz-button');

    fields.forEach(field => {
        field.addEventListener('input', () => {
            const allFilled = Array.from(fields).every(input => input.value.trim() !== '');
            startQuizButton.disabled = !allFilled;
        });
    });
}

// Function to submit the quiz and calculate results
function submitQuiz() {
    const storedQuestions = JSON.parse(localStorage.getItem('quizQuestions'));
    let score = 0;

    storedQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.correctAnswer) {
            score++;
        }
    });

    const totalQuestions = storedQuestions.length;
    const percentage = (score / totalQuestions) * 100;

    const userName = document.getElementById('user-name').value;
    const userRollNo = document.getElementById('user-roll-no').value;
    const userGmail = document.getElementById('user-gmail').value;
    const userCollege = document.getElementById('user-college').value;

    localStorage.setItem('userName', userName);
    localStorage.setItem('userRollNo', userRollNo);
    localStorage.setItem('userGmail', userGmail);
    localStorage.setItem('userCollege', userCollege);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <strong>${userName}</strong> (${userRollNo}) - ${userGmail} <br>
        College: ${userCollege} <br>
        You answered ${score} out of ${totalQuestions} questions correctly. <br>
        <span class="percentage">${percentage.toFixed(2)}%</span>
    `;
}

// Admin button click with hidden password prompt
document.getElementById('admin-button').addEventListener('click', function(event) {
    event.preventDefault();
    const password = prompt("Please enter the admin password:");
    if (password === "admin123") {
        window.location.href = "quiz.html";
    } else {
        alert("Incorrect password.");
    }
});
