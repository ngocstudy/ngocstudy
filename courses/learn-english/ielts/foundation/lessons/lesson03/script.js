
let vocabulary = [];
let current = 0;

const word = document.getElementById("word");
const ipa = document.getElementById("ipa");
const meaning = document.getElementById("meaning");

const synonyms = document.getElementById("synonyms");
const family = document.getElementById("family");

const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");

fetch("lesson03.json")
.then(res => res.json())
.then(data => {

    vocabulary = data;

    showWord();

});

function showWord(){

    const item = vocabulary[current];

    word.textContent = item.word;

    ipa.textContent = item.ipa;

    meaning.textContent = item.meaning;

    progressText.textContent =
    `${current+1} / ${vocabulary.length}`;

    let percent =
    Math.round((current+1)/vocabulary.length*100);

    progressPercent.textContent =
    percent+"%";

    progressFill.style.width =
    percent+"%";

    loadSynonyms(item.synonyms);

    loadFamily(item.family);

}
function loadSynonyms(list){

    synonyms.innerHTML = "";

    list.forEach(item=>{

        synonyms.innerHTML += `
        <div class="item">

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

        </div>
        `;

    });

}

function loadFamily(list){

    family.innerHTML = "";

    list.forEach(item=>{

        family.innerHTML += `
        <div class="item">

            <button onclick="speak('${item.word}')">

                🔊

            </button>

            <div class="item-content">

                <div class="item-word">

                    ${item.word} (${item.pos})

                </div>

                <div class="item-ipa">

                    ${item.ipa}

                </div>

                <div class="item-meaning">

                    ${item.meaning}

                </div>

            </div>

        </div>
        `;

    });

}document.getElementById("nextBtn").onclick = ()=>{

    if(current < vocabulary.length-1){

        current++;

        showWord();

    }else{

        document.querySelector(".card").style.display="none";

        document.querySelector(".navigation").style.display="none";

        document.getElementById("finishScreen")
        .classList.remove("hidden");

    }

};

document.getElementById("prevBtn").onclick = ()=>{

    if(current>0){

        current--;

        showWord();

    }

};

function speak(text){

    let speech =
    new SpeechSynthesisUtterance(text);

    speech.lang="en-US";

    speech.rate=0.9;

    speechSynthesis.speak(speech);

}

document.getElementById("speakWord").onclick=()=>{

    speak(vocabulary[current].word);

};

