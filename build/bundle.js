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
    var View = function () {

        /** Construct a new View instance
         * @param {number} height - the height of the View, in characters
         * @param {number} width - the width of the View, in characters
         * @param {character} backgroundChar - character to as a default when no
         * other character has been set
         * @param {boolean} continuous - flag determining whether this View renders
         * repeatedly (in a continuous manner), or in a more event bases manner
         * @param {number} fps - if the rendering is done continuously, this defines
         * how many times per second the View will render
         */
        function View(width, height, backgroundChar, continuous, fps) {
            _classCallCheck(this, View);

            this.height = height;
            this.width = width;
            this.continuous = continuous || false;
            this.fps = fps || -1;
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


        _createClass(View, [{
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

                this.colorArray[y][x] = color;
                return this.colorArray[y][x];
            }
        }, {
            key: 'getCharBackgroundColor',
            value: function getCharBackgroundColor(x, y) {
                if (x >= this.width || y >= this.height) return undefined;
                if (x < 0 || y < 0) return undefined;

                return this.backgroundColorArray[y][x];
            }
        }, {
            key: 'setCharBackgroundColor',
            value: function setCharBackgroundColor(x, y, color) {
                if (x >= this.width || y >= this.height) return undefined;
                if (x < 0 || y < 0) return undefined;

                this.backgroundColorArray[y][x] = color;
                return this.backgroundColorArray[y][x];
            }
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
                    this.backgroundColorArray.push(curRow);
                }
            }
        }, {
            key: 'rect',
            value: function rect(x, y, width, height, border) {
                var i = void 0;
                // horizontal lines
                for (i = 0; i < width; i++) {
                    this.setChar(x + i, y, border);
                    this.setChar(x + i, y + height - 1, border);
                }

                // vertical lines
                for (i = 0; i < height; i++) {
                    this.setChar(x, y + i, border);
                    this.setChar(x + width, y + i, border);
                }
            }
        }, {
            key: 'fillRect',
            value: function fillRect(x, y, width, height, border, fill) {
                for (var row = y; row < height + y; row++) {
                    for (var column = x; column < width + x; column++) {
                        this.setChar(column, row, fill);
                    }
                }
            }
        }, {
            key: 'text',
            value: function text(x, y, _text) {
                for (var i = 0; i < _text.length; i++) {
                    this.setChar(x + i, y, _text[i]);
                }
            }
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

        return View;
    }();

    window.View = View;
})(window, document);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map