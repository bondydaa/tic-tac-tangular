/**
 * @fileOverview Require JS main file
 */

require(
    [
        './App'
    ],
    function(
        App
    ) {
        'use strict';

        // Initialize
        window.app = new App();
    }
);