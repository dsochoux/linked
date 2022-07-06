
const colors = ["red", "orange", "yellow", "green", "blue", "purple"]

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

function updateGoal() {
    var g = document.getElementById("goal");
    g.innerHTML = game.getWords()[0].word + " ⟶ " + game.getWords()[6].word;
}

function add(word) {
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
    list = document.getElementById("wordList");
    const w = document.createElement("h3");
    numWords = list.children.length;
    // if (numWords == 7) {
    //     let tb = document.getElementById("input");
    //     tb.placeholder = "";
    //     return;
    // }
    prev = game.getWords()[numWords].prev;
    lenOfWord = game.getWords()[numWords].word.length;
    prevWord = document.getElementById("wordList").lastChild.cloneNode(true);
    for (var i = 0; i < lenOfWord; i++) {
        if (i == prev) {
            w.appendChild(prevWord.children[game.getWords()[numWords - 1].next]);
        } else {
            const l = document.createElement("span");
            l.textContent = "-";
            w.appendChild(l);
        }
    }
    list.appendChild(w);

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
                letters[i].style.color = colors[numWords - 1];
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
        printNextWord();
    }
}

function enterPressed() {
    deleteWord();
    add((document.getElementById("input").value));
    printNextWord();
}
function keyPressed(e) {
    console.log(e.key);
    if (/^[a-zA-Z]+$/.test(e.key)) {
        addLetter(e.key.toLowerCase());
    }
}
function keyDowned(e) {
    console.log(e.key);
}
document.addEventListener("keypress", keyPressed);
document.addEventListener("keydown", keyDowned);
// document.getElementById("enter").addEventListener("click", function(){
//     //enterPressed();
// });
document.getElementById("delete").addEventListener("click", function(){
    deleteWord();
    deleteWord();
    printNextWord();
});

// add starting word to list
add(game.getWords()[0].word)
// add second word to list
printNextWord();
