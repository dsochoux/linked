class Word {
    constructor(word, pos, prev, next, hint) {
        this.word = word;
        this.pos = pos;
        this.prev = prev;
        this.next = next;
        this.hint = hint;
    }
}

class Game {
    constructor(words) {
        this.words = words;
    }
    getWords() {
        return this.words;
    }
}
puzzles = [
    [
        new Word("mouse", 0, -1, 1, ""),
        new Word("scroll", 1, 3, 2, "which type?"),
        new Word("paper", 0, 4, 3, "what is the above made of?"),
        new Word("essay", 0, 0, 2, "this is another word for the above."),
        new Word("school", 0, 0, 1, "where are you assigned the above?"),
        new Word("class", 0, 0, 2, "the above has many of these."),
        new Word("teach", 1, 2, -1, "")
    ],
    [
        new Word("award", 0, -1, 1, ""),
        new Word("winner", 0, 0, 4, "who gets one of the above?"),
        new Word("hero", 0, 1, 0, "one of these shares qualities with the above."),
        new Word("sandwich", 0, 7, 1, "the above is a type of this."),
        new Word("bread", 0, 3, 0, "this is an essential part of the above."),
        new Word("baker", 0, 0, 3, "this makes the above."),
        new Word("oven", 0, 2, -1, "")
    ],
    [
        new Word("garbage", 0, -1, 2, ""),
        new Word("truck", 0, 1, 3, "this and the above are said back to back."),
        new Word("vehicle", 0, 4, 1, "the above is one of these, but not the other way around."),
        new Word("steer", 1, 2, 4, "this is part of operating one of the above."),
        new Word("direct", 1, 2, 5, "this and the above are synonymous but not interchangeable."),
        new Word("straight", 2, 1, 3, "a <the above> line is this."),
        new Word("linear", 2, 4, -1, "")
    ],
    [
        new Word("phone", 0, -1, 3, ""),
        new Word("ring", 1, 2, 1, "an onomatopoeia for the above."),
        new Word("diamond", 0, 1, 2, "a nice one of the above might have one of these."),
        new Word("carbon", 0, 1, 4, "what is the above made out of?"),
        new Word("copy", 0, 1, 2, "email?"),
        new Word("paste", 1, 0, 3, "if the above is step one, this is step two."),
        new Word("mixture", 0, 3, -1, "")

    ]
]