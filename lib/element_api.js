// Generated by CoffeeScript 2.0.0-beta6
void function () {
  var createElement, createElements, Element, parseElement, parseResponseData;
  parseResponseData = require('./parse_response');
  Element = require('./element');
  createElement = function (http, selector) {
    var response;
    response = http.post('/element', {
      using: 'css selector',
      value: selector
    });
    return parseElement(http, parseResponseData(response).ELEMENT);
  };
  createElements = function (http, selector) {
    var elements, response;
    response = http.post('/elements', {
      using: 'css selector',
      value: selector
    });
    elements = parseResponseData(response);
    return function (accum$) {
      var element;
      for (var i$ = 0, length$ = elements.length; i$ < length$; ++i$) {
        element = elements[i$];
        accum$.push(parseElement(http, element.ELEMENT));
      }
      return accum$;
    }.call(this, []);
  };
  parseElement = function (http, elementId) {
    if (elementId) {
      return new Element(http, elementId);
    } else {
      return null;
    }
  };
  module.exports = function (http) {
    return {
      getElement: function (selector) {
        return createElement(http, selector);
      },
      getElements: function (selector) {
        return createElements(http, selector);
      },
      setElementTimeout: function (ms) {
        http.post('/timeouts/implicit_wait', { ms: ms });
      }
    };
  };
}.call(this);
