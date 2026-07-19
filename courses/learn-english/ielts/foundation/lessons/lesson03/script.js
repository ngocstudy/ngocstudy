// ===============================
// LESSON 03 - VOCABULARY ENGINE
// ===============================

let vocabulary = [];
let currentIndex = 0;

// Main Elements
const word = document.getElementById("word");
const ipa = document.getElementById("ipa");
const meaning = document.getElementById("meaning");

const synonyms = document.getElementById("synonyms");
const family = document.getElementById("family");

// Progress
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");

// Buttons
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const speakBtn = document.getElementById("speakWord");

// Screens
const card = document.querySelector(".card");
const navigation = document.querySelector(".navigation");
const finishScreen = document.getElementById("finishScreen");

// ===============================
// LOAD JSON
// ===============================

fetch("lesson03.json")
    .then(response => response.json())
    .then(data => {

        vocabulary = data;

        showWord();

    })
    .catch(error => {

        console.error(error);

        word.textContent = "Cannot load lesson03.json";

    });

// ===============================
// SHOW WORD
// ===============================

function showWord() {

    const item = vocabulary[currentIndex];

    word.textContent = item.word;

    ipa.textContent = item.ipa;

    meaning.textContent = item.meaning;

    loadSynonyms(item.synonyms);

    loadFamily(item.family);

    updateProgress();

}
// ===============================
// UPDATE PROGRESS
// ===============================

function updateProgress(){

    let total = vocabulary.length;

    let current = currentIndex + 1;

    let percent = Math.round((current / total) * 100);


    progressText.textContent =
        `${current} / ${total}`;


    progressPercent.textContent =
        `${percent}%`;


    progressFill.style.width =
        `${percent}%`;

}


// ===============================
// LOAD SYNONYMS
// ===============================

function loadSynonyms(list){

    synonyms.innerHTML = "";


    list.forEach(item => {

        let box = document.createElement("div");

        box.className = "item";


        box.innerHTML = `

            <button onclick="speak('${item.word}')">

                🔊

            </button>


            <div class="item-content">

                <div class="item-word">

                    ${item.word}

                </div>


                <div class="item-ipa">

                    ${item.ipa}

                </div>


                <div class="item-meaning">

                    ${item.meaning}

                </div>

            </div>

        `;


        synonyms.appendChild(box);

    });

}



// ===============================
// LOAD WORD FAMILY
// ===============================

function loadFamily(list){

    family.innerHTML = "";


    list.forEach(item => {

        let box = document.createElement("div");

        box.className = "item";


        box.innerHTML = `

            <button onclick="speak('${item.word}')">

                🔊

            </button>


            <div class="item-content">

                <div class="item-word">

                    ${item.word}
                    (${item.pos})

                </div>


                <div class="item-ipa">

                    ${item.ipa}

                </div>


                <div class="item-meaning">

                    ${item.meaning}

                </div>


            </div>

        `;


        family.appendChild(box);

    });

}
// ===============================
// NAVIGATION
// ===============================

nextBtn.addEventListener("click",()=>{


    if(currentIndex < vocabulary.length - 1){


        currentIndex++;


        showWord();


    }else{


        finishVocabulary();


    }


});



prevBtn.addEventListener("click",()=>{


    if(currentIndex > 0){


        currentIndex--;


        showWord();


    }


});



// ===============================
// FINISH VOCABULARY
// ===============================

function finishVocabulary(){


    card.style.display = "none";


    navigation.style.display = "none";


    finishScreen.classList.remove("hidden");


}



// ===============================
// TEXT TO SPEECH
// ===============================

function speak(text){


    let speech =
        new SpeechSynthesisUtterance(text);


    speech.lang = "en-US";


    speech.rate = 0.85;


    speechSynthesis.speak(speech);


}



// Main word pronunciation

speakBtn.addEventListener("click",()=>{


    speak(vocabulary[currentIndex].word);


});



// ===============================
// START MATCHING BUTTON
// ===============================

const matchingBtn =
document.getElementById("matchingBtn");


if(matchingBtn){


    matchingBtn.addEventListener("click",()=>{


        alert("Matching Game will start next");


    });


}
