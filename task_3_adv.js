// --- Image Carousel ---
const images = [
    'image1.webp', // Replace with your image paths
    'image2.jpg',
    'image3.webp'
];
let current = 0;

function showImage() {
    const img = document.getElementById('carousel-img');
    if (img) img.src = images[current];
}

function prevImage() {
    current = (current - 1 + images.length) % images.length;
    showImage();
}

function nextImage() {
    current = (current + 1) % images.length;
    showImage();
}

// --- Fetch Data from API (Joke Example) ---
function getJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(res => res.json())
        .then(data => {
            const jokeP = document.getElementById('joke');
            if (jokeP) jokeP.textContent = data.setup + ' ' + data.punchline;
        })
        .catch(() => {
            const jokeP = document.getElementById('joke');
            if (jokeP) jokeP.textContent = 'Failed to fetch joke.';
        });
}

// --- Quiz Data ---
const quizData = {
    simple: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlinking Text Mark Language"], answer: 0 },
        { question: "Which tag is used for the largest heading?", options: ["<h6>", "<heading>", "<h1>", "<head>"], answer: 2 },
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheet", "Colorful Style Sheet"], answer: 0 },
        { question: "Which HTML tag is used for JavaScript?", options: ["<js>", "<javascript>", "<script>", "<code>"], answer: 2 },
        { question: "Which property changes background color in CSS?", options: ["color", "background-color", "bgcolor", "backgroundImage"], answer: 1 },
        { question: "Which symbol is used for comments in HTML?", options: ["//", "<!-- -->", "#", "/* */"], answer: 1 },
        { question: "How do you write 'Hello World' in an alert box in JS?", options: ["msg('Hello World');", "alert('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');"], answer: 1 },
        { question: "Which tag creates a line break?", options: ["<break>", "<br>", "<lb>", "<line>"], answer: 1 },
        { question: "Which CSS property sets the text color?", options: ["font-color", "text-color", "color", "background-color"], answer: 2 },
        { question: "How do you start an ordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], answer: 1 }
    ],
    medium: [
        { question: "Which attribute is used to provide an image description?", options: ["alt", "src", "title", "desc"], answer: 0 },
        { question: "How do you select an element with id 'demo' in CSS?", options: [".demo", "#demo", "demo", "*demo"], answer: 1 },
        { question: "Which event occurs when a user clicks an HTML element?", options: ["onmouseclick", "onchange", "onclick", "onmouseover"], answer: 2 },
        { question: "How do you add a comment in CSS?", options: ["// comment", "<!-- comment -->", "/* comment */", "# comment"], answer: 2 },
        { question: "Which method adds a new element at the end of an array in JS?", options: ["push()", "pop()", "add()", "append()"], answer: 0 },
        { question: "What is the correct HTML for adding a background color?", options: ["<body bg='yellow'>", "<body style='background-color:yellow;'>", "<background>yellow</background>", "<body color='yellow'>"], answer: 1 },
        { question: "How do you call a function named 'myFunction' in JS?", options: ["call myFunction()", "myFunction()", "call function myFunction", "Call.myFunction()"], answer: 1 },
        { question: "Which CSS property controls the size of text?", options: ["font-style", "text-size", "font-size", "text-style"], answer: 2 },
        { question: "How do you make a numbered list?", options: ["<ul>", "<ol>", "<dl>", "<list>"], answer: 1 },
        { question: "Which HTML element defines the title of a document?", options: ["<meta>", "<title>", "<head>", "<header>"], answer: 1 }
    ],
    hard: [
        { question: "Which HTML5 element is used for navigation links?", options: ["<navigate>", "<nav>", "<navigation>", "<links>"], answer: 1 },
        { question: "How do you select all <p> elements inside a <div> in CSS?", options: ["div p", "div.p", "div+p", "div > p"], answer: 0 },
        { question: "Which method removes the last element from an array in JS?", options: ["pop()", "remove()", "shift()", "delete()"], answer: 0 },
        { question: "How do you write a single-line comment in JS?", options: ["<!-- comment -->", "// comment", "' comment", "# comment"], answer: 1 },
        { question: "Which property is used to change the font in CSS?", options: ["font-family", "font-style", "font-weight", "font-size"], answer: 0 },
        { question: "How do you round the number 7.25 to the nearest integer in JS?", options: ["Math.rnd(7.25)", "round(7.25)", "Math.round(7.25)", "rnd(7.25)"], answer: 2 },
        { question: "Which HTML element is used to specify a footer for a document?", options: ["<bottom>", "<footer>", "<section>", "<foot>"], answer: 1 },
        { question: "How do you select elements with class 'test' in CSS?", options: [".test", "#test", "test", "*test"], answer: 0 },
        { question: "Which operator is used to assign a value to a variable in JS?", options: ["*", "=", "-", "+"], answer: 1 },
        { question: "What does 'DOM' stand for?", options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Data Oriented Model"], answer: 0 }
    ]
};

let currentQuiz = 0;
let score = 0;
let currentCategory = 'simple';
let questions = quizData[currentCategory];

// --- Section Show/Hide Logic ---
function showSection(section) {
    const sections = ['quiz-section', 'gallery-section', 'joke-section'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (section === 'all') {
                el.style.display = '';
            } else {
                el.style.display = (id === section) ? '' : 'none';
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    showSection('all'); // Show all sections on load
});

// --- DOMContentLoaded: Attach Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Carousel
    showImage();
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);

    // Joke button
    const jokeBtn = document.getElementById('joke-btn');
    if (jokeBtn) jokeBtn.addEventListener('click', getJoke);

    // Quiz category logic
    const categorySelect = document.getElementById('category');
    const startBtn = document.getElementById('start-quiz-btn');
    const quizContainer = document.getElementById('quiz-container');

    if (startBtn && categorySelect && quizContainer) {
        quizContainer.style.display = 'none';
        startBtn.onclick = () => {
            currentCategory = categorySelect.value;
            questions = quizData[currentCategory];
            currentQuiz = 0;
            score = 0;
            quizContainer.style.display = '';
            showQuizQuestion();
        };
    }

    // Next question logic
    const nextBtnQuiz = document.getElementById('next-question');
    if (nextBtnQuiz) {
        nextBtnQuiz.onclick = () => {
            currentQuiz++;
            showQuizQuestion();
        };
    }
});

// --- Quiz Logic ---
function showQuizQuestion() {
    const q = questions[currentQuiz];
    document.getElementById('quiz-question').textContent = `Q${currentQuiz + 1}: ${q.question}`;
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => checkQuizAnswer(idx);
        btn.className = 'quiz-option';
        optionsDiv.appendChild(btn);
    });
    document.getElementById('quiz-result').textContent = '';
    document.getElementById('next-question').style.display = 'none';
}

function checkQuizAnswer(selected) {
    const q = questions[currentQuiz];
    const result = document.getElementById('quiz-result');
    if (selected === q.answer) {
        result.textContent = "Correct!";
        score++;
    } else {
        result.textContent = "Wrong!";
    }
    Array.from(document.getElementsByClassName('quiz-option')).forEach(btn => btn.disabled = true);
    document.getElementById('next-question').style.display = (currentQuiz < questions.length - 1) ? 'inline-block' : 'none';
    if (currentQuiz === questions.length - 1) {
        result.textContent += ` Quiz finished! Your score: ${score}/${questions.length}`;
    }
}