'use strict';
const React = require('react');
const icon = require('./Preview/assets/img/cerebro-urban-define-icon.png');
const Preview = require('./Preview').default;
const { memoize } = require('cerebro-tools');

/**
 *
 * @desc Function that requests a word from Urban dictionary API
 * @param  {Function} query
 * @return {Promise}
 */
const fetchWord = query => {
  return fetch(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.list;
    })
    .catch((error) => {
      console.error(error);
    });
};

/**
 *
 * @desc Fetch words with caching
 * @type {Function}
 */
const cachedFetchWord = memoize(fetchWord);

/**
 *
 * @desc Cerebro plugin to define words, cross-platform
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const plugin = (scope) => {
  let match = scope.term.match(/^udefine\s(.*)/);
  if (match) {
    const term = match[1];
    if (!term) {
      scope.display({
        icon,
        title: `Awaiting Your Input`
      });
      return;
    }
    cachedFetchWord(term).then(items => {
      if (!items) {
        scope.display({
          icon,
          title: `An Error Occurred`
        });
        return;
      }
      if (items.length === 0) {
        scope.display({
          icon,
          title: `There are No Definitions for the Term "${term}"`
        });
        return;
      }
      const response = items.map(item => ({
        icon,
        id: item.defid,
        title: item.word,
        subtitle: `Author: ${item.author}`,

        getPreview: () => (
          <Preview
            id={item.defid}
            word={item.word}
            definition={item.definition}
            example={item.example}
          />
        ),
      }));
      scope.display(response);
    })
  }
};

module.exports = {
  fn: plugin,
  icon,
  name: 'Define a word using Urban Dictionary',
  keyword: 'udefine'
}
