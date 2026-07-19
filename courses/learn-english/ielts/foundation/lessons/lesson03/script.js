// ===============================
// LESSON 03 VOCABULARY SYSTEM
// VERSION FIX 1
// ===============================

let vocabulary = [];
let currentIndex = 0;


// ===============================
// GET ELEMENTS
// ===============================

const word =
document.getElementById("word");

const ipa =
document.getElementById("ipa");

const meaning =
document.getElementById("meaning");


const synonyms =
document.getElementById("synonyms");

const family =
document.getElementById("family");


const progressText =
document.getElementById("progressText");

const progressPercent =
document.getElementById("progressPercent");

const progressFill =
document.getElementById("progressFill");


const prevBtn =
document.getElementById("prevBtn");

const nextBtn =
document.getElementById("nextBtn");

const speakBtn =
document.getElementById("speakWord");


// Screens

const card =
document.querySelector(".card");

const navigation =
document.querySelector(".navigation");

const finishScreen =
document.getElementById("finishScreen");


// ===============================
// LOAD LESSON JSON
// ===============================


fetch("./lesson03.json")

.then(response => {


    if(!response.ok){

        throw new Error(
        "Cannot load lesson03.json");

    }


    return response.json();


})


.then(data => {


    vocabulary = data;


    console.log(
    "Vocabulary loaded:",
    vocabulary.length);


    if(vocabulary.length !== 10){

        console.warn(
        "Lesson should contain 10 words");

    }


    showWord();


})


.catch(error=>{

    console.error(error);

    word.textContent =
    error.message;

    alert(error.message);

});
// ===============================
// DISPLAY CURRENT WORD
// ===============================

function showWord(){


    if(!vocabulary[currentIndex]){

        return;

    }


    let item =
    vocabulary[currentIndex];


    word.textContent =
    item.word;


    ipa.textContent =
    item.ipa;


    meaning.textContent =
    item.meaning;


    loadSynonyms(
    item.synonyms || []
    );


    loadFamily(
    item.family || []
    );


    updateProgress();


}



// ===============================
// UPDATE PROGRESS
// ===============================

function updateProgress(){


    let total =
    vocabulary.length;


    let number =
    currentIndex + 1;


    let percent =
    Math.round(
    (number / total) * 100
    );


    progressText.textContent =
    `${number} / ${total}`;


    progressPercent.textContent =
    `${percent}%`;


    progressFill.style.width =
    percent + "%";


}



// ===============================
// SYNONYMS DISPLAY
// ===============================

function loadSynonyms(list){


    synonyms.innerHTML="";


    list.forEach(item=>{


        let div =
        document.createElement("div");


        div.className="item";


        div.innerHTML=`

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


        synonyms.appendChild(div);


    });


}



// ===============================
// WORD FAMILY DISPLAY
// ===============================

function loadFamily(list){


    family.innerHTML="";


    list.forEach(item=>{


        let div =
        document.createElement("div");


        div.className="item";


        div.innerHTML=`

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


        family.appendChild(div);


    });


}
// ===============================
// NEXT BUTTON
// ===============================

nextBtn.addEventListener("click",()=>{


    if(currentIndex < vocabulary.length - 1){


        currentIndex++;


        showWord();


    }
    else{


        finishVocabulary();


    }


});



// ===============================
// PREVIOUS BUTTON
// ===============================

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


    card.style.display="none";


    navigation.style.display="none";


    finishScreen.classList.remove("hidden");


}



// ===============================
// PRONUNCIATION
// ===============================

function speak(text){


    if(!("speechSynthesis" in window)){


        alert(
        "Your browser does not support audio"
        );


        return;

    }


    speechSynthesis.cancel();


    let utterance =
    new SpeechSynthesisUtterance(text);


    utterance.lang="en-US";


    utterance.rate=0.85;


    speechSynthesis.speak(utterance);


}



// Main word audio button

speakBtn.addEventListener("click",()=>{


    if(vocabulary[currentIndex]){


        speak(
        vocabulary[currentIndex].word
        );


    }


});



// ===============================
// CHECK LOADED DATA
// ===============================

window.addEventListener("load",()=>{


    console.log(
    "Lesson03 vocabulary system ready"
    );


});
