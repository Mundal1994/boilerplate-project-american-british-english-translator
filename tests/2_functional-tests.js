const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    /*test('Translation with text and locale fields', function(done){
    });
    test('Translation with text and invalid locale field', function(done){
    });
    test('Translation with missing text field', function(done){
    });
    test('Translation with missing locale field', function(done){
    });
    test('Translation with empty text', function(done){
    });
    test('Translation with text that needs no translation', function(done){
    });*/
});
