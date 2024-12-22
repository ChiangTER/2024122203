// 預設題目
const questions = [
    {
        id: 1,
        question: "選出象形字",
        options: ["但", "清", "山", "空"],
        correctAnswer: 3
    },
    {
        id: 2,
        question: "選出指事字",
        options: ["刀", "旦", "日", "心"],
        correctAnswer: 2
    },
    {
        id: 3,
        question: "選出形聲字",
        options: ["天", "雨", "一", "江"],
        correctAnswer: 4
    },
    {
        id: 4,
        question: "選出會意字",
        options: ["溪", "雞", "祭", "河"],
        correctAnswer: 3
    },
    {
        id: 5,
        question: "選出象形字",
        options: ["月", "上", "筷", "休"],
        correctAnswer: 1
    },
    {
        id: 6,
        question: "選出指事字",
        options: ["水", "刃", "武", "止"],
        correctAnswer: 2
    },
    {
        id: 7,
        question: "選出會意字",
        options: ["騎", "末", "下", "炎"],
        correctAnswer: 4
    },
    {
        id: 8,
        question: "選出形聲字",
        options: ["晶", "人", "圍", "苗"],
        correctAnswer: 3
    },
    {
        id: 9,
        question: "選出象形字",
        options: ["路", "安", "琴", "保"],
        correctAnswer: 3
    },
    {
        id: 10,
        question: "選出會意字",
        options: ["目", "沐", "木", "牧"],
        correctAnswer: 4
    },
];

let userAnswers = [];

// 當網頁載入完成時顯示題目
window.onload = function() {
    displayQuestions();
};

function displayQuestions() {
    const container = document.getElementById('question-container');
    container.innerHTML = '';
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p><strong>題目 ${q.id}:</strong> ${q.question}</p>
            <div class="options">
                ${q.options.map((option, i) => `
                    <label class="option">
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        container.appendChild(questionDiv);
    });
}

function submitQuiz() {
    userAnswers = [];
    let score = 0;
    let resultHTML = '<h2>測驗結果</h2>';

    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            const userAnswer = parseInt(selected.value);
            userAnswers.push(userAnswer);
            if (userAnswer === q.correctAnswer - 1) {
                score++;
            }
        }
    });

    if (userAnswers.length < questions.length) {
        alert('請回答所有題目！');
        return;
    }

    // 計算總分
    resultHTML += `<p class="total-score">總得分：${score} / ${questions.length} (${(score/questions.length*100).toFixed(2)}%)</p>`;
    
    // 顯示每題的詳細結果
    resultHTML += '<div class="question-results">';
    questions.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === q.correctAnswer - 1;
        
        resultHTML += `
            <div class="question-result ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>題目 ${q.id}:</strong> ${q.question}</p>
                <p>您的答案：${q.options[userAnswer]}</p>
                <p class="result-status">${isCorrect ? '✓ 答對' : '✗ 答錯'}</p>
            </div>
        `;
    });
    resultHTML += '</div>';

    document.getElementById('result-container').innerHTML = resultHTML;
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
}

function resetQuiz() {
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
    userAnswers = [];
    
    // 清除所有選項
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => radio.checked = false);
} 