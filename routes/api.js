'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let {text, locale} = req.body;

      if (text == null || !locale) {
        return res.json({ error: 'Required field(s) missing' });
      }

      if (locale != 'american-to-british' && locale != 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }

      if (!text.length) {
        return res.json({ error: 'No text to translate' });
      }

      const translation = translator.highlight(text, locale == 'american-to-british' ? true : false);
      return res.json({
        text: text,
        translation: translation == text ? 'Everything looks good to me!' : translation
      })
    });
};
