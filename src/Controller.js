"use strict";
import View from './View.js';

( function(window, document) {

    // This file defines some testing stuff
    let s;
    window.onload = function() {
        let s = new View(20, 20, '-', false);
        s.mount('mount');
        s.render();

        s.text(1, 1, "ass");
        s.verticalText(1, 1, "ass");
        // s.fillRect(1, 1, 4, 6, "b", ".");
        s.rect(1, 1, 4, 6, "b", "X");
        s.render();

        // let val = 0
        // setInterval(() => {
        //     s.setChar(val, 2, 'x');
        //     s.setCharColor(val, 2, 'red')
        //     s.render();
        //     s.setChar(val, 2, '.');
        //     // s.setCharColor(val, 2, 'inherit')
        //     val++;
        // }, 50);
    }
} )(window, document);
