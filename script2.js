function addQuestion() {
    // Get question data
    const question = document.getElementById('question').value;
    const optionA = document.getElementById('option-a').value;
    const optionB = document.getElementById('option-b').value;
    const optionC = document.getElementById('option-c').value;
    const optionD = document.getElementById('option-d').value;
    const correctAnswer = document.getElementById('correct-answer').value;

    if (!question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
        alert('Please fill in all fields.');
        return;
    }

    // Create question object
    const newQuestion = {
        question,
        options: [optionA, optionB, optionC, optionD],
        correctAnswer,
    };

    // Get existing questions from localStorage
    let quizQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
    quizQuestions.push(newQuestion);

    // Save updated questions to localStorage
    localStorage.setItem('quizQuestions', JSON.stringify(quizQuestions));

    // Show the list of questions added
    displayQuestions();

    // Clear form
    document.getElementById('question').value = '';
    document.getElementById('option-a').value = '';
    document.getElementById('option-b').value = '';
    document.getElementById('option-c').value = '';
    document.getElementById('option-d').value = '';
    document.getElementById('correct-answer').value = '';
}

// Display questions added in the admin section
function displayQuestions() {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = ''; // Clear the list

    const storedQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
    storedQuestions.forEach((q, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${q.question}</strong><br>
            A) ${q.options[0]}<br>
            B) ${q.options[1]}<br>
            C) ${q.options[2]}<br>
            D) ${q.options[3]}<br>
            <em>Correct Answer: ${q.correctAnswer}</em>
            <button onclick="deleteQuestion(${index})">Delete</button>
        `;
        questionList.appendChild(listItem);
    });
}

// Function to delete a question
function deleteQuestion(index) {
    // Get existing questions from localStorage
    let quizQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];

    // Remove the question at the specified index
    quizQuestions.splice(index, 1);

    // Save the updated questions to localStorage
    localStorage.setItem('quizQuestions', JSON.stringify(quizQuestions));

    // Re-render the question list
    displayQuestions();
}

// Function to go to the quiz page
function goToQuiz() {
    window.location.href = 'quiz.html';
}
