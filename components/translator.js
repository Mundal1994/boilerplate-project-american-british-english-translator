const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    getUpperCase(word, uppercase) {
        if (uppercase) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    }

    getUpperCaseNext(text, uppercase, uppercaseNext, upperCaseNextNext) {
        if (uppercase || uppercaseNext || upperCaseNextNext) {
            const words = text.split(' ');
            const first = uppercase ? words[0].charAt(0).toUpperCase() + words[0].slice(1) : words[0];
            const second = uppercaseNext ? words[1].charAt(0).toUpperCase() + words[1].slice(1) : words[1];
            let third = '';
            if (words.length == 3) {
                third += upperCaseNextNext ? words[2].charAt(0).toUpperCase() + words[2].slice(1) : words[2];
            }
            return first + ' ' + second + (words.length == 3 ? ' ' + third : '');
        
        }
        return text;
    }

    getNext(wordWithDot, myArray, i, hasNext, hasNextNext) {
        let twoWords = '';
        let threeWords = '';
        let upperCaseNext = false;
        let upperCaseNextNext = false;

        if (hasNext) {
            twoWords += wordWithDot + ' ' + myArray[i + 1].toLowerCase()
            upperCaseNext = myArray[i + 1][0] == myArray[i + 1][0].toUpperCase() ? true : false;
            if (twoWords[twoWords.length - 1] == '.') {
                twoWords = twoWords.slice(0,-1);
            }
        }
        if (hasNextNext) {
            threeWords += wordWithDot + ' ' + myArray[i + 1].toLowerCase() + ' ' + myArray[i + 2].toLowerCase().slice(0,-1);
            upperCaseNextNext = myArray[i + 1][2] == myArray[i + 2][0].toUpperCase() ? true : false;
            
            if (threeWords[threeWords.length - 1] == '.') {
                threeWords = threeWords.slice(0,-1);
            }
        }
        return {twoWords, threeWords, upperCaseNext, upperCaseNextNext};
    }

    translate(myArray, i, first, len) {
        const upperCase = myArray[i][0] == myArray[i][0].toUpperCase() ? true : false;
        const wordWithDot = myArray[i].toLowerCase();
        let hasDot = wordWithDot[wordWithDot.length - 1] == '.' ? true : false;
        const word = hasDot ? wordWithDot.slice(0,-1) : wordWithDot;
        let translated = '';
        
        const hasNext = i + 1 < len ? true : false;
        const hasNextNext = i + 2 < len ? true : false;
        const {twoWords, threeWords, upperCaseNext, upperCaseNextNext} = this.getNext(wordWithDot, myArray, i, hasNext, hasNextNext);
        //let upperCaseNext = false;
    
        //let threeWords = '';
        //let upperCaseNextNext = false;
        /*if (hasNextNext) {
            threeWords += wordWithDot + ' ' + myArray[i + 1].toLowerCase() + ' ' + myArray[i + 2].toLowerCase().slice(0,-1);
            //upperCaseNext = myArray[i + 1][0] == myArray[i + 1][0].toUpperCase() ? true : false;
            upperCaseNextNext = myArray[i + 1][2] == myArray[i + 2][0].toUpperCase() ? true : false;
            
            if (threeWords[threeWords.length - 1] == '.') {
                threeWords = threeWords.slice(0,-1);
            }
        }*/

        if (!first) {
            translated += ' ';
        }

        if (word in americanToBritishSpelling) {
            translated += this.getUpperCase(americanToBritishSpelling[word], upperCase);
        } else if (wordWithDot in americanToBritishTitles) {
            translated += this.getUpperCase(americanToBritishTitles[wordWithDot], upperCase);
            hasDot = false;
        } else if (word in americanOnly) {
            translated += this.getUpperCase(americanOnly[word], upperCase);
        } else if (Object.values(britishOnly).includes(word)) {
            translated += this.getUpperCase(Object.keys(britishOnly).find(key => britishOnly[key] === word), upperCase);
        } else if (hasNext && twoWords in americanOnly) {
            translated += this.getUpperCaseNext(americanOnly[twoWords], upperCase, upperCaseNext, false);
            hasDot = myArray[i + 1][myArray[i + 1].length - 1] == '.' ? true : false;
            i++;
        } else if (hasNext && Object.values(britishOnly).includes(twoWords)) {
            translated += this.getUpperCaseNext(Object.keys(britishOnly).find(key => britishOnly[key] === twoWords), upperCase, upperCaseNext, false);
            hasDot = myArray[i + 1][myArray[i + 1].length - 1] == '.' ? true : false;
            i++;
        } else if (hasNextNext && threeWords in americanOnly) {
            translated += this.getUpperCaseNext(americanOnly[threeWords], upperCase, upperCaseNext, upperCaseNextNext);
            hasDot = myArray[i + 2][myArray[i + 2].length - 1] == '.' ? true : false;
            i+=2;
        } else if (hasNextNext && Object.values(britishOnly).includes(threeWords)) {
            translated += this.getUpperCaseNext(Object.keys(britishOnly).find(key => britishOnly[key] === threeWords), upperCase, upperCaseNext, upperCaseNextNext);
            hasDot = myArray[i + 2][myArray[i + 2].length - 1] == '.' ? true : false;
            i+=2;
        } else if (word.includes(':')) {
            translated += word.slice(0,2) + '.' + word.slice(3);
        } else {
            translated += myArray[i];
            hasDot = false;
        }
        if (hasDot) {
            translated += '.';
        }
        return {translated, i};
    }

    toBritish(text) {
        const myArray = text.split(" ");
        let translated = '';
        let first = true;
        const len = myArray.length;

        for (let i = 0; i < len; i++) {
            const returned = this.translate(myArray, i, first, len);
            console.log("returned: ", returned.translated);
            translated += returned.translated;
            first = false;
            if (i != returned.i) {
                i = returned.i;
            }
        }
        return translated;
    }
}

module.exports = Translator;