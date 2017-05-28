"use strict";


( function(window, document) {
    class View {

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
        constructor(width, height, backgroundChar, continuous, fps) {
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
        mount(el) {
            if (this.mountElement) {
                return null;
            }

            if (typeof el === 'string')
                this.mountElement = document.getElementById(el);
            else
                this.mountElement = el;

            // stuff a bunch of span elements into the wrapper
            let curCharElement;
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j <= this.width; j++) {
                    curCharElement = document.createElement('span');
                    if (j == this.width)
                        curCharElement.innerHTML = "\n";
                    else
                        curCharElement.innerHTML = this.getChar(j, i);
                    curCharElement.style.color = this.getCharColor(i, j);
                    this.wrapperElement.appendChild(curCharElement)
                }
            }

            // only add wrapper to the page after all spans are added
            this.mountElement.appendChild(this.wrapperElement);

            return this.mountElement;
        }

        /** Write the current state of the View to the mounted DOM element
         */
        render() {
            if (!this.mountElement || !this.wrapperElement) {
                return null;
            }

            let DOMChars = this.wrapperElement.children;
            let x = 0
            let y = 0;

            for (let i = 0; i < DOMChars.length; i++) {
                if (DOMChars[i].textContent != '\n') {
                    DOMChars[i].textContent = this.getChar(x, y);
                    DOMChars[i].style.color = this.getCharColor(x, y);
                    x++;
                } else {
                    x = 0;
                    y++;
                }
            }
        }

        /** Clear all characters and replace them with the background char
         */
        clear() {
            if (this.mountElement && this.wrapperElement) {
                this.renderString = (this.backgroundChar.repeat(this.width) + '\n').repeat(this.height);
            }
        }

        /** Get the current state of the View as an array of strings
         */
        getStringArray() {
            return this.renderString.split("\n").slice(0, this.height);
        }

        /** Get the character that lies at the specified x, y location
         * @param {integer} x - the x coordinate of the character
         * @param {integer} y - the y coordinate of the character
         */
        getChar(x, y) {
            if (x >= this.width || y >= this.height)
                return undefined;
            if (x < 0 || y < 0)
                return undefined;

            return this.getStringArray()[y][x];
        }

        /** Set a single character on the view
         * @param {integer} x - the x coordinate of the character
         * @param {integer} y - the y coordinate of the character
         * @param {character} newChar - the new character to insert
         */
        setChar(x, y, newChar) {

            // check that the coordinates are within the view
            if (x >= this.width || y >= this.height)
                return undefined;
            if (x < 0 || y < 0)
                return undefined;

            let newString = this.renderString.split("\n");

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
        getCharColor(x, y) {
            if (x >= this.width || y >= this.height)
                return undefined;
            if (x < 0 || y < 0)
                return undefined;

            return this.colorArray[y][x];
        }

        /** Set a single characters color on the view
         * @param {integer} x - the x coordinate of the character
         * @param {integer} y - the y coordinate of the character
         */
        setCharColor(x, y, color) {
            if (x >= this.width || y >= this.height)
                return undefined;
            if (x < 0 || y < 0)
                return undefined;

            this.colorArray[y][x] = color;
            return this.colorArray[y][x];
        }

        getCharBackgroundColor(x, y) {}

        setCharBackgroundColor(x, y, color) {
            // TODO
        }

        resetColors() {
            let curRow;
            this.colorArray = [];
            for (let i = 0; i < this.height; i++) {
                curRow = [];
                for (let j = 0; j < this.width; j++) {
                    curRow.push('inherit');
                }
                this.colorArray.push(curRow);
            }
        }

        rect(x, y, width, height, border) {
            let i;
            // horizontal lines
            for (i = 0; i < width; i++) {
                this.setChar(x + i, y, border);
                this.setChar(x + i, y + height - 1, border);
            }

            // vertical
            for (i = 0; i < height; i++) {
                this.setChar(x, y + i, border);
                this.setChar(x + width, y + i, border);
            }
        }

        fillRect(x, y, width, height, border, fill) {
            for (let row = y; row < height + y; row++) {
                for (let column = x; column < width + x; column++) {
                    this.setChar(column, row, fill);
                }
            }



        }

        text(x, y, text) {
            for (let i = 0; i < text.length; i++) {
                this.setChar(x + i, y, text[i]);
            }
        }

        verticalText(x, y, text) {
            for (let i = 0; i < text.length; i++) {
                this.setChar(x, y + i, text[i]);
            }
        }

        line(x0, y0, x1, y1) {
            // TODO
            // https://en.wikipedia.org/wiki/Line_drawing_algorithm

            // form an array of (x,y) coordinates using Bresenhams algo, and then
            // plot each one

            let pairs = [];

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

            for (let i = 0; i < pairs.length; i++) {
                console.log(pairs[i][0], pairs[i][1]);
                this.setChar(pairs[i][0], pairs[i][1], "T");
            }

            this.render();
        }
    }

    window.View = View;
} )(window, document);
