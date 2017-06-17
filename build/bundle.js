/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (window, document) {
    var Pixoglyph = function () {
        /** Construct a new Pixoglyph instance
         * @param {number} height - the height of the View, in characters
         * @param {number} width - the width of the View, in characters
         * @param {character} backgroundChar - character to as a default when no
         * other character has been set
         */
        function Pixoglyph(width, height, backgroundChar) {
            _classCallCheck(this, Pixoglyph);

            this.height = height;
            this.width = width;
            this.mountElement = undefined;

            this.backgroundChar = (backgroundChar || ' ')[0];
            this.renderString = (backgroundChar.repeat(this.width) + '\n').repeat(this.height);

            // the color array, which maps each index to a color
            this.resetColors();

            // this element holds the actual text
            this.wrapperElement = document.createElement('pre');
        }

        /** Associate this view with a given DOM element
         * @param {Element} - the element that this View will be inserted into
         */


        _createClass(Pixoglyph, [{
            key: 'mount',
            value: function mount(el) {
                if (this.mountElement) {
                    return null;
                }
                if (typeof el === 'string') this.mountElement = document.getElementById(el);else this.mountElement = el;

                // stuff a bunch of span elements into the wrapper
                var curCharElement = void 0;
                for (var i = 0; i < this.height; i++) {
                    for (var j = 0; j <= this.width; j++) {
                        curCharElement = document.createElement('span');
                        if (j == this.width) curCharElement.innerHTML = "\n";else curCharElement.innerHTML = this.getChar(j, i);

                        curCharElement.style.color = this.getCharColor(i, j);
                        curCharElement.style.backgroundColor = this.getCharBackgroundColor(i, j);
                        this.wrapperElement.appendChild(curCharElement);
                    }
                }
                // only add wrapper to the page after all spans are added
                this.mountElement.appendChild(this.wrapperElement);
                return this.mountElement;
            }

            /** Write the current state of the View to the mounted DOM element
             */

        }, {
            key: 'render',
            value: function render() {
                if (!this.mountElement || !this.wrapperElement) {
                    return null;
                }

                var DOMChars = this.wrapperElement.children;
                var x = 0;
                var y = 0;

                for (var i = 0; i < DOMChars.length; i++) {
                    if (DOMChars[i].textContent != '\n') {
                        DOMChars[i].textContent = this.getChar(x, y);
                        DOMChars[i].style.color = this.getCharColor(x, y);
                        DOMChars[i].style.backgroundColor = this.getCharBackgroundColor(x, y);
                        x++;
                    } else {
                        x = 0;
                        y++;
                    }
                }
            }

            /** Clear all characters and replace them with the background char
             */

        }, {
            key: 'clear',
            value: function clear() {
                if (this.mountElement && this.wrapperElement) {
                    this.renderString = (this.backgroundChar.repeat(this.width) + '\n').repeat(this.height);
                }
            }

            /** Get the current state of the View as an array of strings
             */

        }, {
            key: 'getStringArray',
            value: function getStringArray() {
                return this.renderString.split("\n").slice(0, this.height);
            }

            /** Get the character that lies at the specified x, y location
             * @param {integer} x - the x coordinate of the character
             * @param {integer} y - the y coordinate of the character
             */

        }, {
            key: 'getChar',
            value: function getChar(x, y) {
                if (x >= this.width || y >= this.height) return undefined;
                if (x < 0 || y < 0) return undefined;

                return this.getStringArray()[y][x];
            }

            /** Set a single character on the view
             * @param {integer} x - the x coordinate of the character
             * @param {integer} y - the y coordinate of the character
             * @param {character} newChar - the new character to insert
             */

        }, {
            key: 'setChar',
            value: function setChar(x, y, newChar) {

                // check that the coordinates are within the view
                if (x >= this.width || y >= this.height) return undefined;
                if (x < 0 || y < 0) return undefined;

                var newString = this.renderString.split("\n");

                console.log(x, y);

                // mutate the string array so that the next render reflects this change
                newString[y] = newString[y].slice(0, x) + newChar + newString[y].slice(x + 1);
                newString = newString.join("\n");
                this.renderString = newString;
                return this.renderString;
            }

            /** Get the color of the character at the specified location
             * @param {integer} x - the x coordinate of the character
             * @param {integer} y - the y coordinate of the character
             */

        }, {
            key: 'getCharColor',
            value: function getCharColor(x, y) {
                if (x >= this.width || y >= this.height) return undefined;
                if (x < 0 || y < 0) return undefined;

                return this.colorArray[y][x];
            }

            /** Set a single characters color on the view
             * @param {integer} x - the x coordinate of the character
             * @param {integer} y - the y coordinate of the character
             */

        }, {
            key: 'setCharColor',
            value: function setCharColor(x, y, color) {
                if (x >= this.width || y >= this.height) return undefined;
                if (x < 0 || y < 0) return undefined;

                console.log('before: ' + this.colorArray[y][x], this.backgroundColorArray[y][x]);
                this.colorArray[y][x] = color;
                console.log('after: ' + this.colorArray[y][x], this.backgroundColorArray[y][x]);
                return this.colorArray[y][x];
            }

            /** Get the current background color for a given character in the View
             * @param {integer} x - the x coordinate of the character
             * @param {integer} y - the y coordinate of the character
             */

        }, {
            key: 'getCharBackgroundColor',
            value: function getCharBackgroundColor(x, y) {
                if (x >= this.width || y >= this.height) return undefined;
                if (x < 0 || y < 0) return undefined;

                return this.backgroundColorArray[y][x];
            }

            /** Set the bacground color of the given character in the View
             * @param {integer} x - the x coordinate of the character
             * @param {integer} y - the y coordinate of the character
             */

        }, {
            key: 'setCharBackgroundColor',
            value: function setCharBackgroundColor(x, y, color) {
                if (x >= this.width || y >= this.height) return undefined;
                if (x < 0 || y < 0) return undefined;

                this.backgroundColorArray[y][x] = color;
                return this.backgroundColorArray[y][x];
            }

            /** Reset all of the colors and background colors to their default
             *  values
             */

        }, {
            key: 'resetColors',
            value: function resetColors() {
                var curRow = void 0;
                this.colorArray = [];
                this.backgroundColorArray = [];
                for (var i = 0; i < this.height; i++) {
                    curRow = [];
                    for (var j = 0; j < this.width; j++) {
                        curRow.push('inherit');
                    }
                    this.colorArray.push(curRow);
                    this.backgroundColorArray.push(curRow.slice());
                }
            }

            /** Draw an unfilled rectangle using the specified character onto the View
             * @param {integer} x - the x coordinate of the top left of the rectangle
             * @param {integer} y - the y coordinate of the top left of the rectangle
             * @param {integer} width - the width of the rectangle
             * @param {integer} height - the height of the rectangle
             * @param {integer} borderChar - the character to use for the border of
             * the rectangle
             */

        }, {
            key: 'rect',
            value: function rect(x, y, width, height, borderChar) {
                var i = void 0;
                // horizontal lines
                for (i = 0; i < width; i++) {
                    this.setChar(x + i, y, borderChar);
                    this.setChar(x + i, y + height - 1, borderChar);
                }

                // vertical lines
                for (i = 0; i < height; i++) {
                    this.setChar(x, y + i, borderChar);
                    this.setChar(x + width, y + i, borderChar);
                }
            }

            /** Draw a filled rectangle using the specified border and fill characters
             * @param {integer} x - the x coordinate of the top left of the rectangle
             * @param {integer} y - the y coordinate of the top left of the rectangle
             * @param {integer} width - the width of the rectangle
             * @param {integer} height - the height of the rectangle
             * @param {String} borderChar - the character to use for the border of
             * the rectangle
             * @param {String} fillChar - the character to use for the inside of the
             * rectangle
             */

        }, {
            key: 'fillRect',
            value: function fillRect(x, y, width, height, borderChar, fillChar) {
                this.rect(x, y, width, height, borderChar);
                for (var row = y + 1; row < height + y - 1; row++) {
                    for (var column = x + 1; column < width + x; column++) {
                        this.setChar(column, row, fillChar || this.backgroundChar);
                    }
                }
            }

            /** Write a horizontal line of text to the view from left to right,
             * starting at position (x, y).
             * @param {integer} x - the starting x position of the text
             * @param {integer} y - the starting y position of the text
             */

        }, {
            key: 'text',
            value: function text(x, y, _text) {
                for (var i = 0; i < _text.length; i++) {
                    this.setChar(x + i, y, _text[i]);
                }
            }

            /** Write a vertical line of text to the view from top to bottom,
             * starting at position (x, y).
             * @param {integer} x - the starting x position of the text
             * @param {integer} y - the starting y position of the text
             */

        }, {
            key: 'verticalText',
            value: function verticalText(x, y, text) {
                for (var i = 0; i < text.length; i++) {
                    this.setChar(x, y + i, text[i]);
                }
            }
        }, {
            key: 'line',
            value: function line(x0, y0, x1, y1) {
                // TODO
                // https://en.wikipedia.org/wiki/Line_drawing_algorithm

                // form an array of (x,y) coordinates using Bresenhams algo, and then
                // plot each one

                var pairs = [];

                // let deltaX = x1 - x0;
                // let deltaY = y1 - y0;
                // let deltaErr = deltaY / deltaX;
                // let error = deltaErr - 0.5
                //
                // let y = Math.min(y0, y1);
                // for(let x = x0; x <= x1; x++) {
                //     console.log([x, y]);
                //     pairs.push([x, y]);
                //     error += deltaErr;
                //     if (error >= 0.5) {
                //         y++;
                //         error = error - 1;
                //     }
                // }

                console.log(pairs.length);

                for (var i = 0; i < pairs.length; i++) {
                    console.log(pairs[i][0], pairs[i][1]);
                    this.setChar(pairs[i][0], pairs[i][1], "T");
                }

                this.render();
            }
        }]);

        return Pixoglyph;
    }();

    window.Pixoglyph = Pixoglyph;
})(window, document);

module.exports = Pixoglyph;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map