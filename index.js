
const colors = ["red", "orange", "yellow", "green", "blue", "purple"]

numWordsEntered = 0;

class Word {
    constructor(word, prev, next) {
        this.word = word;
        this.prev = prev;
        this.next = next;
    }
}

class Game {
    constructor() {
        this.words = [
            new Word("award", -1, 1),
            new Word("winner", 0, 4),
            new Word("hero", 1, 0),
            new Word("sandwich", 7, 1),
            new Word("bread", 3, 0),
            new Word("baker", 0, 3),
            new Word("oven", 2, -1)
        ];
    }
    getWords() {
        return this.words;
    }
}

let game = new Game();

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

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
    //w.textContent = word;
    list.appendChild(w)
}

function deleteWord() {
    list = document.getElementById("wordList").children
    if (list.length > 1) {
        list[list.length - 1].remove()
    }
}

// function to print next word ▢W▢▢▢
function printNextWord() {
    if (numWordsEntered < 7) {
        list = document.getElementById("wordList");
        const w = document.createElement("h3");
        //numWords = list.children.length;
        // if (numWords == 7) {
        //     let tb = document.getElementById("input");
        //     tb.placeholder = "";
        //     return;
        // }
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
    } else {
        // all words have been entered, time to see if correct
        if (hasWon()) {
            alert("winner!");
        } else {
            alert("try again.")
        }
    }

    //set placeholder of textbox to len of word
    // let tb = document.getElementById("input");
    // tb.placeholder = lenOfWord + " letters";
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
    console.log("here1");
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
    if (/^[a-zA-Z]+$/.test(e.key)) {
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
