const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
    const translator = new Translator();
    suite('Translate to British English Tests', () => {
        test('Mangoes are my favorite fruit. to British English', function() {
            assert.equal(translator.toBritish('Mangoes are my favorite fruit.'), 'Mangoes are my favourite fruit.');
        });
        test('I ate yogurt for breakfast. to British English', function() {
            assert.equal(translator.toBritish('I ate yogurt for breakfast.'), 'I ate yoghurt for brekkie.');//*
        });
        test('We had a party at my friend\'s condo. to British English', function() {
            assert.equal(translator.toBritish('We had a party at my friend\'s condo.'), 'We had a party at my friend\'s flat.');
        });
        test('Can you toss this in the trashcan for me? to British English', function() {
            assert.equal(translator.toBritish('Can you toss this in the trashcan for me?'), 'Can you toss this in the bin for me?');
        });
        test('The parking lot was full. to British English', function() {
            assert.equal(translator.toBritish('The parking lot was full.'), 'The car park was full.');
        });
        test('Like a high tech Rube Goldberg machine. to British English', function() {
            assert.equal(translator.toBritish('Like a high tech Rube Goldberg machine.'), 'Like a high tech Heath Robinson device.');
        });
        test('To play hooky means to skip class or work. to British English', function() {
            assert.equal(translator.toBritish('To play hooky means to skip class or work.'), 'To bunk off means to skip class or work.');
        });
        test('No Mr. Bond, I expect you to die. to British English', function() {
            assert.equal(translator.toBritish('No Mr. Bond, I expect you to die.'), 'No Mr Bond, I expect you to die.');
        });
        test('Dr. Grosh will see you now. to British English', function() {
            assert.equal(translator.toBritish('Dr. Grosh will see you now.'), 'Dr Grosh will see you now.');
        });
        test('Lunch is at 12:15 today. to British English', function() {
            assert.equal(translator.toBritish('Lunch is at 12:15 today.'), 'Lunch is at 12.15 today.');
        });
    });
    suite('Translate to American English Tests', () => {
        test('We watched the footie match for a while. to American English', function() {
            assert.equal(translator.toAmerican('We watched the footie match for a while.'), 'We watched the soccer match for a while.');
        });
        test('Paracetamol takes up to an hour to work. to American English', function() {
            assert.equal(translator.toAmerican('Paracetamol takes up to an hour to work.'), 'Acetaminophen takes up to an hour to work.');//*
        });
        test('First, caramelise the onions. to American English', function() {
            assert.equal(translator.toAmerican('First, caramelise the onions.'), 'First, caramelize the onions.');
        });
        test('I spent the bank holiday at the funfair. to American English', function() {
            assert.equal(translator.toAmerican('I spent the bank holiday at the funfair.'), 'I spent the public holiday at the carnival.');
        });
        test('I had a bicky then went to the chippy. to American English', function() {
            assert.equal(translator.toAmerican('I had a bicky then went to the chippy.'), 'I had a cookie then went to the fish-and-chip shop.');
        });
        test('I\'ve just got bits and bobs in my bum bag. to American English', function() {
            assert.equal(translator.toAmerican('I\'ve just got bits and bobs in my bum bag.'), 'I\'ve just got odds and ends in my fanny pack.');
        });
        test('The car boot sale at Boxted Airfield was called off. to American English', function() {
            assert.equal(translator.toAmerican('The car boot sale at Boxted Airfield was called off.'), 'The swap meet at Boxted Airfield was called off.');
        });
        test('Have you met Mrs Kalyani? to American English', function() {
            assert.equal(translator.toAmerican('Have you met Mrs Kalyani?'), 'Have you met Mrs. Kalyani?');
        });
        test('Prof Joyner of King\'s College, London. to American English', function() {
            assert.equal(translator.toAmerican('Prof Joyner of King\'s College, London.'), 'Prof. Joyner of King\'s College, London.');
        });
        test('Tea time is usually around 4 or 4.30. to American English', function() {
            assert.equal(translator.toAmerican('Tea time is usually around 4 or 4.30.'), 'Tea time is usually around 4 or 4:30.');
        });
    });
    suite('Highlight translation', () => {
        test('Mangoes are my favorite fruit.', function() {
            assert.equal(translator.highlight('Mangoes are my favorite fruit.', true), 'Mangoes are my <span class="highlight">favourite</span> fruit.');
        });
        test('I ate yogurt for breakfast.', function() {
            assert.equal(translator.highlight('I ate yogurt for breakfast.', true), 'I ate <span class="highlight">yoghurt</span> for <span class="highlight">brekkie.</span>');
        });
        test('We watched the footie match for a while.', function() {
            assert.equal(translator.highlight('We watched the footie match for a while.', false), 'We watched the <span class="highlight">soccer</span> match for a while.');
        });
        test('Paracetamol takes up to an hour to work.', function() {
            assert.equal(translator.highlight('Paracetamol takes up to an hour to work.', false), '<span class="highlight">Acetaminophen</span> takes up to an hour to work.');
        });
    });
});
