
const colors = ["red", "orange", "yellow", "green", "blue", "purple"]
const pos = ["noun", "verb", "adjective", "adverb"];

numWordsEntered = 0;

class Word {
    constructor(word, pos, prev, next) {
        this.word = word;
        this.pos = pos;
        this.prev = prev;
        this.next = next;
    }
}

class Game {
    constructor() {
        this.words = [
            // new Word("award", 0, -1, 1),
            // new Word("winner", 0, 0, 4),
            // new Word("hero", 0, 1, 0),
            // new Word("sandwich", 0, 7, 1),
            // new Word("bread", 0, 3, 0),
            // new Word("baker", 0, 0, 3),
            // new Word("oven", 0, 2, -1)
            new Word("mouse", 0, -1, 1),
            new Word("scroll", 1, 3, 2),
            new Word("paper", 0, 4, 3),
            new Word("essay", 0, 0, 2),
            new Word("school", 0, 0, 1),
            new Word("class", 0, 0, 2),
            new Word("teach", 1, 2, -1)
        ];
    }
    getWords() {
        return this.words;
    }
}

let game = new Game();

function updateGoal() {
    var g = document.getElementById("goal");
    g.innerHTML = game.getWords()[0].word + " ⟶ " + game.getWords()[6].word;
}

function recolorTitle() {
    numWords = document.getElementById("wordList").children.length;
    //console.log(numWords);
    titleLetters = document.getElementById("title").children;
    console.log(titleLetters);
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
    }
}

// function to print stem for next word
function printNextWord() {
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
                console.log('hello');
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
        console.log("here2");
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

// add starting word to list
add(game.getWords()[0].word)
// add second word to list
printNextWord();
