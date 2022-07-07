
const colors = ["red", "orange", "yellow", "green", "blue", "purple"]
const pos = ["noun", "verb", "adjective", "adverb"];

numWordsEntered = 0;
hintbutton = document.getElementById("hintbutton");

let game = new Game(puzzles[0]);

function updateGoal() {
    var g = document.getElementById("goal");
    g.innerHTML = game.getWords()[0].word + " ⟶ " + game.getWords()[6].word;
}

function recolorTitle() {
    numWords = document.getElementById("wordList").children.length;
    //console.log(numWords);
    titleLetters = document.getElementById("title").children;
    //console.log(titleLetters);
    for (var i = 0; i < numWordsEntered - 1; i++) {
        titleLetters[i].style.color = colors[i];
    }
    for (var i = numWordsEntered - 1; i < 6; i++) {
        titleLetters[i].style.color = "aliceblue";
    }
}

function updateInfo() {
    info = document.getElementById("info");
    info.innerHTML = game.getWords()[numWordsEntered].word.length + " letter " + pos[game.getWords()[numWordsEntered].pos];
}

function hasWon() {
    won = true;
    list = document.getElementById("wordList").children;
    //console.log(list);
    for (var i = 0; i < 7; i++) {
        // convert list[i] to string
        enteredWord = ""
        word = list[i].children;
        for (var j = 0; j < word.length; j++) {
            enteredWord = enteredWord + word[j].innerHTML;
        }
        if (enteredWord != game.getWords()[i].word) {
            won = false;
            return won;
        }
    }
    return won;
}

function add(word) {
    numWordsEntered++;
    list = document.getElementById("wordList");
    const w = document.createElement("h3");
    numWords = list.children.length;
    prev = -1;
    if (numWords > 0) {
        prev = game.getWords()[numWords].prev;
    }
    next = game.getWords()[numWords].next;
    // iterate through letters of word
    for (var i = 0; i < word.length; i++) {
        const l = document.createElement("span");
        if (i == next) {
            l.style.color = colors[numWords];
        }
        if (i == prev) {
            l.style.color = colors[numWords - 1];
        }
        l.textContent = word[i];
        w.appendChild(l);
    }
    list.appendChild(w)
}

function deleteWord() {
    list = document.getElementById("wordList").children
    if (list.length > 1) {
        list[list.length - 1].remove();
        updateInfo();
        hideHint();
        showHintButton();
    }
}

// function to print stem for next word
function printNextWord() {
    hideHint();
    if (numWordsEntered == 6) {
        hideHintButton();
    }
    if (numWordsEntered < 7) {
        list = document.getElementById("wordList");
        const w = document.createElement("h3");
        prev = game.getWords()[numWordsEntered].prev;
        lenOfWord = game.getWords()[numWordsEntered].word.length;
        prevWord = document.getElementById("wordList").lastChild.cloneNode(true);
        for (var i = 0; i < lenOfWord; i++) {
            if (i == prev) {
                w.appendChild(prevWord.children[game.getWords()[numWordsEntered - 1].next]);
            } else {
                const l = document.createElement("span");
                l.textContent = "-";
                w.appendChild(l);
            }
        }
        list.appendChild(w);
        updateInfo();
    } else {
        // all words have been entered, time to see if correct
        if (hasWon()) {
            info = document.getElementById("info");
            info.innerHTML = "correctly linked!";
        } else {
            info = document.getElementById("info");
            info.innerHTML = "a link is wrong, try again.";
        }
    }
}

updateGoal();

function addLetter(letter) {
    if (numWordsEntered < 7) {
        // get ref to lastchild of wordList
        currentWord = document.getElementById("wordList").lastChild;
        numWords = document.getElementById("wordList").children.length;
        next = game.getWords()[numWords - 1].next;
        // iterate through to find the first "-", and replace with letter
        letters = currentWord.children;
        for (var i = 0; i < letters.length; i++) {
            if (letters[i].innerHTML == "-") {
                letters[i].innerHTML = letter;
                if (i == next) {
                    letters[i].style.color = colors[numWordsEntered];
                }
                break;
            }
        }
        numDashes = 0;
        for (var i = 0; i < letters.length; i++) {
            if (letters[i].innerHTML == "-") {
                numDashes++;
            }
        }
        if (numDashes == 0) {
            numWordsEntered++;
            recolorTitle();
            printNextWord();
            
        }
    }
}

function deleteLetter() {
    currentWord = document.getElementById("wordList").lastChild;
    numWords = document.getElementById("wordList").children.length;
    prev = game.getWords()[numWords - 1].prev;
    letters = currentWord.children;
    for (var i = letters.length - 1; i >= 0; i--) {
        if (i != prev && letters[i].innerHTML != "-") {
            letters[i].innerHTML = "-";
            letters[i].style.color = "aliceblue";
            numDashes = 0;
            for (var i = 0; i < letters.length; i++) {
                if (letters[i].innerHTML == "-") {
                    numDashes++;
                }
            }
            if (numDashes == 1) {
                //console.log('hello');
                numWordsEntered--;
                recolorTitle();
                updateInfo();
            }
            return;
        }
    }
    if (numWordsEntered > 1) {
        numDashes = 0;
        for (var i = 0; i < letters.length; i++) {
            if (letters[i].innerHTML == "-") {
                numDashes++;
            }
        }
        if (numDashes == letters.length - 1) {
            deleteWord();
            deleteLetter();
            //recolorTitle();
        }
    }
    if (numWordsEntered > 1) {
        //console.log("here2");
    }
}

function enterPressed() {
    deleteWord();
    add((document.getElementById("input").value));
    printNextWord();
}
function keyPressed(e) {
    //console.log(e.key);
    if (/^[a-zA-Z]+$/.test(e.key) && e.key.length == 1) {
        addLetter(e.key.toLowerCase());
    }
}
function keyDowned(e) {
    //console.log(e.key);
    if (e.key == "Backspace") {
        deleteLetter();
    }
}
message = `
try to connect the start and end word with 5 linking words (7 words total counting the start and the end). 
each word relates to the previous word, and the colors indicate which letters are linked. 
if you get a word wrong, the potential incorrect letter will be passed on to the next word, sending you down an incorrect path.
`
//alert(message)

function showHint() {
    hint = document.getElementById("hint");
    hint.innerText = game.getWords()[numWordsEntered].hint;
    hint.style.display = "block";
    hintbutton.innerText = "hide hint";
}
function hideHint() {
    hint = document.getElementById("hint");
    hint.style.display = "none";
    hintbutton.innerText= "show hint";
}

function showHintButton() {
    //console.log("showing hint button");
    //console.log(numWordsEntered);
    hintbutton.style.display = "inline";
}

function hideHintButton() {
    hintbutton.style.display = "none";
}

document.addEventListener("keypress", keyPressed);
document.addEventListener("keydown", keyDowned);
// document.getElementById("enter").addEventListener("click", function(){
//     //enterPressed();
// });
// document.getElementById("delete").addEventListener("click", function(){
//     deleteWord();
//     deleteWord();
//     printNextWord();
// });

hintbutton.addEventListener("click", ()=>{
    if(hintbutton.innerText === "show hint"){
        showHint();
    }else{
        hideHint();
    }
});

// add starting word to list
add(game.getWords()[0].word)
// add second word to list
printNextWord();
