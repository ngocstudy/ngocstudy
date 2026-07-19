// ===============================
// LESSON 03 VOCABULARY SYSTEM
// VERSION FIX 1
// ===============================

let vocabulary = [];
let currentIndex = 0;

// ===============================
// MATCHING GAME VARIABLES
// ===============================

let matchingPairs = [];

let selectedEnglish = null;

let selectedMeaning = null;

let correctMatches = 0;

let reviewTimer = null;
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

// Matching

const matchingScreen =
document.getElementById("matchingScreen");

const matchingContainer =
document.getElementById("matchingContainer");

const matchingMessage =
document.getElementById("matchingMessage");

const correctCount =
document.getElementById("correctCount");


// Review

const reviewScreen =
document.getElementById("reviewScreen");

const reviewWord =
document.getElementById("reviewWord");

const reviewIPA =
document.getElementById("reviewIPA");

const reviewMeaning =
document.getElementById("reviewMeaning");

const reviewSynonyms =
document.getElementById("reviewSynonyms");

const reviewFamily =
document.getElementById("reviewFamily");

const reviewSpeaker =
document.getElementById("reviewSpeaker");

const continueMatchingBtn =
document.getElementById("continueMatchingBtn");

const countdownText =
document.getElementById("countdownText");
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
// ===============================
// MATCHING GAME 2.0
// ===============================

const matchingBtn =
document.getElementById("matchingBtn");

let englishCards = [];
let meaningCards = [];
let matchedPairs = [];

matchingBtn.addEventListener("click", startMatching);


// ===============================
// START MATCHING
// ===============================

function startMatching(){

    finishScreen.classList.add("hidden");

    matchingScreen.classList.remove("hidden");

    card.style.display="none";

    navigation.style.display="none";

    correctMatches = 0;

    correctCount.textContent = "0";

    selectedEnglish = null;

    selectedMeaning = null;

    matchedPairs = [];

    buildMatching();

}



// ===============================
// BUILD MATCHING
// ===============================

function buildMatching(){

    matchingContainer.innerHTML="";

    let englishColumn =
    document.createElement("div");

    englishColumn.className =
    "match-column";


    let meaningColumn =
    document.createElement("div");

    meaningColumn.className =
    "match-column";


    englishCards =
    vocabulary.map((item,index)=>({

        index:index,

        word:item.word,

        ipa:item.ipa,

        meaning:item.meaning

    }));


    meaningCards =
    vocabulary.map((item,index)=>({

        index:index,

        meaning:item.meaning

    }));


    shuffleArray(
    meaningCards
    );



    // ENGLISH COLUMN

    englishCards.forEach(item=>{

        let div =
        document.createElement("div");

        div.className =
        "match-card";

        div.dataset.index =
        item.index;


        div.innerHTML = `

        <button
        class="speaker-circle">

        🔊

        </button>

        <span>

        ${item.word}

        </span>

        `;


        div.querySelector("button")
        .addEventListener("click",(e)=>{

            e.stopPropagation();

            speak(item.word);

        });


        div.addEventListener("click",()=>{

            selectEnglish(div,item);

        });


        englishColumn.appendChild(div);

    });




    // MEANING COLUMN

    meaningCards.forEach(item=>{

        let div =
        document.createElement("div");

        div.className =
        "match-card";

        div.dataset.index =
        item.index;

        div.textContent =
        item.meaning;


        div.addEventListener("click",()=>{

            selectMeaning(div,item);

        });


        meaningColumn.appendChild(div);

    });



    matchingContainer.appendChild(
    englishColumn
    );

    matchingContainer.appendChild(
    meaningColumn
    );

}



// ===============================
// SHUFFLE
// ===============================

function shuffleArray(array){

    for(
        let i=array.length-1;
        i>0;
        i--
    ){

        let j =
        Math.floor(
        Math.random()*(i+1)
        );

        [array[i],array[j]] =
        [array[j],array[i]];

    }

}
// ===============================
// SELECT ENGLISH
// ===============================

function selectEnglish(card,item){

    if(card.classList.contains("correct")) return;

    document
    .querySelectorAll(".match-column:first-child .match-card")
    .forEach(c=>c.classList.remove("selected"));

    card.classList.add("selected");

    selectedEnglish={
        card:card,
        item:item
    };

    checkMatch();

}



// ===============================
// SELECT MEANING
// ===============================

function selectMeaning(card,item){

    if(card.classList.contains("correct")) return;

    document
    .querySelectorAll(".match-column:last-child .match-card")
    .forEach(c=>c.classList.remove("selected"));

    card.classList.add("selected");

    selectedMeaning={
        card:card,
        item:item
    };

    checkMatch();

}



// ===============================
// CHECK MATCH
// ===============================

function checkMatch(){

    if(
        !selectedEnglish ||
        !selectedMeaning
    ){
        return;
    }


    // CORRECT

    if(
        selectedEnglish.item.index ===
        selectedMeaning.item.index
    ){

        selectedEnglish.card
        .classList.add("correct");

        selectedMeaning.card
        .classList.add("correct");


        correctMatches++;

        correctCount.textContent=
        correctMatches;


        setTimeout(()=>{

            selectedEnglish.card.remove();

            selectedMeaning.card.remove();

        },500);


        if(correctMatches===10){

            setTimeout(()=>{

                finishMatching();

            },700);

        }


    }


    // WRONG

    else{

        selectedEnglish.card
        .classList.add("wrong");

        selectedMeaning.card
        .classList.add("wrong");


        setTimeout(()=>{

            selectedEnglish.card
            .classList.remove("wrong");

            selectedMeaning.card
            .classList.remove("wrong");

        },500);


        showReview(
            vocabulary[
                selectedEnglish.item.index
            ]
        );

    }


    document
    .querySelectorAll(".match-card")
    .forEach(card=>{

        card.classList.remove("selected");

    });


    selectedEnglish=null;

    selectedMeaning=null;

    }
// ===============================
// REVIEW SCREEN
// ===============================

function showReview(item){

    matchingScreen.classList.add("hidden");

    reviewScreen.classList.remove("hidden");

    reviewWord.textContent =
    item.word;

    reviewIPA.textContent =
    item.ipa;

    reviewMeaning.textContent =
    item.meaning;



    reviewSynonyms.innerHTML =
    "<h3>Synonyms</h3>";

    item.synonyms.forEach(s=>{

        reviewSynonyms.innerHTML += `

        <div class="item">

            🔊 ${s.word}

            <br>

            ${s.ipa}

            <br>

            ${s.meaning}

        </div>

        `;

    });



    reviewFamily.innerHTML =
    "<h3>Word Family</h3>";

    item.family.forEach(f=>{

        reviewFamily.innerHTML += `

        <div class="item">

            🔊 ${f.word}

            (${f.pos})

            <br>

            ${f.ipa}

            <br>

            ${f.meaning}

        </div>

        `;

    });



    reviewSpeaker.onclick = ()=>{

        speak(item.word);

    };



    let second = 4;

    countdownText.textContent =
    `Returning to Matching in ${second}...`;


    clearInterval(reviewTimer);

    reviewTimer =
    setInterval(()=>{

        second--;

        countdownText.textContent =
        `Returning to Matching in ${second}...`;

        if(second<=0){

            clearInterval(reviewTimer);

            backToMatching();

        }

    },1000);

}



// ===============================
// CONTINUE BUTTON
// ===============================

continueMatchingBtn.addEventListener("click",()=>{

    clearInterval(reviewTimer);

    backToMatching();

});



// ===============================
// BACK TO MATCHING
// ===============================

function backToMatching(){

    reviewScreen.classList.add("hidden");

    matchingScreen.classList.remove("hidden");

        }
// ===============================
// FINISH MATCHING
// ===============================

function finishMatching(){

    matchingScreen.classList.add("hidden");

    reviewScreen.classList.add("hidden");

    const readingLocked =
    document.getElementById("readingLocked");

    const readingUnlocked =
    document.getElementById("readingUnlocked");

    if(readingLocked){
        readingLocked.classList.add("hidden");
    }

    if(readingUnlocked){
        readingUnlocked.classList.remove("hidden");
    }

}



// ===============================
// START READING
// ===============================

const readingBtn =
document.getElementById("readingBtn");

if(readingBtn){

    readingBtn.addEventListener("click",()=>{

        alert(
        "Reading 1 will be available in the next version."
        );

    });

}



// ===============================
// RESET MATCHING
// ===============================

function resetMatching(){

    selectedEnglish = null;

    selectedMeaning = null;

    correctMatches = 0;

    correctCount.textContent = "0";

    clearInterval(reviewTimer);

}



// ===============================
// DEBUG
// ===============================

console.log(
    "Matching Game 2.0 Loaded"
);
